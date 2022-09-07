using Rethink.Patient_Api.Domain.Aggregates.Patient.Parameters;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Rethink.Patient_Api.Data;
using AutoMapper;

namespace Rethink.Patient_Api.CQRS.Commands
{
    public sealed class UpdatePatientCommand : UpdatePatientParameters, ICommand<Task<Patient>>
    {
    }

    public sealed class UpdatePatientCommandHandler : ICommandHandler<UpdatePatientCommand, Task<Patient>>
    {
        private readonly DbContextFactory _contextFactory;
        private readonly IMapper _mapper;
        public UpdatePatientCommandHandler(DbContextFactory contextFactory , IMapper mapper)
        {
            _mapper = mapper;
            _contextFactory = contextFactory;
        }
        public async Task<Patient> Handle(UpdatePatientCommand command)
        {
            var toUpdate = _mapper.Map<Patient>(command);
            
            using (var _context = _contextFactory.CreateDbContext())
            {
                var entry = _context.Update(toUpdate);
                await _context.SaveChangesAsync();
                return entry.Entity;
            }
        }
    }

}
