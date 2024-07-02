using Domain;
using Domain.Resources;
using ISNPSWeb.Middleware;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using static Domain.Enums;

namespace ISNPSWeb.Service
{
    public interface ILocalization_Exception
    {
        public string ErrorMessage_Localization(EnErrorCode enErrorCode, HTTP_Methods? hTTP_Methods, string record, string ErrorMesage);
        //   public string ErrorMessage_Localization(EnErrorCode enErrorCode, string record);
        public string ErrorMessage_Localization(string ErrorMesage);
    }

    public class Localization_Exception : ILocalization_Exception
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IActionDescriptorCollectionProvider _actionDescriptorCollectionProvider;

        public Localization_Exception(IHttpContextAccessor httpContextAccessor, IActionDescriptorCollectionProvider actionDescriptorCollectionProvider)
        {
            _httpContextAccessor = httpContextAccessor;
            _actionDescriptorCollectionProvider = actionDescriptorCollectionProvider;
        }
        public string ErrorMessage_Localization(EnErrorCode enErrorCode, HTTP_Methods? hTTP_Methods, string record, string ErrorMesage)
        {
            var controllerName = GetControllerName();
            var actionName = ActionName();

            var cultureCookie = _httpContextAccessor.HttpContext.Request.Cookies[CookieRequestCultureProvider.DefaultCookieName];
            if (string.IsNullOrEmpty(cultureCookie))
            {
                throw new Exception("Culture cookie not found.");
            }

            var part1 = cultureCookie.Split('|')[0];
            var culture = part1.Split('=')[1];
            var lang = DetermineLanguage(culture);

            var controllerName_Localization = Localization.ResourceManager.GetString("Exception_"+controllerName, Localization.Culture);
            var enErrorCode_Localization = Localization.ResourceManager.GetString(enErrorCode.ToString(), Localization.Culture);
            if (enErrorCode_Localization !=null || controllerName_Localization!=null)
            {
                var genus = Linguistics.Genus_determination(controllerName_Localization, lang);
                string hTTP_Methods_Localization = "";
                if (enErrorCode == EnErrorCode.Record_not_exist)
                {
                    hTTP_Methods_Localization="_";
                }
                else hTTP_Methods_Localization = Localization.ResourceManager.GetString("Exception_"+hTTP_Methods.ToString(), Localization.Culture) ?? "";

                if (actionName.Contains("List"))
                {
                    controllerName_Localization= Linguistics.PluralizeName(controllerName_Localization, lang, genus, enErrorCode_Localization);
                }
                if (enErrorCode_Localization.Contains("на _"))
                {
                    hTTP_Methods_Localization= Linguistics.TransformToPrepositional(hTTP_Methods_Localization);
                }
                return enErrorCode_Localization.Replace("_", hTTP_Methods_Localization.Replace("_", controllerName_Localization+" "+record));
            }
            else { return ErrorMesage; }
        }
        public string ErrorMessage_Localization(string ErrorMesage)
        {
            return ErrorMesage;
        }
        public string GetControllerName()
        {
            var context = _httpContextAccessor.HttpContext;
            if (context != null)
            {
                var routeData = context.GetRouteData();
                if (routeData != null)
                {
                    var controllerActionDescriptor = routeData.Values["controller"] as string;
                    return controllerActionDescriptor.Split("_")[0];
                }
            }
            return null;
        }
        public string ActionName()
        {
            var context = _httpContextAccessor.HttpContext;
            if (context != null)
            {
                var routeData = context.GetRouteData();
                if (routeData != null)
                {
                    var controllerActionDescriptor = routeData.Values["action"] as string;
                    return controllerActionDescriptor;
                }
            }
            return null;
        }
        private EnUiLanguage DetermineLanguage(string culture)
        {
            return culture switch
            {
                "ru" => EnUiLanguage.RU,
                "ro" => EnUiLanguage.RO,
                "en" => EnUiLanguage.EN,
                _ => EnUiLanguage.RU
            };
        }
    }
}
