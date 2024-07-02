using Application.Global_Models;
using Application.Service;
using Application.Service.Token;
using Application.Service.URL_API;
using Domain;
using MediatR;
using Newtonsoft.Json;

namespace Application.Requests.Commands.Add_Response
{
    public partial class Response_Add
    {
        public class Handler : IRequestHandler<Command, View_Response>
        {
            private readonly URL_Admin_NPS uRL_Admin_;
            private readonly GlobalQuery _globalQuery;
            private readonly ITokenService _tokenService;

            public Handler(URL_Admin_NPS _User_NPS, GlobalQuery globalQuery, ITokenService tokenService)
            {
                uRL_Admin_ = _User_NPS;
                _globalQuery = globalQuery;
                _tokenService = tokenService;
            }

            public async Task<View_Response> Handle(Command request, CancellationToken cancellationToken)
            {
                //await request.guid_CookieLock.SemaphoreSlim.WaitAsync();
                //try
                //{
                    var token=request.guid_CookieLock.Token;
                    if (token=="")
                    {
                        token = _tokenService.Get_Token_Urgently();
                    }
                    var url = uRL_Admin_.Add_Response();
                    var addlincense = new CreatResponse
                    {
                        Answers = request.Answers?.ToList(),
                        OprostnikID = request.OprostnikID,
                        Token =token
                    };
                    var json = JsonConvert.SerializeObject(addlincense);
                    QueryDataPost queryDataPost = new QueryDataPost()
                    {
                        JSON = json,
                        URL = url,
                        Credentials = ""
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
                //    request.guid_CookieLock.SemaphoreSlim.Release();
                //}
            }
        }
    }
}
