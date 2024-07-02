using Application.Service.URL_API;
using Application.Service;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Application.Requests.Commands.Authorize_User.User_Authorize;
using Application.Global_Models;
using Newtonsoft.Json;
using static System.Formats.Asn1.AsnWriter;
using Domain;
using Application.Service.Token;

namespace Application.Requests.Commands.ChangeLanguage
{
    public partial class ChangeLanguage
    {
        public class Handler : IRequestHandler<Command, BaseResponse>
        {
            private readonly URL_Admin_NPS authURLs;
            private readonly GlobalQuery _globalQuery;
            private readonly ITokenService _tokenService;
            public Handler(URL_Admin_NPS _authURLs, GlobalQuery globalQuery, ITokenService tokenService)
            {
                authURLs = _authURLs;
                _globalQuery = globalQuery;
                _tokenService = tokenService;
            }

            public async Task<BaseResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var token = request.guid_CookieLock.Token;
                if (token=="")
                {
                    token = _tokenService.Get_Token_Urgently();
                }

                var url = authURLs.ChangeUILanguage(token, request.Lang);
                var credentials = authURLs.Credentials();

                QueryDataGet queryDataGet = new QueryDataGet()
                {
                    URL = url,
                    Credentials = "",
                };

                var queryResponse = await _globalQuery.GetAsync(queryDataGet);
                var jsonObj = JsonConvert.DeserializeObject<BaseResponse>(queryResponse);

                if (jsonObj.ErrorCode ==  EnErrorCode.Expired_token)
                {
                    var guid_CookieLock = await _tokenService.Refresh_token(request.guid_CookieLock);
                    request.guid_CookieLock.Token = guid_CookieLock.Token;

                    return await Handle(request, cancellationToken);
                }
                return jsonObj;
            }
        }
    }
}
