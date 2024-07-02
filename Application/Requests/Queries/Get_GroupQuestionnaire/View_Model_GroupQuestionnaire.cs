using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Queries.Get_GroupQuestionnaire
{
    public partial class GroupQuestionnaire_Get
    {
        public class View_Model_GroupQuestionnaire: BaseResponse
        {
            public GroupQuestionnarieViewModel GroupQuestionnarie { get; set; }
          
        }

        public class GroupQuestionnarieViewModel : BaseResponse
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int[] questionnaries { get; set; }
        }
        
    }
}
