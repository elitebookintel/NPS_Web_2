using ISNPSWeb.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Globalization;
using System.Web.Http.Filters;
using IActionFilter = Microsoft.AspNetCore.Mvc.Filters.IActionFilter;

namespace ISNPSWeb.Filter
{
    public class CultureAttribute : FilterAttribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
            string cultureName = null;
            var controller = filterContext.Controller as BaseController;

            var cultureCookie = controller.GetLanguageCookie();

            if (cultureCookie != null)
                cultureName = cultureCookie.ToLower();
            else
            {
                cultureName = "ru";
            }

            List<string> cultures = new List<string>() { "en", "ro", "ru" };
            if (!cultures.Contains(cultureName))
            {
                cultureName = "ru";
            }
            Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureName);
            Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture(cultureName);
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {

        }
    }
}
