using Application.Global_Models;
using MediatR;

namespace Application.Requests.Commands.ChangeLanguage
{
    public partial class ChangeLanguage
    {
        public class Command : BaseQueryModel, IRequest<BaseResponse>
        {
            //public BaseQueryModel? BaseQueryModel { get; set; }
            public int Lang { get; set; }
        }
    }
}
