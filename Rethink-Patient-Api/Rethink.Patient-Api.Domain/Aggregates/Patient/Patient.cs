using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rethink.Patient_Api.Domain.Aggregates.Patient
{
    public static class GENDER
    {
        public static string M = "M";
        public static string F = "F";
    }
    public class Patient: BaseEntity
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string Gender { get; set; }

        [NotMapped]
        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }
    }
}