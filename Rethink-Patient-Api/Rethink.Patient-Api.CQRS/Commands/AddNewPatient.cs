using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.CQRS.Commands
{
    public sealed class AddNewPatientCommand : ICommand<Task<Domain.Aggregates.Patient.Patient>>
    {
    }

    public sealed class AddNewPatientCommandHandler : ICommandHandler<AddNewPatientCommand, Task<Domain.Aggregates.Patient.Patient>>
    {
        public Task<Domain.Aggregates.Patient.Patient> Handle(AddNewPatientCommand command)
        {
            return Task.Run(() =>

            new Domain.Aggregates.Patient.Patient
            {
                FirstName = "Kevin",
                LastName = "Medara",
                Gender = Domain.Aggregates.Patient.GENDER.M
            }

           );

        }
    }
}
