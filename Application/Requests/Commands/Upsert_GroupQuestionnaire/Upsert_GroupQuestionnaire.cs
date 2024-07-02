using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Commands.Upsert_GroupQuestionnaire
{
    public class Upsert_GroupQuestionnaire
    {
        public int? Id { get; set; }
        public string Name { get; set; }

        public int[] Questionnaries { get; set; }
        public int[] DeleteQuestionnaries { get; set; }
        public string Token { get; set; }   
    }
}
