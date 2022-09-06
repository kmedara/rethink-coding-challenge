using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.CQRS.Queries
{
    public sealed class GetPatientsQuery :
        GetPatientsParameters,
        IQuery<Task<List<Patient>>>
    {

    }

    public class GetPatientsQueryHandler : 
        IQueryHandler<GetPatientsQuery, Task<List<Patient>>>
    {
        private readonly DbContextFactory _contextFactory;
        public GetPatientsQueryHandler(DbContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<List<Patient>> Handle(GetPatientsQuery query)
        {
            using(var _context = _contextFactory.GetApplicationContext())
            {
                return _context.Set<Patient>().Where(x => query.FirstName == null || x.FirstName.ToLower().Contains(query.FirstName.ToLower())).ToList();
            }
        }

    }
}
