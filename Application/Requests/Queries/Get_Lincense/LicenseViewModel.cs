using Application.Global_Models;
using Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Queries.Get_Lincense
{
    public partial class Lincense_Get
    {
        public class LicenseViewModel : BaseResponse
        {
            public License License { get; set; }
        }

        public class License
        {
            public Guid Oid { get; set; }
            public string ActivationCode { get; set; }
            [DisplayFormat(DataFormatString = "{0:yyyy-MM-ddTHH:mm:ss}", ApplyFormatInEditMode = true)]
            public DateTime? LicenseActivated { get; set; }
            public EnLicenseStatus LicenseStatus { get; set; }
            public string? DeviceName { get; set; }
            public int GroupQuestionnarieID { get; set; }
        }
    }
}
