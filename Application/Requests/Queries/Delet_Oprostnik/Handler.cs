using Application.Global_Models;
using Application.Service.Token;
using Application.Service.URL_API;
using Application.Service;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Application.Requests.Queries.Delet_Oprostnik
{
   public partial class Oprostnik_Delet {
        public class Handler : IRequestHandler<Query, BaseResponse>
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

            public async Task<BaseResponse> Handle(Query request, CancellationToken cancellationToken)
            {
                    var token = request.guid_CookieLock.Token;
                    if (token=="")
                    {
                        token = _tokenService.Get_Token_Urgently();
                    }
                    var url = authURLs.Delet_Oprostnik(request.ID_Oprostniks, token);
                    var credential = authURLs.Credentials();
                  
                    QueryDataGet queryDataGet = new QueryDataGet()
                    {
                        URL = url,
                        Credentials =credential,
                    };

                    var queryResponse = await _globalQuery.DeletAsync(queryDataGet);
                    var jsonObj = JsonConvert.DeserializeObject<BaseResponse>(queryResponse);

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