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
using static Application.Requests.Queries.Get_List_Oprostnik.List_Oprostnik_Get;
using Domain;

namespace Application.Requests.Queries.Get_List_Question
{
    public partial class List_Question_Get
    {
        public class Handler : IRequestHandler<Query, View_List_Model>
        {
            private readonly URL_Admin_NPS authURLs;
            private readonly GlobalQuery _globalQuery;
            private readonly ITokenService _tokenService;

            //private readonly SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);

            public Handler(URL_Admin_NPS _authURLs, GlobalQuery _GlobalQuery, ITokenService tokenService)
            {
                authURLs = _authURLs;
                _globalQuery = _GlobalQuery;
                _tokenService = tokenService;
            }
            public async Task<View_List_Model> Handle(Query request, CancellationToken cancellationToken)
            {
                    var token = request.guid_CookieLock.Token;
                    if (token=="")
                    {
                        token = _tokenService.Get_Token_Urgently();
                    }
                    var url = authURLs.GetListQuestion(request.OprostnikID, token);
                    var credentials = authURLs.Credentials();
                    QueryDataGet queryDataGet = new QueryDataGet()
                    {
                        URL = url,
                        Credentials = credentials
                    };

                    var queryResponse = await _globalQuery.GetAsync(queryDataGet);
                    var jsonObj = JsonConvert.DeserializeObject<View_List_Model>(queryResponse);

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