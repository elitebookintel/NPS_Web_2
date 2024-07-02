using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Commands.Upsert_Oprostnik
{
    public partial class Oprostnik_Upsert
    {
        public class Command : BaseQueryModel, IRequest<View_Response>
        {
            public int Oid { get; set; }
            public string Name { get; set; }
            public DateTime CreateDate { get; set; }
            public DateTime? UpdateDate { get; set; }
            public QuestionnaireStatus Status { get; set; }  
        }
    }
}
