using Application.Global_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Commands.Upsert_GroupQuestionnaire
{
    public partial class GroupQuestionnaire_Upsert
    {
        public class View_Response : BaseResponse
        {
            public int? QuestionnaireId { get; set; }
        }
    }
}
