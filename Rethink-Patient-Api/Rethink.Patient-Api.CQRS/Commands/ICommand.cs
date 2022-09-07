using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.CQRS.Commands
{
    public interface ICommand<TOutput>
    {
    }

    public interface ICommandHandler<T, TOutput> where T : ICommand<TOutput>
    {
        TOutput Handle(T command);
    }
}
