using Application.Global_Models;
using Application.Requests.Queries.Get_List_Question;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using static Domain.Enums;
namespace ISNPSWeb.Controllers.API
{
    [Route("[controller]")]
    [Authorize]
    public class Question_APIController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly ILocalization_Exception _localization_Exception;

        public Question_APIController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, ILocalization_Exception localization_Exception)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _localization_Exception=localization_Exception; 
        }

        [HttpGet("Question_List")]
        public async Task<IActionResult> Question_List(int ID)
        {
            var Guid_CookieLock = await GetToken_Async();

            var query = new List_Question_Get.Query { guid_CookieLock = Guid_CookieLock, OprostnikID=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Question, response);
            }
            return CreateJsonOk<IList<List_Question_Get.QuestionViewModel>>(response.Questions,Localization.Success, true);
        }

        [HttpGet("Delet_Question/{ID}/{name_Question}")]
        public async Task<IActionResult> Delet_Question(int ID,string name_Question)
        {
            var Guid_CookieLock = await GetToken_Async();

            var query = new Application.Requests.Queries.Delet_Question.Question_Delet.Query { guid_CookieLock = Guid_CookieLock, IdQuestion =ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.DELETE, name_Question, response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Question, response);
            }
            return CreateJsonOk(name_Question, true, HTTP_Methods.DELETE);
        }

        [HttpGet("Question/{ID}")]
        public async Task<IActionResult> Question(int ID)
        {
            var Guid_CookieLock = await GetToken_Async();

            var query = new Application.Requests.Queries.Get_Question.Question_Get.Query { guid_CookieLock = Guid_CookieLock, ID_Question=ID };
            var response = await _mediator.Send(query);
            if (response.ErrorCode != EnErrorCode.NoError)
            {
                response.ErrorMessage= _localization_Exception.ErrorMessage_Localization(response.ErrorCode, Enums.HTTP_Methods.GET, "", response.ErrorMessage);
                throw new Exception_Response<BaseResponse>(Localization.Exception_Question, response);
            }

            List_QuestionViewModel get_upser_question = new List_QuestionViewModel();
            get_upser_question.Questions = new List<QuestionViewModel>();
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
            }
            return CreateJsonOk<IList<QuestionViewModel>>(get_upser_question.Questions, Localization.Success, true);
        }
    }
}
