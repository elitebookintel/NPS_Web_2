﻿using Application.Global_Models;
using Application.Service;
using Application.Service.Token;
using Application.Service.URL_API;
using Domain;
using MediatR;
using Newtonsoft.Json;

namespace Application.Requests.Queries.Delet_Question
{
    public partial class Question_Delet
    {
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
                var url = authURLs.Delet_Question(request.IdQuestion, token);
                var credential = authURLs.Credentials();
                // var token = _tokenService.Refresh_token(request.Token, request._Delegat);

                QueryDataGet queryDataGet = new QueryDataGet()
                {
                    URL = url,
                    Credentials = credential,
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