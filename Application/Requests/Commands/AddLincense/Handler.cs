using Application.Global_Models;
using Application.Service;
using Application.Service.Token;
using Application.Service.URL_API;
using Domain;
using MediatR;
using Newtonsoft.Json;

namespace Application.Requests.Commands.AddLincense
{
    public partial class Lincense_Add
    {
        public class Handler : IRequestHandler<Command, View_Response>
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

            public async Task<View_Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var token = request.guid_CookieLock.Token;
                if (token=="")
                {
                    token = _tokenService.Get_Token_Urgently();
                }
                var url = authURLs.Creat_Lincense(token, request.Quantity, request.GroupQ);
                var credentials = authURLs.Credentials();
                var addlincense = new AddLincese_Model
                {
                    Quantity=request.Quantity,
                    GroupQ=request.GroupQ,
                    Token =token
                };
                var json = JsonConvert.SerializeObject(addlincense);
                QueryDataPost queryDataPost = new QueryDataPost()
                {
                    JSON = json,
                    URL = url,
                    Credentials = credentials,
                };

                var queryResponse = await _globalQuery.PostAsync(queryDataPost);
                var jsonObj = JsonConvert.DeserializeObject<View_Response>(queryResponse);

                if (jsonObj.ErrorCode == EnErrorCode.Expired_token)
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
