
using Application.Global_Models;
using Application.Requests.Queries.Get_GroupQuestionnaire;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models;
using ISNPSWeb.Models.Lincense_Group_Oprostnik;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static Domain.Enums;
namespace ISNPSWeb.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class GroupQuestionnareiController : BaseController
    {

        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly ILocalization_Exception _localization_Exception;
        public GroupQuestionnareiController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localization_Exception)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localization_Exception=localization_Exception;
        }

        [HttpGet("Index")]
        public IActionResult Index()
        {
            return View("~/Views/Lincense_Group_Oprostnik/Group/Index.cshtml");
        }

        [HttpGet("Get_Group_List")]
        public IActionResult Get_Group_List()
        {
            return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Group_List.cshtml");
        }

        //[HttpGet("Get_Add_Group")]
        //public async Task<IActionResult> Get_Add_Group()
        //{
        //    return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Add_Group.cshtml");
        //}

        [HttpGet("Info_GroupQuestionnarei/{ID}/{name_Group}")]
        public async Task<IActionResult> Info_GroupQuestionnarei(int ID, string name_Group)
        {
            var viemmodel = new Upsert_Group_Questionnarei_DTO();
            var Guid_CookieLock = await GetToken_Async();
            var query = new GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock, GroupQuestionnaireID=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                viemmodel.ErrorCode = response.ErrorCode;
                viemmodel.ErrorMessage = _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_Group, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Detail_Group.cshtml", viemmodel);
            }
            var List_id_Questionnaire = Oprostnik_Id_List();
            if (List_id_Questionnaire.Result.ErrorCode != EnErrorCode.NoError)
            {
                viemmodel.ErrorCode = List_id_Questionnaire.Result.ErrorCode;
                viemmodel.ErrorMessage = List_id_Questionnaire.Result.ErrorMessage;
                return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Detail_Group.cshtml", viemmodel);
            }
            if (response!=null && List_id_Questionnaire.Result!=null)
            {
                viemmodel.Oid= response.GroupQuestionnarie.Id;
                viemmodel.Name= response.GroupQuestionnarie.Name;
                viemmodel.Questionnaries=response.GroupQuestionnarie.questionnaries.Select(i => i.ToString()).ToArray();
                viemmodel.List_id_Questionnaire = List_id_Questionnaire.Result;
            }
            return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Detail_Group.cshtml", viemmodel);
        }
        [HttpGet("GroupID/{ID}/{name_group}")]
        public async Task<IActionResult> GroupID(int ID, string name_group = "")
        {
            var viemmodel = new Upsert_Group_Questionnarei_DTO();
            if (ID == 0)
            {
                var lisT_Oprostnik = Get_List_Oprostnik().Result;
                viemmodel.Questionnaires_List = lisT_Oprostnik.List_Id_Oprostnik_Model;
                viemmodel.ErrorCode= lisT_Oprostnik.ErrorCode;
                viemmodel.ErrorMessage= lisT_Oprostnik.ErrorMessage;
                return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Add_Group.cshtml", viemmodel);
            }
            else
            {
                var Guid_CookieLock = await GetToken_Async();
                var query = new GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock, GroupQuestionnaireID=ID };
                var response = await _mediator.Send(query);
                if (response.ErrorCode != EnErrorCode.NoError)
                {
                    viemmodel.ErrorCode = response.ErrorCode;
                    viemmodel.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_group, response.ErrorMessage);
                    return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Add_Group.cshtml", viemmodel);
                }
                if (response!=null)
                {
                    viemmodel.Oid= response.GroupQuestionnarie.Id;
                    viemmodel.Name= response.GroupQuestionnarie.Name;
                    viemmodel.Questionnaries=response.GroupQuestionnarie.questionnaries.Select(i => i.ToString()).ToArray();

                    var lisT_Oprostnik = Get_List_Oprostnik().Result;
                    viemmodel.Questionnaires_List = lisT_Oprostnik.List_Id_Oprostnik_Model;
                    viemmodel.ErrorCode= lisT_Oprostnik.ErrorCode;
                    viemmodel.ErrorMessage= lisT_Oprostnik.ErrorMessage;
                }
                return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Add_Group.cshtml", viemmodel);
            }
        }
        [HttpPost("POST_Upsert_Group")]
        public async Task<IActionResult> POST_Upsert_Group(Upsert_Group_Questionnarei_DTO viewModel)
        {
            if (!ModelState.IsValid)
            {
                var lisT_Oprostnik = Get_List_Oprostnik().Result;
                viewModel.Questionnaires_List = lisT_Oprostnik.List_Id_Oprostnik_Model;
                viewModel.ErrorCode= lisT_Oprostnik.ErrorCode;
                viewModel.ErrorMessage= lisT_Oprostnik.ErrorMessage;
                return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Add_Group.cshtml", viewModel);
            }

            var Guid_CookieLock = await GetToken_Async();

            if (viewModel.Questionnaries ==null || viewModel.Questionnaries.Count() == 0)
            {
                viewModel.Questionnaries= new string[] { };
            }

            int[] DeletQuestionnaires = new int[] { };

            if (viewModel.Oid!=0)
            {
                int[] delet_Questionnaires = new int[0];
                var allQuestionnaires = viewModel.Questionnaries
                    .Where(x => !string.IsNullOrEmpty(x))
                    .Select(int.Parse)
                    .ToArray();

                if (viewModel.DeleteQuestionnaries !=null)
                {
                    delet_Questionnaires = viewModel.DeleteQuestionnaries
                        .Where(x => !string.IsNullOrEmpty(x))
                        .Select(int.Parse)
                        .ToArray();
                    DeletQuestionnaires = allQuestionnaires.Except(delet_Questionnaires).ToArray();
                }
                else
                {
                    DeletQuestionnaires= allQuestionnaires;
                }
                var command = new Application.Requests.Commands.Upsert_GroupQuestionnaire.GroupQuestionnaire_Upsert.Command
                {
                    Id=viewModel.Oid,
                    Name=viewModel.Name,
                    Questionnaries= delet_Questionnaires,
                    DeleteQuestionnaries=DeletQuestionnaires,
                    guid_CookieLock = Guid_CookieLock,
                };
                var response = await _mediator.Send(command);
                if (response.ErrorCode != EnErrorCode.NoError)
                {
                    response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, viewModel.Name, response.ErrorMessage);
                    throw new Exception_Response<BaseResponse>(Localization.Exception_GroupQuestionnarei, response);
                }
                return CreateJsonOk(viewModel.Name, true, HTTP_Methods.PUT);
            }
            else
            {
                var command = new Application.Requests.Commands.Upsert_GroupQuestionnaire.GroupQuestionnaire_Upsert.Command
                {
                    Id=viewModel.Oid,
                    Name=viewModel.Name,
                    Questionnaries= viewModel.Questionnaries
                    .Where(x => !string.IsNullOrEmpty(x))
                    .Select(int.Parse)
                    .ToArray(),
                    DeleteQuestionnaries=DeletQuestionnaires,
                    guid_CookieLock = Guid_CookieLock,
                };
                var response = await _mediator.Send(command);
                if (response.ErrorCode != EnErrorCode.NoError)
                {
                    response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.POST, viewModel.Name, response.ErrorMessage);
                    throw new Exception_Response<BaseResponse>(Localization.Exception_GroupQuestionnarei, response);
                }
                return CreateJsonOk(viewModel.Name, true, HTTP_Methods.POST);
            }
        }

        [HttpGet("GeT_Delet_Group/{ID}/{name_group}")]
        public async Task<IActionResult> GeT_Delet_Group(int ID, string name_group)
        {
            var viemmodel = new Upsert_Group_Questionnarei_DTO();
            //string token = GetToken();
            var Guid_CookieLock = await GetToken_Async();

            var query = new GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock, GroupQuestionnaireID=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                viemmodel.ErrorCode = response.ErrorCode;
                viemmodel.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_group, response.ErrorMessage);
                return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Delet_Group.cshtml", viemmodel);
            }
            viemmodel.Oid= response.GroupQuestionnarie.Id;
            viemmodel.Name= response.GroupQuestionnarie.Name;
            viemmodel.Questionnaries=response.GroupQuestionnarie.questionnaries.Select(i => i.ToString()).ToArray();

            var List_id_Questionnaire = Oprostnik_Id_List();
            if (List_id_Questionnaire.Result.ErrorCode != EnErrorCode.NoError)
            {
                viemmodel.ErrorCode = List_id_Questionnaire.Result.ErrorCode;
                viemmodel.ErrorMessage =List_id_Questionnaire.Result.ErrorMessage;
                return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Delet_Group.cshtml", viemmodel);
            }
            viemmodel.List_id_Questionnaire = List_id_Questionnaire.Result;
            return PartialView("~/Views/Lincense_Group_Oprostnik/Group/_Delet_Group.cshtml", viemmodel);
        }

        [NonAction]
        public async Task<List_Oprostnik_Model> Oprostnik_Id_List()
        {
            var List_id_Questionnaire = new List_Oprostnik_Model();
            List_id_Questionnaire.List_Id_Oprostnik_Model = new List<Oprostnik_Model>();
            var Guid_CookieLock = await GetToken_Async();

            var query = new Application.Requests.Queries.Get_List_Oprostnik.List_Oprostnik_Get.Query{ guid_CookieLock = Guid_CookieLock, };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                List_id_Questionnaire.ErrorCode = response.ErrorCode;
                List_id_Questionnaire.ErrorMessage = _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                return List_id_Questionnaire;
            }
            var lang = EnUiLanguage.RU;
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            if (culture == "ru") lang = EnUiLanguage.RU;
            if (culture == "ro") lang = EnUiLanguage.RO;
            if (culture == "en") lang = EnUiLanguage.EN;
            if (response.Questionnaires!=null)
            {
                foreach (var item in response.Questionnaires)
                {
                    var nameDict = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(item.Name);
                    string name = "";
                    var List_Id_Oprostnik_Model = new Oprostnik_Model();
                    if (nameDict.ContainsKey(lang) && nameDict[lang] != null)
                    {
                        name = nameDict[lang];
                        List_Id_Oprostnik_Model.Name=name;
                        List_Id_Oprostnik_Model.Oid= item.Oid.ToString();
                        List_id_Questionnaire.List_Id_Oprostnik_Model.Add(List_Id_Oprostnik_Model);
                    }
                    else
                    {
                        foreach (var item_lang in nameDict)
                        {
                            if (item_lang.Value !=null)
                            {
                                name =item_lang.Value;
                                List_Id_Oprostnik_Model.Name=name;
                                List_Id_Oprostnik_Model.Oid= item.Oid.ToString();
                                List_id_Questionnaire.List_Id_Oprostnik_Model.Add(List_Id_Oprostnik_Model);
                                break;
                            }
                        }
                    }
                }
            }
            return List_id_Questionnaire;
        }

        [NonAction]
        public async Task<List_Oprostnik_Model> Get_List_Oprostnik()
        {
            var List_id_Questionnaire = new List_Oprostnik_Model();
            List_id_Questionnaire.List_Id_Oprostnik_Model = new List<Oprostnik_Model>();
            var Guid_CookieLock = await GetToken_Async();

            var query = new Application.Requests.Queries.Get_List_Oprostnik.List_Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock, };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                List_id_Questionnaire.ErrorCode = response.ErrorCode;
                List_id_Questionnaire.ErrorMessage=  Localization.ResourceManager.GetString("Failed_load_questionnaire_names", Localization.Culture);
                return List_id_Questionnaire;
            }
            var lang = EnUiLanguage.RU;
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            if (culture == "ru") lang = EnUiLanguage.RU;
            if (culture == "ro") lang = EnUiLanguage.RO;
            if (culture == "en") lang = EnUiLanguage.EN;

            foreach (var item in response.Questionnaires)
            {
                var nameDict = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(item.Name);
                string name = "";
                var List_Id_Oprostnik_Model = new Oprostnik_Model();
                if (nameDict.ContainsKey(lang) && nameDict[lang] != null)
                {
                    name = nameDict[lang];
                    List_Id_Oprostnik_Model.Name=name;
                    List_Id_Oprostnik_Model.Oid= item.Oid.ToString();
                    List_id_Questionnaire.List_Id_Oprostnik_Model.Add(List_Id_Oprostnik_Model);
                }
                else
                {
                    foreach (var item_lang in nameDict)
                    {
                        if (item_lang.Value !=null)
                        {
                            name =item_lang.Value;
                            List_Id_Oprostnik_Model.Name=name;
                            List_Id_Oprostnik_Model.Oid= item.Oid.ToString();
                            List_id_Questionnaire.List_Id_Oprostnik_Model.Add(List_Id_Oprostnik_Model);
                            break;
                        }
                    }
                }
            }
            return List_id_Questionnaire;
        }
    }
}
