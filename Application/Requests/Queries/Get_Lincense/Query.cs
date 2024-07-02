using Application.Global_Models;
using MediatR;

namespace Application.Requests.Queries.Get_Lincense
{
    public partial class Lincense_Get
    {
        public class Query : BaseQueryModel, IRequest<LicenseViewModel>
        {
            public  Guid Oid { get; set; }
        }
    }
}
