using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Commands.Upsert_GroupQuestionnaire
{
    public partial class GroupQuestionnaire_Upsert
    {
        public class Command: BaseQueryModel, IRequest<View_Response> 
        {
            public int? Id { get; set; }
            public string Name { get; set; }

            public int[] Questionnaries { get; set; }
            public int[] DeleteQuestionnaries { get; set; }
        }
    }
}
