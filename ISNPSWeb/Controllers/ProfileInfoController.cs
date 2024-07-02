using Application.Global_Models;
using Application.Requests.Queries.GetProfileInfo;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Filter;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models.ProfileInfo;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Domain.Enums;

namespace ISNPSWeb.Controllers
{
    [Authorize]
    [Culture]
    [Route("[controller]")]
    public class ProfileInfoController : BaseController
    {

        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly ILocalization_Exception _localizationException;
        public ProfileInfoController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localizationException)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localizationException=localizationException;
        }

        [HttpGet("[action]")]
        public IActionResult Index()
        {
            return View("~/Views/ProfileInfo/Index.cshtml");
        }
        [HttpGet("Indexs")]
        public IActionResult Indexs()
        {
            return PartialView("~/Views/ProfileInfo/_Indexs.cshtml");
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> ProfileInfo_Get()
        {
            var Guid_CookieLock = await GetToken_Async();

            var query = new ProfileInfo_Get.Query { guid_CookieLock = Guid_CookieLock, };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage =_localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                return PartialView("~/Views/ProfileInfo/_ProfileInfo.cshtml", response);
            }
            if (response.User ==null)
            {
                return RedirectToAction("Logout", "Account");
            }
            return PartialView("~/Views/ProfileInfo/_ProfileInfo.cshtml", response);
        }

        [HttpGet("Get_ChangePassword")]
        public IActionResult Get_ChangePassword()
        {
            return PartialView("~/Views/ProfileInfo/_ChangePassword.cshtml");
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePassword_DTO viewModel)
        {
            if (!ModelState.IsValid)
            {
                return PartialView("~/Views/ProfileInfo/_ChangePassword.cshtml", viewModel);
            }
            var Guid_CookieLock = await GetToken_Async();
            //     string token = GetToken();
            var basequery = new BaseQueryModel()
            {
                guid_CookieLock = Guid_CookieLock,
            };
            var command = new Application.Requests.Commands.ChangePassword.Password_Change.Command
            {
                NewPassword = viewModel.NewPassword,
                OldPassword = viewModel.OldPassword,
                guid_CookieLock = Guid_CookieLock,
            };
            var response = await _mediator.Send(command);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage=_localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.ProfileInfo, response);
            }
            return CreateJsonOk(Localization.Password_changed_successfully, true, HTTP_Methods.POST);
        }
    }
}
