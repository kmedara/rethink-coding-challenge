using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.Domain.Aggregates.Patient.Parameters
{
    public class CreatePatientParameters
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime Birthday { get; set; } //search a range

        public string Gender { get; set; }
    }
}
