using Microsoft.EntityFrameworkCore;

namespace Rethink.Patient_Api.Data
{
    /// <summary>
    /// https://docs.microsoft.com/en-us/ef/ef6/fundamentals/working-with-dbcontext
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Domain.Aggregates.Patient.Patient> Patients { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }

    public interface IApplicationDbContextFactory: IDbContextFactory<ApplicationDbContext> { }
    public class DbContextFactory: IApplicationDbContextFactory
    {
        private readonly ConnectionString connectionString;

        public DbContextFactory(ConnectionString connectionString)
        {
            this.connectionString = connectionString;
        }

        public ApplicationDbContext CreateDbContext()
        {

            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseSqlServer(connectionString.Value).LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
            return new ApplicationDbContext(builder.Options);
        }

    }

    public class ConnectionString
    {
        public ConnectionString(string value)
        {
            Value = value;
        }

        public string Value { get; }
    }
}
