using Application.Global_Models;
using Application.Service;
using Application.Service.Token;
using Application.Service.URL_API;
using Domain;
using MediatR;
using Newtonsoft.Json;
using static Application.Requests.Queries.Get_List_GroupQuestionnaire.List_GroupQuestionnaire_Get;

namespace Application.Requests.Queries.Get_List_Lincense
{

    public partial class List_Lincense_Get
    {
        public class Handler : IRequestHandler<Query, Lincense_View_Model_List>
        {
            private readonly URL_Admin_NPS authURLs;
            private readonly GlobalQuery _globalQuery;
            private readonly ITokenService _tokenService;
            private readonly IMediator _mediator;
            public Handler(URL_Admin_NPS _authURLs, GlobalQuery _GlobalQuery, ITokenService tokenService, IMediator mediator)
            {
                authURLs = _authURLs;
                _globalQuery = _GlobalQuery;
                _tokenService = tokenService;
                _mediator = mediator;
            }

            public async Task<Lincense_View_Model_List> Handle(Query request, CancellationToken cancellationToken)
            {
                var token = request.guid_CookieLock.Token;
                if (token=="")
                {
                    token = _tokenService.Get_Token_Urgently();
                }
                var url = authURLs.Get_List_Lincenses(token);
                var credentials = authURLs.Credentials();
                QueryDataGet queryDataGet = new QueryDataGet()
                {
                    URL = url,
                    Credentials = credentials
                };

                var queryResponse = await _globalQuery.GetAsync(queryDataGet);
                var jsonObj = JsonConvert.DeserializeObject<LicenseListResponseModel>(queryResponse);
                if (jsonObj.ErrorCode == EnErrorCode.Expired_token)
                {
                    var guid_CookieLock = await _tokenService.Refresh_token(request.guid_CookieLock);
                    request.guid_CookieLock.Token = guid_CookieLock.Token;
                    return await this.Handle(request, cancellationToken);
                }
                var url_group = authURLs.Get_List_GroupQuestionnaire(token);
                var credentials_group = authURLs.Credentials();
                QueryDataGet queryDataGet_group = new QueryDataGet()
                {
                    URL = url_group,
                    Credentials = credentials_group
                };

                View_List_Model_GroupQuestionnaire response = null;
                var queryResponse_group = await _globalQuery.GetAsync(queryDataGet_group);
                var jsonObj_group = JsonConvert.DeserializeObject<Json_List_Model_GroupQuestionnaire>(queryResponse_group);
                if (jsonObj_group.ErrorCode == EnErrorCode.Expired_token)
                {
                    var guid_CookieLock = await _tokenService.Refresh_token(request.guid_CookieLock);
                    request.guid_CookieLock.Token = guid_CookieLock.Token;
                    return await this.Handle(request, cancellationToken);
                }
                if (jsonObj_group.GroupQuestionnaries!=null && jsonObj_group.ErrorCode ==EnErrorCode.NoError)
                {
                    jsonObj_group.GroupQuestionnaries = jsonObj_group.GroupQuestionnaries.OrderByDescending(i => i.Id).ToList();
                    var response_group = jsonObj_group.GroupQuestionnaries.Select(i => new View_GroupQuestionnarieViewModel
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Questionnaries = i.Questionnaries != null ? string.Join(", ", i.Questionnaries) : "empty"
                    }).ToList();
                    response = new View_List_Model_GroupQuestionnaire { View_GroupQuestionnaries = response_group };
                }
                Lincense_View_Model_List lincense_View_Model_List = new Lincense_View_Model_List();
                if (jsonObj.Licenses!=null)
                {
                    lincense_View_Model_List.Lincense_List = new List<Lincense_View_Model>();
                    foreach (var item in jsonObj.Licenses)
                    {
                        Lincense_View_Model lincense_View_Model = new Lincense_View_Model();

                        lincense_View_Model.Oid = item.Oid;
                        if (response!=null && response.View_GroupQuestionnaries!=null && response.ErrorCode ==EnErrorCode.NoError)
                            lincense_View_Model.GroupQuestionnarie_Name = response.View_GroupQuestionnaries.FirstOrDefault(j => j.Id == item.GroupQuestionnarieID)?.Name;
                        else
                        {
                            lincense_View_Model_List.ErrorCode = jsonObj_group.ErrorCode;
                            lincense_View_Model_List.ErrorMessage = jsonObj_group.ErrorMessage;
                        }
                        lincense_View_Model.ActivationCode = item.ActivationCode;
                        lincense_View_Model.LicenseActivated = item.LicenseActivated;
                        lincense_View_Model.DeviceName = item.DeviceName;
                        lincense_View_Model.LicenseStatus = item.LicenseStatus;
                        lincense_View_Model_List.Lincense_List.Add(lincense_View_Model);
                    }
                }
                return lincense_View_Model_List;
            }
        }
    }

}