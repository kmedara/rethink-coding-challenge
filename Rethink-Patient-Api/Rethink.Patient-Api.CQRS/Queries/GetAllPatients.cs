using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.CQRS.Queries
{
    public sealed class GetAllPatientsQuery: IQuery<Task<List<Domain.Aggregates.Patient.Patient>>>
    {
    }

    public class GetAllPatientsQueryHandler : IQueryHandler<GetAllPatientsQuery, Task<List<Domain.Aggregates.Patient.Patient>>>
    {
        public Task<List<Patient>> Handle(GetAllPatientsQuery query)
        {
            throw new NotImplementedException();
        }

    }
}
