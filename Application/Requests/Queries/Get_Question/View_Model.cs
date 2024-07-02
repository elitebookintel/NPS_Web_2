
using Application.Global_Models;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Queries.Get_Question
{
    public partial class Question_Get
    {
        public class View_Model :BaseResponse
        {
            public QuestionData question { get; set; }
        }

        public class QuestionData
        {
            public int id { get; set; }
            public int questionnaireId { get; set; }
            public string question { get; set; } 
            public GradingType gradingType { get; set; }
            public string comentary { get; set; } 
            public int index { get; set; }
            public DateTime createData { get; set; }
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
