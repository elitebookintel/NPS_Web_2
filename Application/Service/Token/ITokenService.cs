using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Token
{
    public interface ITokenService
    {
        public Task<Model_Token_Response> Refresh_token(Guid_CookieLock guid_CookieLock);
        public string Get_Token_Urgently();
        public Task<string> Set_Token_Urgently();
    }
}
