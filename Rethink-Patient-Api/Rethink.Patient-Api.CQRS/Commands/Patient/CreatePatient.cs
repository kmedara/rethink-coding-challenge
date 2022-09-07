using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using Rethink.Patient_Api.Domain.Aggregates.Patient.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.CQRS.Commands
{
    public sealed class CreatePatientCommand : CreatePatientParameters, ICommand<Task<Patient>>
    {
    }

    public sealed class CreatePatientCommandHandler : ICommandHandler<CreatePatientCommand, Task<Patient>>
    {
        private readonly IApplicationDbContextFactory _contextFactory;
        public CreatePatientCommandHandler(IApplicationDbContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<Patient> Handle(CreatePatientCommand command)
        {
            using (var _context = _contextFactory.CreateDbContext())
            {

                var entry = _context.Add(new Patient()
                {
                    FirstName = command.FirstName,
                    LastName = command.LastName,
                    Birthday = command.Birthday,
                    Gender = command.Gender
                });

                await _context.SaveChangesAsync();
                return entry.Entity;

            }
        }
    }
}
