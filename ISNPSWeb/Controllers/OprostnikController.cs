
using Application.Global_Models;
using Application.Requests.Queries.Get_Oprostnik;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models.Lincense_Group_Oprostnik;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Xml.Linq;
using static Domain.Enums;
namespace ISNPSWeb.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class OprostnikController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly ILocalization_Exception _localizationException;
        public OprostnikController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localizationException)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localizationException=localizationException;
        }
        [HttpGet("Index")]
        public IActionResult Index()
        {
            return View("~/Views/Lincense_Group_Oprostnik/Oprostnik/Index.cshtml");
        }
        [HttpGet("Get_Oprostnik_List")]
        public IActionResult Get_Oprostnik_List()
        {
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            ViewBag.CultureCookie = culture;

            return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Oprostnik_List.cshtml");
        }

        [HttpGet("Get_Add_Oprostnik")]
        public IActionResult Get_Add_Oprostnik()
        {
            return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Add_Group.cshtml");
        }

        [HttpGet("Info_Oprostnik/{name_Questionnarei}/{ID}")]
        public async Task<IActionResult> Info_Oprostnik(int ID, string name_Questionnarei)
        {
            var oprostnik_Questionnarei_DTO = new Upsert_Oprostnik_DTO();

            var Guid_CookieLock = await GetToken_Async();
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            var name_Oprostnik = Get_Name_Questionnarie(name_Questionnarei);
            var query = new Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Oprostnik=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                oprostnik_Questionnarei_DTO.ErrorCode = response.ErrorCode;
                oprostnik_Questionnarei_DTO.ErrorMessage =_localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_Oprostnik, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Detail_Oprostnik.cshtml", oprostnik_Questionnarei_DTO);
            }
            if (response.Questionnaire!=null)
            {
                oprostnik_Questionnarei_DTO.Oid = response.Questionnaire.Oid;
                oprostnik_Questionnarei_DTO.Name = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response.Questionnaire.Name);
                oprostnik_Questionnarei_DTO.CreateDate = response.Questionnaire.CreateDate;
                oprostnik_Questionnarei_DTO.UpdateDate = response.Questionnaire.UpdateDate;
                oprostnik_Questionnarei_DTO.Status = response.Questionnaire.Status;
            }
                ViewBag.CultureCookie = culture;
            
            return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Detail_Oprostnik.cshtml", oprostnik_Questionnarei_DTO);
        }

        [HttpGet("OprostnikID/{ID}/{name_Questionnarei}")]
        public async Task<IActionResult> OprostnikID(int ID, string name_Questionnarei)
        {
            var oprostnik_Questionnarei_DTO = new Upsert_Oprostnik_DTO();
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            ViewBag.CultureCookie = culture;
            if (ID == 0)
            {
                return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Upsert_Oprsotnik.cshtml", oprostnik_Questionnarei_DTO);
            }
            else
            {
                var Guid_CookieLock = await GetToken_Async();
                var name_Oprostnik = Get_Name_Questionnarie(name_Questionnarei);

                var query = new Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Oprostnik=ID };
                var response = await _mediator.Send(query);
                if (response.ErrorCode != EnErrorCode.NoError)
                {
                    oprostnik_Questionnarei_DTO.ErrorCode = response.ErrorCode;
                    oprostnik_Questionnarei_DTO.ErrorMessage =_localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_Oprostnik, response.ErrorMessage);
                    return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Upsert_Oprsotnik.cshtml", oprostnik_Questionnarei_DTO);               
                }
                if (response.Questionnaire!=null)
                {
                    oprostnik_Questionnarei_DTO.Oid = response.Questionnaire.Oid;
                    oprostnik_Questionnarei_DTO.Name = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response.Questionnaire.Name);
                    oprostnik_Questionnarei_DTO.CreateDate = response.Questionnaire.CreateDate;
                    oprostnik_Questionnarei_DTO.UpdateDate = response.Questionnaire.UpdateDate;
                    oprostnik_Questionnarei_DTO.Status = response.Questionnaire.Status;
                }
                return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Upsert_Oprsotnik.cshtml", oprostnik_Questionnarei_DTO);
            }
        }

        [HttpPost("POST_Upsert_Oprostnik")]
        public async Task<IActionResult> POST_Upsert_Oprostnik(Upsert_Oprostnik_DTO viewModel)
        {
            if (!ModelState.IsValid)
            {
                return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Upsert_Oprsotnik.cshtml", viewModel);
            }

            var Guid_CookieLock = await GetToken_Async();

            //var command = new Application.Requests.Commands.Upsert_Oprostnik.Oprostnik_Upsert.Command
            //{
            //    Oid = viewModel.Oid,
            //    Name = JsonConvert.SerializeObject(viewModel.Name),
            //    CreateDate = viewModel.CreateDate,
            //    UpdateDate = viewModel.UpdateDate,
            //    Status = viewModel.Status,
            //    BaseQueryModel=basequery
            //};

            var lang = Get_Language();
            string name_Questionnaire = "";
            if (viewModel.Name.ContainsKey(lang))
            {
                name_Questionnaire= viewModel.Name[lang];
            }
            else
            {
                foreach (EnUiLanguage val in Enum.GetValues(typeof(EnUiLanguage)))
                {
                    if (viewModel.Name.ContainsKey(lang))
                    {
                        name_Questionnaire= viewModel.Name[lang];
                        break;
                    };
                }
            }
            var response = await _mediator.Send(viewModel.ToOprostnikUpsertCommand(Guid_CookieLock));
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                if (viewModel.Oid ==0) response.ErrorMessage= _localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.POST, name_Questionnaire, response.ErrorMessage);
                else response.ErrorMessage= _localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, name_Questionnaire, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Oprostnik, response);
            }
            if (viewModel.Oid ==0) return CreateJsonOk(name_Questionnaire, true, HTTP_Methods.POST);
            else return CreateJsonOk(name_Questionnaire, true, HTTP_Methods.PUT);
        }

        [HttpGet("GeT_Delet_Oprostnik/{ID}/{name_Questionnarei}")]
        public async Task<IActionResult> GeT_Delet_Oprostnik(int ID, string name_Questionnarei)
        {
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];

            var oprostnik_Questionnarei_DTO = new Upsert_Oprostnik_DTO();
            var Guid_CookieLock = await GetToken_Async();
            var query = new Application.Requests.Queries.Get_Oprostnik.Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock,  ID_Oprostnik=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {              
                oprostnik_Questionnarei_DTO.ErrorCode = response.ErrorCode;
                oprostnik_Questionnarei_DTO.ErrorMessage =_localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_Questionnarei, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Delet_Oprostnik.cshtml", oprostnik_Questionnarei_DTO);
            }
            if (response.Questionnaire!=null)
            {
                oprostnik_Questionnarei_DTO.Oid= response.Questionnaire.Oid;
                oprostnik_Questionnarei_DTO.Name=  JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response.Questionnaire.Name); ;
                oprostnik_Questionnarei_DTO.CreateDate= response.Questionnaire.CreateDate;
                oprostnik_Questionnarei_DTO.UpdateDate = response.Questionnaire.UpdateDate;
                oprostnik_Questionnarei_DTO.Status= response.Questionnaire.Status;
            }
            ViewBag.CultureCookie = culture;
            return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Delet_Oprostnik.cshtml", oprostnik_Questionnarei_DTO);
        }

        [HttpGet("Change_Status_Oprostnik/{id}/{name}/{licenseStatus_int}")]
        public async Task<IActionResult> Change_Status_Oprostnik(int id, string name, int licenseStatus_int)
        {
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];

            var Guid_CookieLock = await GetToken_Async();
            var name_Oprostnik= Get_Name_Questionnarie(name);
            var query = new Application.Requests.Queries.Get_List_Question.List_Question_Get.Query { guid_CookieLock = Guid_CookieLock, OprostnikID=id };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage =_localizationException.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.POST, name_Oprostnik, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Change_Status_Oprostnik.cshtml", response);
            }
            if (response.Questions!=null)
            {
                bool isEmpty = !response.Questions.Any();
                ViewBag.isEmpty = isEmpty;
                ViewBag.LicenseStatus = licenseStatus_int.ToString();
            }
            ViewBag.Id=id.ToString();
            ViewBag.Name =name_Oprostnik;
            return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Change_Status_Oprostnik.cshtml", response);
        }

        [NonAction]
        public string Get_Name_Questionnarie(string json_name_Questionnaire)
        {
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            var lang = EnUiLanguage.RU;
            if (culture=="ru") lang = EnUiLanguage.RU;
            if (culture=="ro") lang = EnUiLanguage.RO;
            if (culture=="en") lang = EnUiLanguage.EN;

            string name_Oprostnik = "";
            var name_dictionary = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(json_name_Questionnaire);
            if (!name_dictionary.ContainsKey(lang))
            {
                foreach (var key in name_dictionary)
                {
                    if (key.Value !=null)
                    {
                        name_Oprostnik =key.Value;
                        break;
                    }
                }
            }
            else name_Oprostnik =name_dictionary[lang];
            return name_Oprostnik;
        }
    }
}
