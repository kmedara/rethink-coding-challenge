using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using Rethink.Patient_Api.Domain.Aggregates.Patient.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using CsvHelper.Configuration;
using CsvHelper;
using System.Reflection.PortableExecutable;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace Rethink.Patient_Api.CQRS.Commands
{
    public sealed class UploadPatientCsvCommand : ICommand<Task>
    {
        public dynamic File { get; set; }
    }

    public sealed class UploadPatientCsvCommandHandler : ICommandHandler<UploadPatientCsvCommand, Task>
    {
        private readonly IApplicationDbContextFactory _contextFactory;
        public UploadPatientCsvCommandHandler(IApplicationDbContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task Handle(UploadPatientCsvCommand command)
        {
            var data = new MemoryStream();
            await command.File.CopyToAsync(data);

            data.Position = 0;
            using (var reader = new StreamReader(data))
            {
                var bad = new List<string>();
                var conf = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = true,
                    HeaderValidated = null,
                    MissingFieldFound = null,
                    BadDataFound = context =>
                    {
                        bad.Add(context.RawRecord);
                    }
                };
                using (var csvReader = new CsvReader(reader, conf))
                {
                    using (var _context = _contextFactory.CreateDbContext())
                    {
                        csvReader.Read();
                        csvReader.ReadHeader();
                        while (csvReader.Read())
                        {

                            await _context.AddAsync(new Patient()
                            {
                                FirstName = csvReader.GetField(0).ToString(),
                                LastName = csvReader.GetField(1).ToString(),
                                Birthday = DateTime.Parse(csvReader.GetField(2).ToString()),
                                Gender = csvReader.GetField(3).ToString()
                            });

                            await _context.SaveChangesAsync();
                        }
                    }

                }
            }
        }
    }
}
