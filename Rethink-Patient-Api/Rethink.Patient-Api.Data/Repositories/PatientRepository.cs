using Microsoft.EntityFrameworkCore;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.Data.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public PatientRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Patient>> GetPatientsAsync(IGetAllPatientsQueryParameters parameters)
        {
            return _unitOfWork.Query<Patient>()
                .Where(el => parameters.FirstName == null || el.FirstName.ToLower().Contains(parameters.FirstName.ToLower()));


        }
    }
}
