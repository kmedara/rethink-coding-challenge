using Rethink.Patient_Api.CQRS.Commands;
using Rethink.Patient_Api.CQRS.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Rethink.Patient_Api.CQRS
{
    public interface IMediator
    {
        TResult Dispatch<TResult>(ICommand<TResult> command);
        TResult Dispatch<TResult>(IQuery<TResult> query);
    };
    public sealed class Mediator: IMediator
    {
        private readonly IServiceProvider serviceProvider;

        public Mediator(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public TResult Dispatch<TResult>(ICommand<TResult> command)
        {
            var type = typeof(ICommandHandler<,>);
            var argTypes = new Type[] { command.GetType(), typeof(TResult) };
            var handlerType = type.MakeGenericType(argTypes);
            dynamic handler = serviceProvider.GetService(handlerType);
            TResult result = handler.Handle((dynamic)command);
            return result;
        }

        public TResult Dispatch<TResult>(IQuery<TResult> query)
        {
            var type = typeof(IQueryHandler<,>);
            var argTypes = new Type[] { query.GetType(), typeof(TResult) };
            var handlerType = type.MakeGenericType(argTypes);
            dynamic handler = serviceProvider.GetService(handlerType);
            TResult result = handler.Handle((dynamic)query);
            return result;
        }
    }
}
