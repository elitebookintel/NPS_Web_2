using Application.Service.Token;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace ISNPSWeb.Service
{
    public class RefreshToken
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        //public static string refreshedToken = "";
        public RefreshToken(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<bool> RefreshTokenClaim(string token)
        {
            bool retObject = true;
            try
            {
                var httpContext = _httpContextAccessor.HttpContext;
                var claimPrincipal = httpContext.User as ClaimsPrincipal;
                var claimIdentity = claimPrincipal.Identity as ClaimsIdentity;
                var Guid_Cookie = (from c in claimPrincipal.Claims
                                   where c.Type == "Guid"
                                   select c).FirstOrDefault();
                await AsyncSessionHelper.Set_Token_Async(Guid_Cookie.Value.ToString(), token);

                var oldClaim = (from c in claimPrincipal.Claims
                                where c.Type == ".AspNetCore.Admin"
                                select c).FirstOrDefault();

                if (!string.IsNullOrEmpty(token))
                {
                    //refreshedToken = token;
                    await httpContext.SignOutAsync();
                    claimIdentity.RemoveClaim(oldClaim);
                    var claimNew = new Claim(".AspNetCore.Admin", token);
                    claimIdentity.AddClaim(claimNew);
                    await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimPrincipal);
                }
                else
                {
                    retObject = false;
                }
                return retObject;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

    }
}
