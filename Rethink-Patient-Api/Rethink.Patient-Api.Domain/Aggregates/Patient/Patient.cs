namespace Rethink.Patient_Api.Domain.Aggregates.Patient
{
    public enum GENDER
    {
        M,
        F
    }
    public class Patient
    {
        private string _fullName;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public GENDER Gender { get; set; }

        public string FullName { 
            get { return _fullName; } 
            private set { _fullName = String.Concat(FirstName, " ", LastName); }
        }
    }
}