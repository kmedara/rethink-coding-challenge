namespace Rethink.Patient_Api.CQRS.Queries
{
    public interface IQuery<TResult>
    {
    }

    public interface IQueryHandler<in T, TResult> where T : IQuery<TResult>
    {
        TResult Handle(T query);
    }
}
