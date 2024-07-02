using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Application.Requests.Queries.Get_List_Question.List_Question_Get;
using static Domain.Enums;

namespace Application.Requests.Commands.Upsert_Question
{
    public partial class Question_Upsert
    {
        public class Command: BaseQueryModel, IRequest<View_List_Response>
        {
            public IList<QuestionViewModel> Questions { get; set; }
        }

        public class QuestionViewModel
        {
            public int Id{ get; set; }
            public int QuestionnaireId { get; set; }
            public string Question {  get; set; }
            public GradingType GradingType { get; set; }
            public string Comentary { get; set; }
            public int Index { get; set; }
            public DateTime СreateData { get; set; }
            public IList<ResponseVariantsViewModel>? ResponseVariants { get; set; }   
        }
        public class ResponseVariantsViewModel
        {
            public int Id { get; set; }
            public int QuestionId { get; set; }
            public string Response { get; set; }
        }
    }
}
