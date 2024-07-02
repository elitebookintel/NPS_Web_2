using static Domain.Enums;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    public class UpsertLicense_DTO
    {
        public Guid Oid { get; set; }
        //public int CompanyOid { get; set; }
        public string activationCode { get; set; }
        public DateTime? licenseActivated { get; set; }
        public EnLicenseStatus licenseStatus { get; set; }
        public string deviceName { get; set; }
        public int? groupQuestionnarieID { get; set; }
    }
}
