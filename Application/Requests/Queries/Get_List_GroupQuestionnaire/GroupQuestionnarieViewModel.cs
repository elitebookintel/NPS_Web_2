using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Queries.Get_List_GroupQuestionnaire
{
    public partial class List_GroupQuestionnaire_Get
    {
        public class GroupQuestionnarieViewModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int[] Questionnaries { get; set; }
          
        }
    }
}
