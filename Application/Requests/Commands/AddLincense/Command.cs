using Application.Global_Models;
using MediatR;
using static Domain.Enums;

namespace Application.Requests.Commands.AddLincense
{
    public partial class Lincense_Add
    {
        public class Command : BaseQueryModel,IRequest<View_Response>
        {
            public int Quantity { get; set; }
            public int GroupQ { get; set; }
        }
    }
}
