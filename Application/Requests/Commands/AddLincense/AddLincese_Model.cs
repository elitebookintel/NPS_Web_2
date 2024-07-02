using Application.Global_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Commands.AddLincense
{
    public partial class Lincense_Add
    {
        public class AddLincese_Model
        {
            public string Token { get; set; }
            public int Quantity { get; set; }
            public int GroupQ { get; set; }
        }
    }
}
