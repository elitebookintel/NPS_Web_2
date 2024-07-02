using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Queries.Get_List_Question
{
    public partial class List_Question_Get
    {
        public class QuestionViewModel
        {
            public int Id { get; set; }
            public int QuestionnaireId { get; set; }
            public string Question {  get; set; }
            public string Comentary { get; set; }
            public GradingType GradingType { get; set; }
            public int Index { get; set; }
            public DateTime CreateData { get; set; }
            public ResponseVariantsViewModel[] ResponseVariants { get; set; } 
        }

        public class ResponseVariantsViewModel
        {
            public int Id { get; set; }
            public int QuestionId { get; set; }
            public string Response { get; set; }
        }

      
    }
}
