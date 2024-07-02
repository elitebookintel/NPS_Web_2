
using Application.Global_Models;
using Application.Service.Token;
using DevExpress.Drawing.Internal.Fonts.Interop;
using Domain;
using Domain.Resources;
using ISNPSWeb.Filter;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models;
using ISNPSWeb.Models.Lincense_Group_Oprostnik;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Newtonsoft.Json;
using System.Globalization;
using static Domain.Enums;
namespace ISNPSWeb.Controllers
{
    [Route("[controller]")]
    [Culture]
    [Authorize]
    public class QuestionController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly ILocalization_Exception _localization_Exception;


        public QuestionController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localization_Exception)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localization_Exception =localization_Exception;
        }

        [HttpGet("Index/{ID}")]
        public IActionResult Index(int ID)
        {
            return View("~/Views/Question/Index.cshtml", ID);
        }

        [HttpGet("Get_Question_List/{ID}")]
        public IActionResult Get_Question_List(int ID)
        {
            ViewBag.ID=ID;
            return PartialView("~/Views/Question/_Main_Question.cshtml");
        }

        [HttpGet("OprostnikID/{ID}/{name_Oprostnik}")]
        public async Task<IActionResult> OprostnikID(int ID, string name_Oprostnik)
        {
            var oprostnik_Questionnarei_DTO = new Upsert_Oprostnik_DTO();
            var Guid_CookieLock = await GetToken_Async();

            var query = new Application.Requests.Queries.Get_Oprostnik.Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Oprostnik=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                oprostnik_Questionnarei_DTO.ErrorCode = response.ErrorCode;
                oprostnik_Questionnarei_DTO.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_Oprostnik, response.ErrorMessage);
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
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            ViewBag.CultureCookie = culture;
            return PartialView("~/Views/Lincense_Group_Oprostnik/Oprostnik/_Upsert_Oprsotnik.cshtml", oprostnik_Questionnarei_DTO);
        }

        [HttpGet("Get_Oprostnik/{ID}")]
        public async Task<IActionResult> Get_Oprostnik(int ID)
        {
            var Guid_CookieLock = await GetToken_Async();

            var oprostnik_Questionnarei_DTO = new Upsert_Oprostnik_DTO();
            var query = new Application.Requests.Queries.Get_Oprostnik.Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Oprostnik=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                oprostnik_Questionnarei_DTO.ErrorCode = response.ErrorCode;
                oprostnik_Questionnarei_DTO.ErrorMessage = _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                return PartialView("~/Views/Question/_Oprostnik_Info.cshtml", oprostnik_Questionnarei_DTO);
            }
            if (response.Questionnaire!=null)
            {
                oprostnik_Questionnarei_DTO.Oid = response.Questionnaire.Oid;
                oprostnik_Questionnarei_DTO.Name = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response.Questionnaire.Name);
                oprostnik_Questionnarei_DTO.CreateDate = response.Questionnaire.CreateDate;
                oprostnik_Questionnarei_DTO.UpdateDate = response.Questionnaire.UpdateDate;
                oprostnik_Questionnarei_DTO.Status = response.Questionnaire.Status;
            }
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            ViewBag.CultureCookie = culture;
            return PartialView("~/Views/Question/_Oprostnik_Info.cshtml", oprostnik_Questionnarei_DTO);
        }

        [HttpGet("Edit_Tittle_Oprostnik/{Oid}/{title_Oprsotnik}")]
        public async Task<IActionResult> POST_Upsert_Oprostnik(int Oid, string title_Oprsotnik)
        {
            var Guid_CookieLock = await GetToken_Async();
            var command = new Application.Requests.Commands.Upsert_Oprostnik.Oprostnik_Upsert.Command
            {
                Oid = Oid,
                Name = title_Oprsotnik,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                Status = 0,
                guid_CookieLock = Guid_CookieLock,
            };
            var response = await _mediator.Send(command);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                if (Oid==0) response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.POST, title_Oprsotnik, response.ErrorMessage);
                else response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, title_Oprsotnik, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Question, response);
            }
            if (Oid==0) return CreateJsonOk(title_Oprsotnik, true, HTTP_Methods.POST);
            else return CreateJsonOk(title_Oprsotnik, true, HTTP_Methods.PUT);
        }

        [HttpGet("Question_List/{ID}")]
        public async Task<IActionResult> Question_List(int ID)
        {
            var Guid_CookieLock = await GetToken_Async();

            List_QuestionViewModel get_upser_question = new List_QuestionViewModel();
            get_upser_question.Questions = new List<QuestionViewModel>();

            var query = new Application.Requests.Queries.Get_List_Question.List_Question_Get.Query { guid_CookieLock = Guid_CookieLock, OprostnikID=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                get_upser_question.ErrorCode = response.ErrorCode;
                get_upser_question.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                return PartialView("~/Views/Question/_Question_List.cshtml", get_upser_question);
            }
            foreach (var questionViewModel in response.Questions)
            {
                QuestionViewModel questionDetails = new QuestionViewModel
                {
                    Id = questionViewModel.Id,
                    QuestionnaireId = questionViewModel.QuestionnaireId,
                    Question = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(questionViewModel.Question),
                    GradingType = questionViewModel.GradingType,
                    Comentary =JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(questionViewModel.Comentary),
                    Index = questionViewModel.Index,
                    CreateData = questionViewModel.CreateData,
                    ResponseVariants = new List<ResponseVariantsViewModel>()
                };

                if (questionViewModel.ResponseVariants != null && questionViewModel.ResponseVariants.Count() > 0)
                {
                    var sortedResponseVariants = questionViewModel.ResponseVariants.OrderBy(rv => rv.Id).ToList();
                    foreach (var responseVariant in sortedResponseVariants)
                    {
                        ResponseVariantsViewModel responseVariantsViewModel = new ResponseVariantsViewModel();
                        responseVariantsViewModel.Id = responseVariant.Id;
                        responseVariantsViewModel.QuestionId = responseVariant.QuestionId;
                        responseVariantsViewModel.Response = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(responseVariant.Response);
                        questionDetails.ResponseVariants.Add(responseVariantsViewModel);
                    }
                }
                get_upser_question.Questions.Add(questionDetails);
                if (get_upser_question.Questions.Count()!=0)
                {
                    get_upser_question.Questions= get_upser_question.Questions.OrderBy(i => i.Index).ToList();
                    ViewBag.SetIndex = get_upser_question.Questions.Last().Index+1;
                }
            }

            var query_oprostnik = new Application.Requests.Queries.Get_Oprostnik.Oprostnik_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Oprostnik=ID };
            var response__oprostnik = await _mediator.Send(query_oprostnik);
            if (response__oprostnik.ErrorCode != EnErrorCode.NoError)
            {
                get_upser_question.ErrorCode = response__oprostnik.ErrorCode;
                get_upser_question.ErrorMessage = _localization_Exception.ErrorMessage_Localization(response__oprostnik.ErrorCode, Enums.HTTP_Methods.GET, "", response__oprostnik.ErrorMessage);
                return PartialView("~/Views/Question/_Question_List.cshtml", get_upser_question);
            }
            if (response__oprostnik.Questionnaire!=null)
            {
                get_upser_question.Oid = response__oprostnik.Questionnaire.Oid;
                get_upser_question.Name_Oprostnik = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response__oprostnik.Questionnaire.Name);
            }

            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            ViewBag.CultureCookie = culture;
            //  ViewBag.Url = url;
            ViewBag.QuestionnaireId=ID;
            return PartialView("~/Views/Question/_Question_List.cshtml", get_upser_question);
        }

        [HttpPost("POST_Upsert_Question")]
        public async Task<IActionResult> POST_Upsert_Oprostnik(Upsert_Model_Question viewModel, bool isGet_Response = true)
        {
            if (!ModelState.IsValid)
            {
                return PartialView("~/Views/Question/_Question_List.cshtml", viewModel);
            }
            var Guid_CookieLock = await GetToken_Async();
            var command = new Application.Requests.Commands.Upsert_Question.Question_Upsert.Command
            {
                Questions= viewModel.Command.Questions,
                guid_CookieLock = Guid_CookieLock,
            };
            var response = await _mediator.Send(command);
            var lang = Get_Language();
            string name_Question = "";
            IDictionary<EnUiLanguage, string> dictionary_name_Question = null;
            if (viewModel.Command.Questions.Count==1)
            {
                dictionary_name_Question= JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(viewModel.Command.Questions[0].Question);
                if (dictionary_name_Question.ContainsKey(lang))
                {
                    name_Question= dictionary_name_Question[lang];
                }
                else
                {
                    foreach (EnUiLanguage val in Enum.GetValues(typeof(EnUiLanguage)))
                    {
                        if (dictionary_name_Question.ContainsKey(lang))
                        {
                            name_Question= dictionary_name_Question[lang];
                            break;
                        };
                    }
                }
            }
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                if (viewModel.Command.Questions[0].Id==0)
                {
                    response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.POST, name_Question, response.ErrorMessage);
                }
                else
                {
                    response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.PUT, name_Question, response.ErrorMessage);
                }
                throw new Exception_Response<BaseResponse>(Localization.Exception_Question, response);
            }

            if (isGet_Response)
            {

                var query_get = new Application.Requests.Queries.Get_Question.Question_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Question=response.questionId };
                var response_Question = await _mediator.Send(query_get);
                if (response_Question.ErrorCode != EnErrorCode.NoError)
                {
                    var success_Post_Error_Get =Localization.ResourceManager.GetString("Success_Post_Error_Get", Localization.Culture);
                    response_Question.ErrorMessage= success_Post_Error_Get.Replace("_", name_Question);
                    throw new Exception_Response<BaseResponse>(Localization.Exception_Question, response_Question);
                }
                List_QuestionViewModel get_upser_question = new List_QuestionViewModel();
                get_upser_question.Questions = new List<QuestionViewModel>();
                string name_Questions = "";
                if (response_Question.question!=null)
                {
                    QuestionViewModel questionDetails = new QuestionViewModel
                    {
                        Id = response_Question.question.id,
                        QuestionnaireId = response_Question.question.questionnaireId,
                        Question = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response_Question.question.question),
                        GradingType = response_Question.question.gradingType,
                        Comentary = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response_Question.question.comentary),
                        Index = response_Question.question.index,
                        CreateData = response_Question.question.createData,
                        ResponseVariants = new List<ResponseVariantsViewModel>()
                    };

                    if (response_Question.question.ResponseVariants != null && response_Question.question.ResponseVariants.Count() > 0)
                    {
                        var sortedResponseVariants = response_Question.question.ResponseVariants.OrderBy(rv => rv.Id).ToList();
                        foreach (var responseVariant in sortedResponseVariants)
                        {
                            ResponseVariantsViewModel responseVariantsViewModel = new ResponseVariantsViewModel();
                            responseVariantsViewModel.Id = responseVariant.Id;
                            responseVariantsViewModel.QuestionId=responseVariant.QuestionId;
                            responseVariantsViewModel.Response= JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(responseVariant.Response);
                            questionDetails.ResponseVariants.Add(responseVariantsViewModel);
                        }
                    }
                    get_upser_question.Questions.Add(questionDetails);

                    if (get_upser_question.Questions[0].Question.ContainsKey(lang))
                    {
                        name_Questions= get_upser_question.Questions[0].Question[lang];
                    }
                    else
                    {
                        foreach (EnUiLanguage val in Enum.GetValues(typeof(EnUiLanguage)))
                        {
                            if (get_upser_question.Questions[0].Question.ContainsKey(lang))
                            {
                                name_Questions= get_upser_question.Questions[0].Question[lang];
                                break;
                            };
                        }
                    }
                }
                if (viewModel.Command.Questions[0].Id ==0)
                    return CreateJsonOk<IList<QuestionViewModel>>(get_upser_question.Questions, name_Questions, true, HTTP_Methods.POST);
                else return CreateJsonOk<IList<QuestionViewModel>>(get_upser_question.Questions, name_Questions, true, HTTP_Methods.PUT);
            }
            else
            {
                return CreateJsonOk(Localization.Success, false);
            }
        }

        [HttpGet("Get_Question_Delet/{questionId}/{lang}/{name_Question}")]
        public async Task<IActionResult> Get_Question_Delet(int questionId, EnUiLanguage lang, string name_Question)
        {
            var Guid_CookieLock = await GetToken_Async();
           
            var query = new Application.Requests.Queries.Get_Question.Question_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Question=questionId };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_Question, response.ErrorMessage);
                return PartialView("~/Views/Question/Modal_Delet_Question.cshtml", response);
            }
            var name_dictionary = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response.question.question);
            if (name_dictionary[lang]!="")
            {
                ViewBag.Name = name_dictionary[lang];
            }
            else
            {
                foreach (var item in name_dictionary)
                {
                    if (item.Value !="" && item.Value !=null)
                    {
                        ViewBag.Name = item.Value;
                        break;
                    }
                }
            }
            ViewBag.QuestionId = questionId;
            return PartialView("~/Views/Question/Modal_Delet_Question.cshtml", response);
        }

        [HttpGet("Statistica/{Id}/{Language}/{GradingType}/{name_Question}")]
        public async Task<IActionResult> Statistica(int Id, EnUiLanguage Language, GradingType GradingType, string name_Question)
        {
            var Guid_CookieLock = await GetToken_Async();

            List_QuestionViewModel get_upser_question = new List_QuestionViewModel();
            get_upser_question.Questions = new List<QuestionViewModel>();

            var query = new Application.Requests.Queries.Get_Question.Question_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Question=Id };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                get_upser_question.ErrorCode = response.ErrorCode;
                get_upser_question.ErrorMessage =_localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, name_Question, response.ErrorMessage);
                return PartialView("~/Views/Question/_Statistica_Question.cshtml", get_upser_question);
            }
            if (response.question!=null)
            {
                QuestionViewModel questionDetails = new QuestionViewModel
                {
                    Id = response.question.id,
                    QuestionnaireId = response.question.questionnaireId,
                    Question = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response.question.question),
                    GradingType = response.question.gradingType,
                    Comentary = JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(response.question.comentary),
                    Index = response.question.index,
                    CreateData = response.question.createData,
                    ResponseVariants = new List<ResponseVariantsViewModel>()
                };

                if (response.question.ResponseVariants != null && response.question.ResponseVariants.Count() > 0)
                {
                    var sortedResponseVariants = response.question.ResponseVariants.OrderBy(rv => rv.Id).ToList();
                    foreach (var responseVariant in sortedResponseVariants)
                    {
                        ResponseVariantsViewModel responseVariantsViewModel = new ResponseVariantsViewModel();
                        responseVariantsViewModel.Id = responseVariant.Id;
                        responseVariantsViewModel.QuestionId=responseVariant.QuestionId;
                        responseVariantsViewModel.Response= JsonConvert.DeserializeObject<IDictionary<EnUiLanguage, string>>(responseVariant.Response);
                        questionDetails.ResponseVariants.Add(responseVariantsViewModel);
                    }
                }
                get_upser_question.Questions.Add(questionDetails);

                ViewBag.Name_Queston = questionDetails.Question[Language];
                ViewBag.Data_Creat = response.question.createData;
            }

            ViewBag.QuestionId = Id;
            ViewBag.Language = Language;
            ViewBag.GradingType= GradingType;

            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            ViewBag.CultureCookie = culture;
            return PartialView("~/Views/Question/_Statistica_Question.cshtml", get_upser_question);
        }

        [HttpGet("Statistica_info/{Id}/{Data_Start}/{Data_End}/{GradingType}/{name_Question}")]
        public async Task<IActionResult> Statistica_info(int Id, string Data_Start, string Data_End, GradingType GradingType, string name_Question)
        {
            var Guid_CookieLock = await GetToken_Async();
            CultureInfo culture = new CultureInfo("ru-RU");
            var parseData_Start = DateTime.Parse(Data_Start, culture, DateTimeStyles.None);
            var parseData_End = DateTime.Parse(Data_End, culture, DateTimeStyles.None);
            var command = new Application.Requests.Queries.Get_Statisticka.Statisticka_Get.Query
            {
                QuestionID = Id,
                Data_Start = parseData_Start,
                Data_End = parseData_End,
                guid_CookieLock = Guid_CookieLock,
            };
            var response = await _mediator.Send(command);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.POST, name_Question, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Question, response);
            }
            return CreateJsonOk<Application.Requests.Queries.Get_Statisticka.Statisticka_Get.View_Model>(response, Localization.Success, true);
        }
    }
}
