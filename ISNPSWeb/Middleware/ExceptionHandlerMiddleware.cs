using Application.Global_Models;
using Domain;
using ISNPSWeb.Filter;
using ISNPSWeb.Service;
using System.Net;
using System.Text.RegularExpressions;
using static Domain.Enums;
using JsonResult = Microsoft.AspNetCore.Mvc.JsonResult;

namespace ISNPSWeb.Middleware
{
    [Culture]
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                //https://devblogs.microsoft.com/dotnet/configureawait-faq/
                await HandleExceptionMessageAsync(context, ex).ConfigureAwait(false);
            }
        }
        private async Task HandleExceptionMessageAsync(HttpContext context, Exception exception)
        {

            context.Response.ContentType = "application/json";
            string httpMethod = context.Request.Method;
            Enum.TryParse(httpMethod, out HTTP_Methods result);
            int statusCode = 200;
            JsonResult jsonResult;
            var record = exception.Message;
            if (exception is Exception_Response<BaseResponse> customException)
            {
                string ErrorMessage = customException.BaseResponse.ErrorMessage;
                switch (customException.BaseResponse.ErrorCode)
                {
                    case EnErrorCode.Internal_error:
                    case EnErrorCode.Declined:
                    case EnErrorCode.Waiting:
                    case EnErrorCode.Unknown:
                    case EnErrorCode.Record_not_exist:
                        jsonResult = CreateJsonKo(ErrorMessage, true);
                        break;
                    case EnErrorCode.Access_denied:
                    case EnErrorCode.Invalid_token:
                        jsonResult = CreateJsonLogout(ErrorMessage, true);
                        break;
                    case EnErrorCode.Failed:
                        jsonResult = CreateJsonError(ErrorMessage, true);
                        break;
                    default:
                        //ErrorMessage =Localization_Exception(EnErrorCode.Unknown, message, isGET);
                        jsonResult = new JsonResult(new BaseJsonResponse
                        {
                            result = ExecutionResult.KO,
                            message = customException.Message,
                            showToast = true,
                        });
                        break;
                }
            }
            else
            {
                statusCode = (int)HttpStatusCode.InternalServerError;
                jsonResult = new JsonResult(new BaseJsonResponse
                {
                    result = ExecutionResult.KO,
                    message = exception.Message,
                    showToast = true,
                });
            }
            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsJsonAsync(jsonResult.Value);
        }

        protected JsonResult CreateJsonLogout(string message = null, bool showToast = false)
        {
            return new JsonResult(new BaseJsonResponse { result = ExecutionResult.LOGOUT, message = message, showToast = showToast });
        }
        protected static JsonResult CreateJsonKo(string Message = null, bool ShowToast = false)
        {
            return new JsonResult(new BaseJsonResponse { result = ExecutionResult.KO, message = Message, showToast = ShowToast });
        }
        protected JsonResult CreateJsonNotValid(string message = null, bool showToast = false)
        {
            return new JsonResult(new BaseJsonResponse { result = ExecutionResult.NOTVALID, message = message, showToast = showToast });
        }
        protected JsonResult CreateJsonError(string message = null, bool showToast = false)
        {
            return new JsonResult(new BaseJsonResponse { result = ExecutionResult.ERROR, message = message, showToast = showToast });
        }
        protected JsonResult CreateJsonOk(string message = null, bool showToast = false)
        {
            return new JsonResult(new BaseJsonResponse { result = ExecutionResult.OK, message = message, showToast = showToast });
        }

    }
    public static class Linguistics
    {
        public static Genus? Genus_determination(string name_controller, EnUiLanguage lang)
        {
            if (lang == EnUiLanguage.RU)
            {
                var maleEndings = new HashSet<string> { "ый", "ий", "ой", "ый", "ой", "ий" };
                var femaleEndings = new HashSet<string> { "ая", "яя" };
                var neuterEndings = new HashSet<string> { "ое", "ее" };

                if (maleEndings.Contains(name_controller.Substring(name_controller.Length - 2)))
                {
                    return Genus.Man;
                }
                else if (femaleEndings.Contains(name_controller.Substring(name_controller.Length - 2)))
                {
                    return Genus.Wom;
                }
                else if (neuterEndings.Contains(name_controller.Substring(name_controller.Length - 2)))
                {
                    return Genus.Avar;
                }
                char lastChar = name_controller[name_controller.Length - 1];
                if (lastChar == 'а' || lastChar == 'я')
                {
                    return Genus.Wom;
                }
                else if (lastChar == 'о' || lastChar == 'е')
                {
                    return Genus.Avar;
                }
                else
                {
                    return Genus.Man;
                }
            }
            if (lang == EnUiLanguage.RO)
            {
                var maleEndings = new HashSet<string> { "e", "i", "l", "r", "u", "m", "n", "t", "u", "x" };
                var femaleEndings = new HashSet<string> { "ă", "a", "ea", "i", "e" };
                var neuterEndings = new HashSet<string> { "e", "i", "o", "u", "et" };

                if (name_controller.Length >= 2)
                {
                    string lastTwoChars = name_controller.Substring(name_controller.Length - 2);
                    if (femaleEndings.Contains(lastTwoChars))
                    {
                        return Genus.Wom;
                    }
                    else if (neuterEndings.Contains(lastTwoChars))
                    {
                        return Genus.Avar;
                    }
                }

                char lastChar = name_controller[name_controller.Length - 1];
                if (femaleEndings.Contains(lastChar.ToString()))
                {
                    return Genus.Wom;
                }
                else if (neuterEndings.Contains(lastChar.ToString()))
                {
                    return Genus.Avar;
                }
                else if (maleEndings.Contains(lastChar.ToString()))
                {
                    return Genus.Man;
                }
            }
            return null;
        }

        public static string LocalizeHttpMethod(Genus? genus, EnUiLanguage lang, string localizedMethod)
        {
            if (genus == Genus.Wom)
            {
                if (lang == EnUiLanguage.RU)
                    localizedMethod += "а";
                if (lang == EnUiLanguage.RO)
                    localizedMethod += "ă";
            }
            else if (genus == Genus.Man)
            {
                if (lang == EnUiLanguage.RU)
                    localizedMethod += "";
                if (lang == EnUiLanguage.RO)
                    localizedMethod += "";
            }
            else if (genus == Genus.Avar)
            {
                if (lang == EnUiLanguage.RU)
                    localizedMethod += "о";
                if (lang == EnUiLanguage.RO)
                    localizedMethod += "";
            }
            return localizedMethod;
        }
        public static string PluralizeName(string name_controller, EnUiLanguage lang, Genus? genus, string enErrorCode_Localization)
        {
            if (name_controller =="лицензии")
            {
                return "лицензий";
            }
            if (lang == EnUiLanguage.RU)
            {
                if (genus == Genus.Man)
                {
                    if (name_controller.EndsWith("ик"))
                        return name_controller.Substring(0, name_controller.Length - 2) + "иков";
                    else
                        return name_controller.Substring(0, name_controller.Length - 1) + "ов";
                }
                else if (genus == Genus.Wom)
                {
                    if (name_controller.EndsWith("я"))
                        return name_controller.Substring(0, name_controller.Length - 1) + "ей";
                    else
                        return name_controller.Substring(0, name_controller.Length - 1) + "ов";
                }
                else if (genus == Genus.Avar)
                {
                    return name_controller.Substring(0, name_controller.Length - 1) + "ов";
                }
            }
            else if (lang == EnUiLanguage.RO)
            {
                if (genus == Genus.Man)
                {
                    return name_controller + "i";
                }
                else if (genus == Genus.Wom)
                {
                    if (name_controller.EndsWith("ă") || name_controller.EndsWith("a"))
                        return name_controller.Substring(0, name_controller.Length - 1) + "e";
                    else
                        return name_controller + "e";
                }
                else if (genus == Genus.Avar)
                {
                    return name_controller + "uri";
                }
            }
            else if (lang == EnUiLanguage.EN)
            {
                if (name_controller.EndsWith("s") || name_controller.EndsWith("ch") || name_controller.EndsWith("sh") || name_controller.EndsWith("x") || name_controller.EndsWith("z"))
                    return name_controller + "'";
                else
                    return name_controller + "'s";
            }

            return name_controller;
        }

        public static string TransformToPrepositional(string hTTP_Methods_Localization)
        {
            string[] words = hTTP_Methods_Localization.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string baseWord = words[0].Substring(0, words[0].Length - 2);
            string ending = words[0].Substring(words[0].Length - 2);
            switch (ending)
            {
                case "ке":
                case "ки":
                    baseWord += "ку";
                    break;
                case "ии":
                    baseWord += "ие";
                    break;
            }
            if (words.Length > 0)
            {
                words[0] = baseWord;
            }
            return string.Join(" ", words);
        }
    }
}
