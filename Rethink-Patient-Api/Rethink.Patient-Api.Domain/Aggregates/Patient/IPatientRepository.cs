using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.Domain.Aggregates.Patient
{
    public interface IPatientRepository
    {
        public Task<IEnumerable<Patient>> GetPatientsAsync(IGetAllPatientsQueryParameters parameters);
    }
}
