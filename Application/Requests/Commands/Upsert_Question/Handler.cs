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

namespace Application.Requests.Commands.Upsert_Question
{
    public partial class Question_Upsert
    {
        public class Handler : IRequestHandler<Command, View_List_Response>
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

            public async Task<View_List_Response> Handle(Command request, CancellationToken cancellationToken)
            {        
                    foreach (var item in request.Questions)
                    {
                        if (item.ResponseVariants==null)
                        {
                            item.ResponseVariants = new List<ResponseVariantsViewModel>();
                        }
                    }
                    var token = request.guid_CookieLock.Token;
                    if (token=="")
                    {
                        token = _tokenService.Get_Token_Urgently();
                    }
                    var url = authURLs.UpsertQuestion();
                    var credential = authURLs.Credentials();
                    //var token =await _tokenService.Refresh_token(request.BaseQueryModel.guid_CookieLock);
                    var addlincense = new QuestionUpsertViewModel
                    {
                        Questions=request.Questions,
                        Token = token
                    };
                    var json = JsonConvert.SerializeObject(addlincense);
                    QueryDataPost queryDataPost = new QueryDataPost()
                    {
                        JSON = json,
                        URL = url,
                        Credentials = credential,
                    };
                    
                    var queryResponse = await _globalQuery.PostAsync(queryDataPost);
                    var jsonObj = JsonConvert.DeserializeObject<View_List_Response>(queryResponse);

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
