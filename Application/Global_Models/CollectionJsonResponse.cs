using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Global_Models
{
    public class CollectionJsonResponse<TRecord> : BaseJsonResponse where TRecord : class
    {
        public IEnumerable<TRecord> Records { get; set; }
    }
}
