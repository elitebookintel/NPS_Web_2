
using Application.Global_Models;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Filter;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models.Lincense_Group_Oprostnik;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
namespace ISNPSWeb.Controllers
{
    [Route("[controller]")]
    [Authorize]
    //[SessionRequirement]
    public class LincenseController : BaseController
    {

        private readonly IMediator _mediator;
        private readonly RefreshToken _refreshToken;
        private readonly ITokenService _tokenService;
        private readonly ICurrentUserService _currentUserService;
        protected readonly ILocalization_Exception _localization_Exception;

        public LincenseController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ICurrentUserService currentUserService, ILocalization_Exception localization_Exception)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _currentUserService = currentUserService;
            _localization_Exception= localization_Exception;
        }

        [HttpGet("Index")]
        public IActionResult Index()
        {
            return View("~/Views/Lincense_Group_Oprostnik/Lincense/Index.cshtml");
        }
        [HttpGet("Lincense_Group_Oprostnik")]
        public IActionResult Lincense_Group_Oprostnik()
        {
            return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Lincense_List.cshtml");
        }

        [HttpGet("Get_Lincesne_List")]
        public IActionResult Get_Lincesne_List()
        {
            return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Lincense_List.cshtml");
        }

        [HttpGet("Get_Oprostnik_List")]
        public IActionResult Get_Oprostnik_List()
        {
            return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Oprostnik_List.cshtml");
        }

        [HttpGet("Get_Add_Lincense")]
        public IActionResult Get_Add_Lincense()
        {
            var viewModel = new Add_Lincese_Model_DTO();
            return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Add_Lincense.cshtml", viewModel);
        }

        [HttpPost("POST_Add_Lincense")]
        public async Task<IActionResult> POST_Add_Lincense(Add_Lincese_Model_DTO viewModel)
        {
            if (!ModelState.IsValid)
            {
                return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Add_Lincense.cshtml", viewModel);
            }
            var Guid_CookieLock = await GetToken_Async();
            var command = new Application.Requests.Commands.AddLincense.Lincense_Add.Command
            {
                GroupQ=viewModel.GroupQ,
                Quantity = viewModel.Quantity,
                guid_CookieLock=Guid_CookieLock
            };

            var response = await _mediator.Send(command);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.POST, viewModel.Name_GroupQ, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Lincense, response);
            }
            return CreateJsonOk(Localization.Licenses_created, true, null);
        }
        [HttpGet("Get_UpsertLicense/{Oid}/{DeviceName}/{name_group}")]
        public async Task<IActionResult> Get_UpsertLicense(Guid Oid, string DeviceName, string name_group)
        {
            var Guid_CookieLock = await GetToken_Async();
            var query = new Application.Requests.Queries.Get_Lincense.Lincense_Get.Query { Oid= Oid, guid_CookieLock = Guid_CookieLock, };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, DeviceName, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_UpsertLicense.cshtml", response);
            }
            if (response.License!=null)
            {
                var query_group = new Application.Requests.Queries.Get_GroupQuestionnaire.GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock, GroupQuestionnaireID=response.License.GroupQuestionnarieID };
                var response_group = await _mediator.Send(query_group);
                if (response_group.ErrorCode != EnErrorCode.NoError)
                {
                    response.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response_group.ErrorCode, Enums.HTTP_Methods.GET, name_group, response_group.ErrorMessage);
                    return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_UpsertLicense.cshtml", response);
                }
                ViewBag.Name_Group = response_group.GroupQuestionnarie.Name;
            }
            return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_UpsertLicense.cshtml", response);
        }

        [HttpGet("Get_Lincesne/{Oid}/{DeviceName}/{name_group}")]
        public async Task<IActionResult> Get_Lincesne(Guid Oid, string DeviceName, string name_group)
        {
            var Guid_CookieLock = await GetToken_Async();
            //     string token = GetToken();
            var basequery = new BaseQueryModel()
            {
                guid_CookieLock = Guid_CookieLock,
            };

            var query = new Application.Requests.Queries.Get_Lincense.Lincense_Get.Query { Oid= Oid, guid_CookieLock = Guid_CookieLock, };
            var response = await _mediator.Send(query);

            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, DeviceName, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Detail_Lincense.cshtml", response);
            }
            if (response.License!=null)
            {
                var query_group = new Application.Requests.Queries.Get_GroupQuestionnaire.GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock, GroupQuestionnaireID=response.License.GroupQuestionnarieID };
                var response_group = await _mediator.Send(query_group);

                if (response_group.ErrorCode != EnErrorCode.NoError)
                {
                    response.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response_group.ErrorCode, Enums.HTTP_Methods.GET, name_group, response_group.ErrorMessage);
                    return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Detail_Lincense.cshtml", response);
                }
                ViewBag.Name_Group = response_group.GroupQuestionnarie.Name;
            }
            return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Detail_Lincense.cshtml", response);
        }

        [HttpGet("Delet_Get_Lincesne/{ID}/{DeviceName}/{name_group}")]
        public async Task<IActionResult> Delet_Get_Lincesne(Guid ID, string DeviceName, string name_group)
        {
            var Guid_CookieLock = await GetToken_Async();
            //     string token = GetToken();
            var basequery = new BaseQueryModel()
            {
                guid_CookieLock = Guid_CookieLock,
            };
            var query = new Application.Requests.Queries.Get_Lincense.Lincense_Get.Query { Oid= ID, guid_CookieLock = Guid_CookieLock, };

            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, DeviceName, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Delet_Lincense.cshtml", response);
            }
            if (response.License!=null)
            {
                var query_group = new Application.Requests.Queries.Get_GroupQuestionnaire.GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock,  GroupQuestionnaireID=response.License.GroupQuestionnarieID };
                var response_group = await _mediator.Send(query_group);

                if (response_group.ErrorCode != EnErrorCode.NoError)
                {
                    response.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response_group.ErrorCode, Enums.HTTP_Methods.GET, name_group, response_group.ErrorMessage);
                    return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Delet_Lincense.cshtml", response);
                }
                ViewBag.Name_Group = response_group.GroupQuestionnarie.Name;
            }
            return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Delet_Lincense.cshtml", response);
        }

        [HttpGet("Change_Status_Lincense/{id}/{licenseStatus_int}/{Divace_Name}")]
        public IActionResult Change_Status_Lincense(Guid id, int licenseStatus_int, string Divace_Name)
        {
            ViewBag.LicenseStatus = licenseStatus_int.ToString();
            ViewBag.Id=id.ToString();
            ViewBag.Divace_Name =Divace_Name;
            return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_Change_Status_Lincense.cshtml");
        }

        [HttpPost("UpsertLicense")]
        public async Task<IActionResult> UpsertLicense(UpsertLicense_DTO viewModel)
        {
            if (!ModelState.IsValid)
            {
                return PartialView("~/Views/Lincense_Group_Oprostnik/Lincense/_UpsertLicense.cshtml", viewModel);
            }
            var Guid_CookieLock = await GetToken_Async();
            //     string token = GetToken();
            //var basequery = new BaseQueryModel()
            //{
            //    guid_CookieLock = Guid_CookieLock,
            //};
            DateTime LicenseActivated;
            if (viewModel.licenseActivated == null)
            {
                LicenseActivated = DateTime.MinValue;
            }
            else
            {
                LicenseActivated =  (DateTime)viewModel.licenseActivated;
            }
            var command = new Application.Requests.Commands.UpsertLicense.Put_UpsertLicense.Command
            {
                Oid = viewModel.Oid,
                CompanyOid = _currentUserService.CompanyID,
                activationCode = viewModel.activationCode,
                licenseActivated =LicenseActivated,
                licenseStatus = viewModel.licenseStatus,
                deviceName = viewModel.deviceName,
                groupQuestionnarieID = viewModel.groupQuestionnarieID,
                guid_CookieLock=Guid_CookieLock
            };

            var response = await _mediator.Send(command);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, viewModel.deviceName, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Lincense, response);
            }
            return CreateJsonOk(viewModel.deviceName, true, Enums.HTTP_Methods.PUT);
        }
    }
}


