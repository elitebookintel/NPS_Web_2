using Application.Global_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Queries.Get_Statisticka
{
    public partial class Statisticka_Get
    {
        public class View_Model : BaseResponse
        {
            public YesNo yesNoStatistic { get; set; }
            public Point10Score point10ScoreStatistic { get; set; }
            public SingleAnswerVariant singleAnswerVariantStatistic {get; set;}
            public MultipleAnswerVariant multipleAnswerVariantStatistic { get; set;}
            public Point5Score point5ScoreStatistic { get; set; }
        }

        public class YesNo
        {
            public int totalResponses { get; set; }
            public int totalYes { get; set; }
            public int totalNo { get; set; }
        }

        public class Point10Score
        {
            public int totalResponses { get; set; }
            public int totalGradeLowerOrEqualThan6 { get; set; }
            public int totalGrade7 { get; set; }
            public int totalGrade8 { get; set; }
            public int totalGrade9 { get; set; }
            public int totalGrade10 { get; set; }
        }

        public class SingleAnswerVariant
        {
            public int totalResponses { get; set; }
            public VariantAnswer[] variantAnswers { get; set; }
        }

        public class VariantAnswer
        {
            public int responseVariantId { get; set; }
            public string responseValue { get; set; }
            public int responseCount { get; set; }
        }

        public class MultipleAnswerVariant
        {
            public int totalResponses { get; set; }
            public VariantAnswer[] variantAnswers { get; set; }
        }

        public class Point5Score
        {
            public int totalResponses { get; set; }
            public int totalGrade1 { get; set; }
            public int totalGrade2 { get; set; }
            public int totalGrade3 { get; set; }
            public int totalGrade4 { get; set; }
            public int totalGrade5 { get; set; }

        }
    }
}
