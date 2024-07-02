using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Application.Requests.Commands.Upsert_Question.Question_Upsert;

namespace Application.Requests.Commands.Upsert_Question
{
    public partial class Question_Upsert
    {
        public class QuestionUpsertViewModel
        {
            public IList<QuestionViewModel> Questions { get; set; }
            public string Token { get; set; }
        }
    }
}
