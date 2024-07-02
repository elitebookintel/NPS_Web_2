using Application.Global_Models;
using Application.Requests.Queries.Delet_GroupQuestionnaire;
using Application.Requests.Queries.Get_List_GroupQuestionnaire;
using Application.Requests.Queries.Get_List_Oprostnik;
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
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using static Domain.Enums;
namespace ISNPSWeb.Controllers.API
{

    [Route("[controller]")]
    [Authorize]
    public class GroupQuestionnarei_APIController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly ILocalization_Exception _localization_Exception;

        public GroupQuestionnarei_APIController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localization_Exception)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localization_Exception=localization_Exception;
        }

        [HttpGet("Group_List")]
        public async Task<IActionResult> Group_List()
        {
            var Guid_CookieLock = await GetToken_Async();
            //     string token = GetToken();
            var query = new List_GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock, };

            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_GroupQuestionnarei, response);
            }
            return CreateJsonOk(response.View_GroupQuestionnaries);
        }

        [HttpGet("Delet_Group/{ID}/{name_Group}")]
        public async Task<IActionResult> Delet_Group(int ID, string name_Group)
        {
            var Guid_CookieLock = await GetToken_Async();
            //     string token = GetToken();
            var query = new GroupQuestionnaire_Delet.Query { guid_CookieLock = Guid_CookieLock, ID_GroupQuestionnaire=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.DELETE, name_Group, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_GroupQuestionnarei, response);
            }
            return CreateJsonOk(name_Group, true, HTTP_Methods.DELETE);

        }

        [HttpGet("Oprostnik_Id_List")]
        public async Task<IActionResult> Oprostnik_Id_List()
        {
            var List_id_Questionnaire = new List_Oprostnik_Model();
            List_id_Questionnaire.List_Id_Oprostnik_Model = new List<Oprostnik_Model>();
            //string token = GetToken();
            var Guid_CookieLock = await GetToken_Async();
            var query = new Application.Requests.Queries.Get_List_Oprostnik.List_Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock };
            
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_GroupQuestionnarei, response);
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
            return Json(List_id_Questionnaire.List_Id_Oprostnik_Model);
        }
        [HttpGet("GroupID/{ID}")]
        public async Task<IActionResult> GroupID(int ID)
        {
            var viemmodel = new Upsert_Group_Questionnarei_DTO();

            var Guid_CookieLock = await GetToken_Async();
            var query = new Application.Requests.Queries.Get_GroupQuestionnaire.GroupQuestionnaire_Get.Query { guid_CookieLock = Guid_CookieLock, GroupQuestionnaireID=ID };
            
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {                
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_GroupQuestionnarei, response);
            }
            if (response.GroupQuestionnarie!=null)
            {
                viemmodel.Oid= response.GroupQuestionnarie.Id;
                viemmodel.Name= response.GroupQuestionnarie.Name;
                viemmodel.Questionnaries=response.GroupQuestionnarie.questionnaries.Select(i => i.ToString()).ToArray();
            }
            return CreateJsonOk(viemmodel);
        }


    }
}

