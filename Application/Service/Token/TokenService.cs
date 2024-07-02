using Application.Global_Models;
using Application.Service.URL_API;
using Domain;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Security.Claims;

namespace Application.Service.Token
{
    public class TokenService : ITokenService
    {
        private readonly URL_Admin_NPS _Admin_NPS;
        private readonly GlobalQuery _globalQuery;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TokenService(URL_Admin_NPS _admin_NPS, GlobalQuery globalQuery, IHttpContextAccessor httpContextAccessor)
        {
            _Admin_NPS = _admin_NPS;
            _globalQuery = globalQuery;
            _httpContextAccessor = httpContextAccessor;
        }

        //public async Task<Model_Token_Response> Refresh_token(string requestToken, Func<string, Task<bool>> delegat)
        //{
        //    var urltoken = _Admin_NPS.RefreshToken(requestToken);
        //    var credentialstoken = _Admin_NPS.Credentials();
        //    QueryDataGet queryDataGettoken = new QueryDataGet()
        //    {
        //        URL = urltoken,
        //        Credentials = credentialstoken
        //    };
        //    var queryResponsetoken = _globalQuery.Get(queryDataGettoken);
        //    var token = JsonConvert.DeserializeObject<Model_Token_Response>(queryResponsetoken);
        //    if (token.ErrorCode == EnErrorCode.Expired_token)
        //    {
        //        await Refresh_token(requestToken, delegat);
        //    }
        //    else if (token.ErrorCode == EnErrorCode.Internal_error)
        //    {
        //        throw new Exception(token.ErrorMessage);
        //    }
        //    if (token.ErrorCode == EnErrorCode.NoError)
        //    {
        //        var httpContext = _httpContextAccessor.HttpContext;
        //        var claimPrincipal = httpContext.User as ClaimsPrincipal;
        //        var claimIdentity = claimPrincipal.Identity as ClaimsIdentity;

        //        var guidCookieClaim = claimPrincipal.FindFirst("Guid");
        //        var oldAdminClaim = claimPrincipal.FindFirst(".AspNetCore.Admin");
        //        if (guidCookieClaim != null)
        //        {
        //            await AsyncSessionHelper.Set_Token_Async(guidCookieClaim.Value, token.Token);
        //        }
        //        if (!string.IsNullOrEmpty(token.Token))
        //        {
        //            await httpContext.SignOutAsync();
        //            if (oldAdminClaim != null)
        //            {
        //                claimIdentity.RemoveClaim(oldAdminClaim);
        //            }
        //            var newAdminClaim = new Claim(".AspNetCore.Admin", token.Token);
        //            claimIdentity.AddClaim(newAdminClaim);
        //            await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimPrincipal);
        //        }
        //        return token;
        //    }
        //    return null;
        //}

        public async Task<Model_Token_Response> Refresh_token(Guid_CookieLock CookieLock)
        {
            Model_Token_Response token = null;
            if (CookieLock!=null)
            {
                var urltoken = _Admin_NPS.RefreshToken(CookieLock.Token);
                var credentialstoken = _Admin_NPS.Credentials();
                QueryDataGet queryDataGettoken = new QueryDataGet()
                {
                    URL = urltoken,
                    Credentials = credentialstoken
                };
                var queryResponsetoken = _globalQuery.Get(queryDataGettoken);
                token = JsonConvert.DeserializeObject<Model_Token_Response>(queryResponsetoken);
                if (token.ErrorCode == EnErrorCode.Internal_error)
                {
                    throw new Exception(token.ErrorMessage);
                }
                CookieLock.Token = token.Token;
            }
            else
            {
                var string_token = Get_Token_Urgently();
                var urltoken = _Admin_NPS.RefreshToken(string_token);
                var credentialstoken = _Admin_NPS.Credentials();
                QueryDataGet queryDataGettoken = new QueryDataGet()
                {
                    URL = urltoken,
                    Credentials = credentialstoken
                };
                var queryResponsetoken = _globalQuery.Get(queryDataGettoken);
                token = JsonConvert.DeserializeObject<Model_Token_Response>(queryResponsetoken);
                if (token.ErrorCode == EnErrorCode.Internal_error)
                {
                    throw new Exception(token.ErrorMessage);
                }
            }
            if (token.ErrorCode == EnErrorCode.NoError)
            {
                var httpContext = _httpContextAccessor.HttpContext;
                var claimPrincipal = httpContext.User as ClaimsPrincipal;
                var claimIdentity = claimPrincipal.Identity as ClaimsIdentity;
                var oldAdminClaim = claimPrincipal.FindFirst(".AspNetCore.Admin");

                if (!string.IsNullOrEmpty(token.Token))
                {
                    await httpContext.SignOutAsync();
                    if (oldAdminClaim != null)
                    {
                        claimIdentity.RemoveClaim(oldAdminClaim);
                    }
                    var newAdminClaim = new Claim(".AspNetCore.Admin", token.Token);
                    claimIdentity.AddClaim(newAdminClaim);
                    await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimPrincipal);
                }
                return token;
            }
            throw new Exception(token.ErrorMessage);
        }

        public string Get_Token_Urgently()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var claimPrincipal = httpContext.User as ClaimsPrincipal;
            var AdminClaim = claimPrincipal.FindFirst(".AspNetCore.Admin");
            return Uri.EscapeDataString(AdminClaim.Value.ToString());
        }
        public async Task<string> Set_Token_Urgently()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var claimPrincipal = httpContext.User as ClaimsPrincipal;
            var Guid_Cookie = claimPrincipal.FindFirst("Guid").Value.ToString();
            var AdminClaim = claimPrincipal.FindFirst(".AspNetCore.Admin").Value.ToString();
            if (Guid_Cookie!="" && AdminClaim!="")
            {
                await AsyncSessionHelper.Set_Token_Async(Guid_Cookie, AdminClaim);
                return Guid_Cookie;
            }
            else
            {
                return "";
            }
        }
    }
}
