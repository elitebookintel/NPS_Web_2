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
        public class Lincense_View_Model_List : BaseResponse
        {
            public IList<Lincense_View_Model> Lincense_List { get; set; }
        }
    }
}
