using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Queries.Get_ActivateQuestionnaire
{
    public partial class Get_ActivateQuestionnaire
    {
        public class Query : BaseQueryModel,IRequest<BaseResponse>
        {
            public int Oid { get; set; }
        }
    }
}
