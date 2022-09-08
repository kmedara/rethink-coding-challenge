using AutoFixture;
using Microsoft.EntityFrameworkCore;
using Moq;
using Rethink.Patient_Api.CQRS.Queries;
using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rethink.Patient_Api.Test.Handlers
{
    public class GetPatientsHandlerTest
    {
        [Fact]
        public async void Get_Patients_Should_Query_By_Id()
        {
            //using instance of inmemory db decreases complexity over a mock
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "MedaraRethink")
            .Options;

            // Insert seed data into the database using one instance of the context
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(new Patient { Id = 1, FirstName = "Kevin", LastName = "Medara", Gender = "M", Birthday = DateTime.Today});
                context.Add(new Patient { Id = 2, FirstName = "Jane", LastName = "Doe", Gender = "F", Birthday = DateTime.Today.AddDays(2)});
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new ApplicationDbContext(options))
            {
                var mockDbContextFactory = new Mock<IApplicationDbContextFactory>();
                mockDbContextFactory.Setup(el => el.CreateDbContext()).Returns(context);
                var handler = new GetPatientsQueryHandler(mockDbContextFactory.Object);
                var patients = await handler.Handle(new GetPatientsQuery() { Id = 1 });

                Assert.NotNull(patients.data.Single());
                Assert.Equal(1,patients.data.Single().Id);
            }
        }
    }
}
