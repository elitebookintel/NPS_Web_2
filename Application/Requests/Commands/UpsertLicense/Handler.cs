using Application.Service.Token;
using Application.Service.URL_API;
using Application.Service;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Global_Models;
using Domain;
using Newtonsoft.Json;

namespace Application.Requests.Commands.UpsertLicense
{
    public partial class Put_UpsertLicense
    {
        public class Handler :IRequestHandler<Command,  View_Response>
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
                //await request.guid_CookieLock.SemaphoreSlim.WaitAsync();
                //try
                //{
                    var token = request.guid_CookieLock.Token;
                    if (token=="")
                    {
                        token = _tokenService.Get_Token_Urgently();
                    }
                    var url = authURLs.UpsertLicense();
                    var credential = authURLs.Credentials();

                    var addlincense = new UpsertLicense_Model
                    {
                        Oid = request.Oid,
                        CompanyOid = request.CompanyOid,
                        activationCode = request.activationCode,
                        licenseActivated = request.licenseActivated,
                        licenseStatus = request.licenseStatus,
                        deviceName = request.deviceName,
                        groupQuestionnarieID = request.groupQuestionnarieID,
                        token=token,
                    };
                    var json = JsonConvert.SerializeObject(addlincense);
                    QueryDataPost queryDataPost = new QueryDataPost()
                    {
                        JSON = json,
                        URL = url,
                        Credentials = credential,
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
                //}
                //catch (Exception ex)
                //{
                //    var addlincense = new View_Response()
                //    {
                //        ErrorCode = EnErrorCode.Internal_error,
                //        ErrorMessage = ex.Message,
                //    };
                //    return addlincense;
                //}
                //finally
                //{
                //    request.BaseQueryModel.guid_CookieLock.SemaphoreSlim.Release();
                //}
            }
        }
    }
}