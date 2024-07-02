using Application.Global_Models;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Middleware;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using static Domain.Enums;

namespace ISNPSWeb.Controllers
{
    public class BaseController : Controller
    {
        private IMediator _mediator;
        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        public static string refreshedToken = "";


        public string GetLanguageCookie()
        {
            var cookie = Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            if (cookie == null)
            {
                return "ru";
            }
            else
            {
                var c_uic = cookie.Split('|');
                var culture = c_uic[0].Split("=");

                return culture[1];
            }
        }
        [AllowAnonymous]
        public UserClaim GetUserClaims()
        {
            try
            {
                var cookie = GetLanguageCookie();
                var claimPrincipal = User as ClaimsPrincipal;
                var claimIdentity = claimPrincipal.Identity as ClaimsIdentity;

                UserClaim userClaim = new UserClaim();
                if (claimIdentity?.Claims.Count() != 0)
                {
                    var IdClaim = claimIdentity.Claims.Single(c => c.Type == "ID");
                    var FullNameClaim = claimIdentity.Claims.Single(c => c.Type == "FullName");
                    var UiLanguageClaim = claimIdentity.Claims.Single(c => c.Type == "UiLanguage");
                    var EmailClaim = claimIdentity.Claims.Single(c => c.Type == ClaimTypes.Email);
                    var PictureClaim = claimIdentity.Claims.Single(c => c.Type == "Picture");

                    userClaim.Id = int.Parse(IdClaim.Value);
                    userClaim.FullName = FullNameClaim.Value;
                    if (cookie==null) userClaim.UiLanguage = UiLanguageClaim.Value; else userClaim.UiLanguage =cookie;
                    userClaim.Email = EmailClaim.Value;
                    userClaim.Picture = PictureClaim.Value;
                }
                else
                {
                    userClaim.Id = 0;
                    userClaim.FullName = string.Empty;
                    userClaim.UiLanguage = cookie;
                    userClaim.Email = string.Empty;
                    userClaim.Picture = string.Empty;
                }

                return userClaim;
            }
            catch (Exception ex)
            {
                var cookie = "ru";
                UserClaim userClaim = new UserClaim()
                {
                    Id = 0,
                    FullName = string.Empty,
                    UiLanguage = cookie,
                    Email = string.Empty,
                    Picture = string.Empty,
                };
                return userClaim;
            }
        }
        public string GetToken()
        {
            // AsyncSessionHelper.Get_Token_Async(HttpContext.Session);
            var claimPrincipal = User as ClaimsPrincipal;
            var claimIdentity = claimPrincipal.Identity as ClaimsIdentity;

            var claim = (from c in claimPrincipal.Claims
                         where c.Type == ".AspNetCore.Admin"
                         select c).FirstOrDefault();
            //преобразует строку в безопасную для использования в URI форму.
            //Uri.UnescapeDataString(claim.Value.ToString());       
            return Uri.EscapeDataString(claim.Value.ToString());
        }
        public async Task<Guid_CookieLock> GetToken_Async()
        {
            if (User is not ClaimsPrincipal claimPrincipal)
            {
                throw new InvalidOperationException("User is not a ClaimsPrincipal.");
            }
            var guidClaim = claimPrincipal.FindFirst("Guid");
            if (guidClaim == null)
            {
                throw new InvalidOperationException("Guid claim is missing.");
            }
            var guidCookieLock = await AsyncSessionHelper.Get_Token_Async(guidClaim.Value);
            return guidCookieLock;
        }
        protected virtual IActionResult CreateJsonLogout(string message = null, bool showToast = false)
        {
            return Json(new BaseJsonResponse { result = ExecutionResult.LOGOUT, message = message, showToast = showToast });
        }
        protected virtual IActionResult CreateJsonKo(string message = null, bool showToast = false)
        {
            return Json(new BaseJsonResponse { result = ExecutionResult.KO, message = message, showToast = showToast });
        }
        protected virtual IActionResult CreateJsonNotValid(string message = null, bool showToast = false)
        {
            return Json(new BaseJsonResponse { result = ExecutionResult.NOTVALID, message = message, showToast = showToast });
        }
        protected virtual IActionResult CreateJsonError(string message = null, bool showToast = false)
        {
            return Json(new BaseJsonResponse { result = ExecutionResult.ERROR, message = message, showToast = showToast });
        }
        protected virtual IActionResult CreateJsonOk(string message = null, bool showToast = false, HTTP_Methods? hTTP_Methods = null)
        {
            if (hTTP_Methods != null) message = Message_Exception_Localization(message, hTTP_Methods);
            return Json(new BaseJsonResponse { result = ExecutionResult.OK, message = message, showToast = showToast });
        }
        protected virtual IActionResult CreateJsonOk<RecordModelT>(RecordModelT record, string message = null, bool showToast = false, HTTP_Methods? hTTP_Methods = null) where RecordModelT : class
        {
            if (hTTP_Methods != null) message = Message_Exception_Localization(message, hTTP_Methods);
            return Json(new SingleJsonResponse<RecordModelT> { result = ExecutionResult.OK, message = message, showToast = showToast, Record = record });
        }
        protected virtual IActionResult CreateJsonOk<RecordModelT>(IEnumerable<RecordModelT> records, string message = null, bool showToast = false, HTTP_Methods? hTTP_Methods = null) where RecordModelT : class
        {
            if (hTTP_Methods != null) message = Message_Exception_Localization(message, hTTP_Methods);
            return Json(new CollectionJsonResponse<RecordModelT> { result = ExecutionResult.OK, message = message, showToast = showToast, Records = records });
        }
        public virtual EnUiLanguage Get_Language()
        {
            var cultureCookie = HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            var part1 = cultureCookie.Split("|")[0];
            var culture = part1.Split("=")[1];
            var lang = EnUiLanguage.RU;
            if (culture =="ru") lang= EnUiLanguage.RU;
            else if (culture =="ro") lang= EnUiLanguage.RO;
            else if (culture =="en") lang=EnUiLanguage.EN;
            return lang;
        }
        private string Message_Exception_Localization(string message, HTTP_Methods? hTTP_Methods)
        {
            var controllerName = ControllerContext.RouteData.Values["controller"].ToString().Split("_")[0];
            var actionName = ControllerContext.RouteData.Values["action"].ToString();

            var controllerName_Localization = Localization.ResourceManager.GetString("Ok_"+controllerName, Localization.Culture);
            var hTTP_Methods_Localization = Localization.ResourceManager.GetString("Ok_"+hTTP_Methods.ToString(), Localization.Culture);
            var lang = Get_Language();
            var genus = Linguistics.Genus_determination(controllerName_Localization, lang);
            if (actionName.Contains("List"))
            {
                controllerName_Localization= Linguistics.PluralizeName(controllerName_Localization, lang, genus, controllerName_Localization);
            }
            var hTTP_Methods_Localization_Genus_determination = Linguistics.LocalizeHttpMethod(genus, lang, hTTP_Methods_Localization);
            return controllerName_Localization +" "+ message + " " + Localization.Ok_Success + " " + hTTP_Methods_Localization_Genus_determination;
        }


    }
}
