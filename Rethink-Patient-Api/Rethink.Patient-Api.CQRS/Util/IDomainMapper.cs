using Rethink.Patient_Api.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.CQRS.Util
{
    [Obsolete("Create an automapper profile for object mapping instead")]
    public interface IDomainMapper<TEntity> 
        where TEntity : BaseEntity
    {
        public TEntity Map();
    }
}
