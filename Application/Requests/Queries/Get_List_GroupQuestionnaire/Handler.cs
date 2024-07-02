using Application.Global_Models;
using Application.Service;
using Application.Service.Token;
using Application.Service.URL_API;
using Domain;
using MediatR;
using Newtonsoft.Json;

namespace Application.Requests.Queries.Get_List_GroupQuestionnaire
{
    public partial class List_GroupQuestionnaire_Get
    {
        public class Handler : IRequestHandler<Query, View_List_Model_GroupQuestionnaire>
        {
            private readonly URL_Admin_NPS authURLs;
            private readonly GlobalQuery _globalQuery;
            private readonly ITokenService _tokenService;
            public Handler(URL_Admin_NPS _authURLs, GlobalQuery _GlobalQuery, ITokenService tokenService)
            {
                authURLs = _authURLs;
                _globalQuery = _GlobalQuery;
                _tokenService = tokenService;
            }

            public async Task<View_List_Model_GroupQuestionnaire> Handle(Query request, CancellationToken cancellationToken)
            {
                var token = request.guid_CookieLock.Token;
                if (token=="")
                {
                    token = _tokenService.Get_Token_Urgently();
                }
                var url = authURLs.Get_List_GroupQuestionnaire(token);
                var credentials = authURLs.Credentials();
                QueryDataGet queryDataGet = new QueryDataGet()
                {
                    URL = url,
                    Credentials = credentials
                };

                var queryResponse = await _globalQuery.GetAsync(queryDataGet);
                var jsonObj = JsonConvert.DeserializeObject<Json_List_Model_GroupQuestionnaire>(queryResponse);

                if (jsonObj.ErrorCode == EnErrorCode.Expired_token)
                {
                    var guid_CookieLock = await _tokenService.Refresh_token(request.guid_CookieLock);
                    request.guid_CookieLock.Token = guid_CookieLock.Token;
                    return await Handle(request, cancellationToken);
                }
                if (jsonObj.GroupQuestionnaries!=null && jsonObj.ErrorCode ==EnErrorCode.NoError)
                {
                    jsonObj.GroupQuestionnaries = jsonObj.GroupQuestionnaries.OrderByDescending(i => i.Id).ToList();
                    var response = jsonObj.GroupQuestionnaries.Select(i => new View_GroupQuestionnarieViewModel
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Questionnaries = i.Questionnaries != null ? string.Join(", ", i.Questionnaries) : "empty"
                    }).ToList();
                    return new View_List_Model_GroupQuestionnaire { View_GroupQuestionnaries = response };
                }
                return new View_List_Model_GroupQuestionnaire { View_GroupQuestionnaries = null };
            }
        }
    }

}