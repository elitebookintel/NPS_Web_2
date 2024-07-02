using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using static DevExpress.Utils.HashCodeHelper.Primitives;
using DevExpress.XtraPrinting.BarCode.Native;
using System.Text;
using Application.Global_Models;
using static Domain.Enums;

namespace ISNPSWeb.Filter
{
    //public class SessionRequirementFilter : IAuthorizationFilter
    //{
    //    private readonly IHttpContextAccessor _httpContextAccessor;

    //    public SessionRequirementFilter(IHttpContextAccessor httpContextAccessor)
    //    {
    //        _httpContextAccessor = httpContextAccessor;
    //    }

    //    private JsonResult CreateJsonNotValid(string message = null, bool showToast = false)
    //    {
    //        return new JsonResult(new BaseJsonResponse { result = ExecutionResult.NOTVALID, message = message, showToast = showToast });
    //    }

    //    public void OnAuthorization(AuthorizationFilterContext context)
    //    {
    //        var httpContext = _httpContextAccessor.HttpContext;

    //        if (httpContext == null)
    //        {
    //            context.Result = new StatusCodeResult(StatusCodes.Status500InternalServerError);
    //            return;
    //        }

    //        if (!httpContext.Session.TryGetValue("Token", out byte[] byteToken))
    //        {
    //            if (IsJquery.IsAjaxRequest(httpContext.Request))
    //            {
    //                context.HttpContext.Response.Headers["Location"] = "/Account/Login";
    //                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
    //                context.Result = CreateJsonNotValid();
    //            }
    //            else
    //            {
    //                context.Result = new RedirectToActionResult("Login", "Account", null);
    //            }
    //            return;
    //        }
    //    }
    //    public void PerformLogout(AuthorizationFilterContext context)
    //    {
    //        var httpContext = context.HttpContext;
    //        httpContext.Session.Clear();

    //        if (IsJquery.IsAjaxRequest(httpContext.Request))
    //        {
    //            httpContext.Response.Headers["Location"] = "/Account/Login";
    //            httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
    //            context.Result = CreateJsonNotValid();
    //        }
    //        else
    //        {
    //            context.Result = new RedirectToActionResult("Login", "Account", null);
    //        }
    //    }
    //}
}
