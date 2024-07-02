using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Commands.UpsertLicense
{
    public partial class Put_UpsertLicense
    {
        public class UpsertLicense_Model
        {
            public Guid Oid { get; set; }
            public int CompanyOid { get; set; }
            public string activationCode { get; set; }
            public DateTime licenseActivated { get; set; }
            public EnLicenseStatus licenseStatus { get; set; }
            public string deviceName { get; set; }
            public int? groupQuestionnarieID { get; set; }
            public string token { get; set; }
        }
    }
}