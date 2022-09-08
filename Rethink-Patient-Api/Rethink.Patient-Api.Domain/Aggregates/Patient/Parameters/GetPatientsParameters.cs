using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rethink.Patient_Api.Domain.Aggregates.Patient.Parameters
{
    public class GetPatientsParameters
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public DateTime?[]? Birthday { get; set; } //search a range

        public string? Gender { get; set; }

        public int? skip { get; set; }
        public int? take { get; set; }

        public string? sortDirection { get; set; }
    }
}
