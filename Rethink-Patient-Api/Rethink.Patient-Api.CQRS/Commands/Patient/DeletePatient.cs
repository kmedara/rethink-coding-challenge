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
    public sealed class DeletePatientCommand : DeletePatientParameters, ICommand<Task>
    {
    }

    public sealed class DeletePatientCommandHandler : ICommandHandler<DeletePatientCommand, Task>
    {
        private readonly IApplicationDbContextFactory _contextFactory;
        public DeletePatientCommandHandler(IApplicationDbContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task Handle(DeletePatientCommand command)
        {
            using (var _context = _contextFactory.CreateDbContext())
            {

                _context.Remove(new Patient()
                {
                    Id = command.Id
                });
                await _context.SaveChangesAsync();
            }
        }
    }
}
