using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Queries.Get_List_Oprostnik
{
    public partial class List_Oprostnik_Get
    {
        public class View_Model_Oprostnik
        {
            public int Oid { get; set; }
            public string Name { get; set; }
            public DateTime CreateDate { get; set; }
            public DateTime? UpdateDate { get; set; }
            public QuestionnaireStatus Status { get; set; }
        }
    }
}
