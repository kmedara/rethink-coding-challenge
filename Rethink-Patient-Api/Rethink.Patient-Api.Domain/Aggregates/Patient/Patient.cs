using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rethink.Patient_Api.Domain.Aggregates.Patient
{
    public enum GENDER
    {
        M,
        F
    }
    public class Patient
    {
        [Key]
        public int PatientId { get; set; }

        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public GENDER Gender { get; set; }

        [NotMapped]
        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }
    }
}