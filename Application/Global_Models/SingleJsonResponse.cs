using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Global_Models
{
    public class SingleJsonResponse<TRecord> : BaseJsonResponse where TRecord : class
    {
        public TRecord Record { get; set; }
    }
}
