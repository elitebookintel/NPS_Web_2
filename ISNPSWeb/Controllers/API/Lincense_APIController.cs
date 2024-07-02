using Application.Global_Models;
using Application.Requests.Queries.Delet_Lincense;
using Application.Requests.Queries.Get_ActivateLicense;
using Application.Requests.Queries.Get_DeactivateLicense;
using Application.Requests.Queries.Get_List_Lincense;
using Application.Requests.Queries.Get_ReleaseLicense;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Middleware;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Application.Requests.Queries.Get_List_Lincense.List_Lincense_Get;
namespace ISNPSWeb.Controllers.API
{
    [Route("[controller]")]
    [Authorize]
    public class Lincense_APIController : BaseController
    {

        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        protected readonly ILocalization_Exception _localization_Exception;

        public Lincense_APIController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localization_Exception)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localization_Exception=localization_Exception;
        }
        [HttpGet("Get_Lincesne_List")]
        public async Task<IActionResult> Get_Lincesne_List()
        {
            var Guid_CookieLock = await GetToken_Async();
            var query = new List_Lincense_Get.Query { guid_CookieLock  = Guid_CookieLock };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Lincense, response);
            }
            return CreateJsonOk<IList<Lincense_View_Model>>(response.Lincense_List);
        }

        [HttpGet("Delet_Lincense/{ID}/{divace_Name}")]
        public async Task<IActionResult> Delet_Lincense(Guid ID, string divace_Name)
        {
            var Guid_CookieLock = await GetToken_Async();

            var query = new Lincense_Delet.Query { guid_CookieLock = Guid_CookieLock, Oid=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.DELETE, divace_Name, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Lincense, response);
            }
            return CreateJsonOk(divace_Name, true, Enums.HTTP_Methods.DELETE);
        }
        [HttpGet("Change_Status_Lincense")]
        public async Task<IActionResult> Change_Status_Lincense(Guid id, int licenseStatus_int, string divace_Name)
        {
            BaseResponse response = new BaseResponse();
            var Guid_CookieLock = await GetToken_Async();
            //     string token = GetToken();

            if (licenseStatus_int == 1)
            {
                var query = new Get_ActivateLicense.Query { Oid=id, guid_CookieLock = Guid_CookieLock, };
                response= await _mediator.Send(query);
            }
            if (licenseStatus_int == 2)
            {
                var query = new DeactivateLicense_Get.Query { Oid=id, guid_CookieLock = Guid_CookieLock, };
                response= await _mediator.Send(query);
            }
            if (licenseStatus_int == -1)
            {
                var query = new Get_ReleaseLicense.Query { Oid=id, guid_CookieLock = Guid_CookieLock, };
                response= await _mediator.Send(query);
            }
            // response.ErrorCode =  EnErrorCode.Waiting;
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, divace_Name, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Lincense, response);
            }
            return CreateJsonOk(divace_Name, true, Enums.HTTP_Methods.PUT);
        }
    }
}
