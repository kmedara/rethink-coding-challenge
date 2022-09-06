using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;


namespace Rethink.Patient_Api.Data
{
    /// <summary>
    /// Good explanation of unit of work pattern
    /// https://dev.to/moe23/step-by-step-repository-pattern-and-unit-of-work-with-asp-net-core-5-3l92
    /// </summary>
    /// 
    public interface IUnitOfWork
    {
        public void Add<TEntity>(TEntity entity)
            where TEntity : class;
        public DbSet<TEntity> Query<TEntity>() 
            where TEntity : class;
        public void Update<TEntity>(TEntity entity)
            where TEntity : class;
        public void Delete<TEntity>(TEntity entity)
            where TEntity : class;

    }
    public sealed class UnitOfWork: IUnitOfWork
    {
        private readonly DbContext _dbContext;
        private readonly IDbContextTransaction _transaction;
        private bool _isAlive = true;
        public UnitOfWork(DbContextFactory dbContextFactory)
        {
            _dbContext = dbContextFactory.GetApplicationContext();
            _transaction = _dbContext.Database.BeginTransaction();
        }

        public async Task CommitAsync()
        {
            if (!_isAlive) return;

            try
            {
                await _dbContext.SaveChangesAsync();
                await _transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await _transaction.RollbackAsync();
                throw e;
            }
            finally
            {
                _isAlive = false;
                _transaction.Dispose();
                _dbContext.Dispose();
            }

        }

        public void Add<TEntity>(TEntity entity)
            where TEntity : class
        {
            _dbContext.Set<TEntity>().Add(entity);
        }

        public void Update<TEntity>(TEntity entity)
            where TEntity : class
        {
            _dbContext.Set<TEntity>().Update(entity);
        }

        public void Delete<TEntity>(TEntity entity)
            where TEntity : class
        {
            _dbContext.Set<TEntity>().Remove(entity);
        }

        public DbSet<TEntity> Query<TEntity>()
            where TEntity : class
        {
            return _dbContext.Set<TEntity>();
        }
    }
}