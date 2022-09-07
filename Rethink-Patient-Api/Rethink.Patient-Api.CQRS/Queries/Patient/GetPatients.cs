using Microsoft.EntityFrameworkCore;
using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using Rethink.Patient_Api.Domain.Aggregates.Patient.Parameters;

namespace Rethink.Patient_Api.CQRS.Queries
{
    public class GetPatientsQuery :
        GetPatientsParameters,
        IQuery<Task<List<Patient>>>
    {

    }

    public class GetPatientsQueryHandler :
        IQueryHandler<GetPatientsQuery, Task<List<Patient>>>
    {
        private readonly IApplicationDbContextFactory _contextFactory;
        public GetPatientsQueryHandler(IApplicationDbContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<List<Patient>> Handle(GetPatientsQuery query)
        {
            using (var _context = _contextFactory.CreateDbContext())
            {
                return await _context.Set<Patient>()
                    .Where(x => query.Id == null || x.Id == query.Id)
                    .Where(x => query.FirstName == null || x.FirstName.ToLower().StartsWith(query.FirstName.ToLower()))
                    .Where(x => query.LastName == null || x.LastName.ToLower().StartsWith(query.LastName.ToLower()))

                    //support searching birthdays in a range with before, after, and between
                    .Where(x => query.Birthday == null || x.Birthday > (query.Birthday.ElementAtOrDefault(0) ?? DateTime.MinValue))
                    .Where(x => query.Birthday == null || x.Birthday < (query.Birthday.ElementAtOrDefault(1) ?? DateTime.MaxValue))

                    .Where(x => query.Gender == null || x.Gender.ToLower() == query.Gender.ToLower())

                    .ToListAsync();
            }
        }

    }
}
