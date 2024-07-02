using Application.Global_Models;
using MediatR;
using static Domain.Enums;

namespace ISNPSWeb.Models
{

    public class List_QuestionViewModel: BaseResponse
    {
        public IList<QuestionViewModel> Questions { get; set; }
        public int Oid { get; set; }
        public IDictionary<EnUiLanguage, string> Name_Oprostnik { get; set; }
    }

    public class QuestionViewModel
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public IDictionary<EnUiLanguage, string> Question { get; set; }
        public GradingType GradingType { get; set; }
        public IDictionary<EnUiLanguage, string> Comentary { get; set; }
        public int Index { get; set; }
        public DateTime CreateData { get; set; }
        public IList<ResponseVariantsViewModel> ResponseVariants { get; set; }
    }
    public class ResponseVariantsViewModel
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public IDictionary<EnUiLanguage, string> Response { get; set; }
    }
}