using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.Domain.API
{
    public class Paged<T>
    {
        public int total { get; set; }
        public List<T> data { get; set; }
    }
}
