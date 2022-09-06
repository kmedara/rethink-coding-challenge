using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.CQRS.Queries
{
    public sealed class GetAllPatientsQuery :
        Domain.Aggregates.Patient.IGetAllPatientsQueryParameters,
        IQuery<Task<List<Domain.Aggregates.Patient.Patient>>>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime[]? Birthday { get; set; }
        public string? Gender { get; set; }
    }

    public class GetAllPatientsQueryHandler : 
        IQueryHandler<GetAllPatientsQuery, Task<List<Domain.Aggregates.Patient.Patient>>>
    {
        private readonly IPatientRepository _patientRepository;
        public GetAllPatientsQueryHandler(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }
        public async Task<List<Patient>> Handle(GetAllPatientsQuery query)
        {
            return (await _patientRepository.GetPatientsAsync(query)).ToList();
        }

    }
}
