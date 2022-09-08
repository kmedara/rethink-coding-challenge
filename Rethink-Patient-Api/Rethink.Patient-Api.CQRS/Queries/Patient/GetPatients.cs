using Microsoft.EntityFrameworkCore;
using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.Data;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using Rethink.Patient_Api.Domain.Aggregates.Patient.Parameters;
using Rethink.Patient_Api.Domain.API;
namespace Rethink.Patient_Api.CQRS.Queries
{
    public class GetPatientsQuery :
        GetPatientsParameters,
        IQuery<Task<Paged<Patient>>>
    {

    }

    public class GetPatientsQueryHandler :
        IQueryHandler<GetPatientsQuery, Task<Paged<Patient>>>
    {
        private readonly IApplicationDbContextFactory _contextFactory;
        public GetPatientsQueryHandler(IApplicationDbContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<Paged<Patient>> Handle(GetPatientsQuery query)
        {
            using (var _context = _contextFactory.CreateDbContext())
            {
                var count = await _context.Set<Patient>().CountAsync();
                var data = _context.Set<Patient>()
                    .Where(x => query.Id == null || x.Id == query.Id)
                    .Where(x => query.FirstName == null || x.FirstName.ToLower().StartsWith(query.FirstName.ToLower()))
                    .Where(x => query.LastName == null || x.LastName.ToLower().StartsWith(query.LastName.ToLower()))

                    //support searching birthdays in a range with before, after, and between
                    .Where(x => query.Birthday == null || x.Birthday > (query.Birthday.ElementAtOrDefault(0) ?? DateTime.MinValue))
                    .Where(x => query.Birthday == null || x.Birthday < (query.Birthday.ElementAtOrDefault(1) ?? DateTime.MaxValue))

                    .Where(x => query.Gender == null || x.Gender.ToLower() == query.Gender.ToLower());

                IOrderedQueryable<Patient> ordered = null;

                //surprisingly the ordered by clause isnt added to the generated sql if I don't pass this off to an IOrderedQueryable
                //possible case for extension methods
                if (query.sortDirection == null || query.sortDirection.ToLower().Contains("desc"))
                {
                    ordered = data.OrderByDescending(el => el.Id);
                }
                else
                {
                    ordered = data.OrderBy(el => el.Id);
                }

                var result = ordered.Skip(query.skip ?? 0).Take(query.take ?? 1000).ToList();

                return new Paged<Patient>
                {
                    total = count,
                    data = result
                };
            }
        }

    }
}
