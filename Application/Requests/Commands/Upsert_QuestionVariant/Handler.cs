using Application.Global_Models;
using Application.Service.Token;
using Application.Service.URL_API;
using Application.Service;
using Domain;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Commands.Upsert_QuestionVariant
{
    public partial class QuestionVariant_Upsert {
        public class Handler : IRequestHandler<Command_List, View_List_Response>
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

            public async Task<View_List_Response> Handle(Command_List request, CancellationToken cancellationToken)
            {
                    var token = request.guid_CookieLock.Token;
                    if (token=="")
                    {
                        token = _tokenService.Get_Token_Urgently();
                    }
                    var url = authURLs.UpsertQuestionVariant();
                  
                    var addlincense = new Upsert_QuestionVariant
                    {
                        QuestionVariant_Commands = request.QuestionVariant_Commands.ToList(),
                        QuestionID = request.QuestionID,
                        OprostnikID = request.OprostnikID,
                        Token = token
                    };
                    var json = JsonConvert.SerializeObject(addlincense);
                    QueryDataPost queryDataPost = new QueryDataPost()
                    {
                        JSON = json,
                        URL = url,
                        Credentials = authURLs.Credentials()
                    };

                    var queryResponse = await _globalQuery.PostAsync(queryDataPost);
                    var jsonObj = JsonConvert.DeserializeObject<View_List_Response>(queryResponse);
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
