using Application.Global_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Queries.Get_List_GroupQuestionnaire
{
    public partial class List_GroupQuestionnaire_Get
    {
        public class Json_List_Model_GroupQuestionnaire : BaseResponse
        {
            public IList<GroupQuestionnarieViewModel> GroupQuestionnaries { get; set; }
        }
    }
}
