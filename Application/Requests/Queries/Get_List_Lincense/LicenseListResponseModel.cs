using Application.Global_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Queries.Get_List_Lincense
{
    public partial class List_Lincense_Get
    {
        public class LicenseListResponseModel : BaseResponse
        {
            public IList<LincenseModel> Licenses { get; set; }
        }
    }
}
