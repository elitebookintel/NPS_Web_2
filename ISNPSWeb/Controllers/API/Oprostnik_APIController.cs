using Application.Global_Models;
using Application.Requests.Queries.Delet_Oprostnik;
using Application.Requests.Queries.Get_List_Oprostnik;
using Application.Service.Token;
using DevExpress.Drawing.Internal.Fonts.Interop;
using Domain;
using Domain.Resources;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models;
using ISNPSWeb.Models.Lincense_Group_Oprostnik;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Domain.Enums;
namespace ISNPSWeb.Controllers.API
{
    [Route("[controller]")]
    [Authorize]
    public class Oprostnik_APIController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly ILocalization_Exception _localizationException;

        public Oprostnik_APIController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localizationException)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localizationException=localizationException;
        }

        [HttpGet("Oprostnik_List")]
        public async Task<IActionResult> Oprostnik_List()
        {
            var Guid_CookieLock = await GetToken_Async();
            var query = new List_Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock, };
            var response = await _mediator.Send(query);

            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Oprostnik, response);
            }
            return CreateJsonOk(response.Questionnaires);
        }

        [HttpGet("Delet_Oprostnik/{ID}/{name_oprostnik}")]
        public async Task<IActionResult> Delet_Oprostnik(int ID,string name_oprostnik)
        {
            var Guid_CookieLock = await GetToken_Async();

            var query = new Oprostnik_Delet.Query { guid_CookieLock = Guid_CookieLock, ID_Oprostniks=ID };
            var response = await _mediator.Send(query);

            if (response.ErrorCode != EnErrorCode.NoError)
            {

                response.ErrorMessage= _localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.DELETE, name_oprostnik, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Oprostnik, response);
            }
            return CreateJsonOk(name_oprostnik, true, Enums.HTTP_Methods.DELETE);
        }

        [HttpGet("Change_Status_Questionnaire")]
        public async Task<IActionResult> Change_Status_Questionnaire(int id, int status_int,string name_oprostnik)
        {
            BaseResponse response = new BaseResponse();
            var Guid_CookieLock = await GetToken_Async();

            if (status_int == 1)
            {
                var query = new Application.Requests.Queries.Get_ActivateQuestionnaire.Get_ActivateQuestionnaire.Query { Oid=id, guid_CookieLock = Guid_CookieLock, };
                response= await _mediator.Send(query);
            }
            if (status_int == 2)
            {
                var query = new Application.Requests.Queries.Get_DeactivateQuestionnaire.Get_DeactivateQuestionnaire.Query { Oid=id, guid_CookieLock = Guid_CookieLock, };
                response= await _mediator.Send(query);
            }
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, name_oprostnik, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Oprostnik, response);
            }
            return CreateJsonOk(name_oprostnik, true, Enums.HTTP_Methods.PUT);
        }
      
    }
}

