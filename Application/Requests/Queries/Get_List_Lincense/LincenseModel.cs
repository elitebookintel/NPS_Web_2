using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Queries.Get_List_Lincense
{
    public partial class List_Lincense_Get
    {
        public class LincenseModel
        {
            public Guid Oid { get; set; }
            public int GroupQuestionnarieID { get; set; }
            public string ActivationCode { get; set; }
            public DateTime? LicenseActivated { get; set; }
            public EnLicenseStatus LicenseStatus { get; set; }
            public string? DeviceName { get; set; }
        }
    }
}
