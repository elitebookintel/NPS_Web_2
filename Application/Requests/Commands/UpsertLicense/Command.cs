using Application.Global_Models;
using MediatR;
using static Domain.Enums;

namespace Application.Requests.Commands.UpsertLicense
{
    public partial class Put_UpsertLicense
    {
        public class Command : BaseQueryModel, IRequest<View_Response>
        {
            public Guid Oid { get; set; }
            public int CompanyOid { get; set; }
            public string activationCode { get; set; }
            public DateTime licenseActivated { get; set; }
            public EnLicenseStatus licenseStatus { get; set; }
            public string deviceName { get; set; }
            public int? groupQuestionnarieID { get; set; }
            //public BaseQueryModel BaseQueryModel { get; set; }
        }
    }
}
