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
        public class View_List_Model_GroupQuestionnaire: BaseResponse
        {
            public IList<View_GroupQuestionnarieViewModel> View_GroupQuestionnaries { get; set; }
        }

        public class View_GroupQuestionnarieViewModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Questionnaries { get; set; }
        }
    }
}
