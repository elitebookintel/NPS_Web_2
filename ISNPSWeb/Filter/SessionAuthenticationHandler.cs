using DevExpress.Pdf.Native.BouncyCastle.Asn1.Ocsp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using NuGet.Protocol.Plugins;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Text.Encodings.Web;

namespace ISNPSWeb.Filter
{
    //public class SessionAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    //{
    //    public SessionAuthenticationHandler(
    //        IOptionsMonitor<AuthenticationSchemeOptions> options,
    //        ILoggerFactory logger,
    //        UrlEncoder encoder,
    //        ISystemClock clock)
    //        : base(options, logger, encoder, clock)
    //    {
    //    }

    //    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    //    {
    //        var session = Context.Session;

    //        //if (session == null)
    //        //{
    //        //    return Task.FromResult(AuthenticateResult.Fail("Session is not available"));
    //        //}

    //        byte[] byteToken;
    //        session.TryGetValue("Token", out byteToken);
    //        string token = byteToken != null ? Encoding.UTF8.GetString(byteToken) : null;

    //        //var request = Context.Request;
    //        //var domainUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
    //        if (string.IsNullOrEmpty(token))
    //        {
    //            if (IsJquery.IsAjaxRequest(Context.Request))
    //            {
    //                Context.Response.Headers["Location"] = "/Account/Login";
    //                Context.Response.StatusCode = 401;
    //            }
    //            else
    //            {
    //                Context.Response.Redirect("/Account/Login");
    //            }
    //            return Task.FromResult(AuthenticateResult.Fail("No session token"));
    //        }

    //        var claims = new[] { new System.Security.Claims.Claim("Token", token) };
    //        var identity = new System.Security.Claims.ClaimsIdentity(claims, Scheme.Name);
    //        var principal = new System.Security.Claims.ClaimsPrincipal(identity);
    //        var ticket = new AuthenticationTicket(principal, Scheme.Name);

    //        return Task.FromResult(AuthenticateResult.Success(ticket));
    //    }
    //}
}
