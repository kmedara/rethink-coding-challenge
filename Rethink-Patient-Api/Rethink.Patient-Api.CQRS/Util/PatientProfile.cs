using AutoMapper;

namespace Rethink.Patient_Api.CQRS.Util
{
    public class PatientUpdateProfile: Profile
    {
        public PatientUpdateProfile()
        {
            CreateMap<Commands.UpdatePatientCommand, Domain.Aggregates.Patient.Patient>();
        }
    }
}
