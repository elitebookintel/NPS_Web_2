using Application.Global_Models;
using Application.Requests.Commands.Authorize_User;
using Application.Requests.Queries.GetProfileInfo;
using Application.Service.Token;
using Domain;
using Domain.Resources;
using ISNPSWeb.Filter;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models.Account;
using ISNPSWeb.Service;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System.Security.Claims;
using static Domain.Enums;


namespace ISNPSWeb.Controllers
{
    [Culture]
    [Route("[controller]")]
    public class AccountController : BaseController
    {
        // public static string refreshedToken = "";
        // public static object __refreshTokenLock = new object();
        // public static object __getTokenLock = new object();
        // bool __lockWasTaken = false;
        private readonly IMediator _mediator;
        private readonly ITokenService _tokenService;
        private readonly RefreshToken _refreshToken;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public AccountController(IMediator mediator, ITokenService tokenService, RefreshToken refreshToken, IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _tokenService = tokenService;
            _refreshToken = refreshToken;
            _httpContextAccessor = httpContextAccessor;

        }
        [AllowAnonymous]
        [HttpGet("Login")]
        public IActionResult Login()
        {

            var language = GetLanguageCookie();
            if (string.IsNullOrEmpty(language))
            {
                ViewBag.Language = "ru";
            }
            else
            {
                ViewBag.Language = language.ToLower();
            }
            return View("~/Views/Account/_Login.cshtml");
        }
        [AllowAnonymous]
        [HttpPost("Login")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(AuthorizeViewModel_DTO authorizeViewModel)
        {
            try
            {
                var lang = GetLanguageCookie();
                if (string.IsNullOrEmpty(lang))
                {
                    ViewBag.Language = "ru";
                }
                else
                {
                    ViewBag.Language = lang.ToLower();
                }

                if (ModelState.IsValid)
                {
                    authorizeViewModel.Email = authorizeViewModel?.Email?.ToLower().Trim();

                    var command = new User_Authorize.Command(authorizeViewModel.Email, authorizeViewModel.Password);
                    var response = await _mediator.Send(command);

                    if (response.ErrorCode == EnErrorCode.NoError)
                    {
                        var uiLanguage = Enums.EnUiLanguage.RU;

                        List<Claim> userClaims = new List<Claim>();
                        if (response.User != null)
                        {
                           
                            //var groupResponse = await groupQuery.GetSecurityPermissionAsync(response.Token);
                            var query = new Application.Requests.Queries.Get_Permission.Permissions_Get.Query { Token = response.Token };
                            var groupResponse = await _mediator.Send(query);
                            if (groupResponse.ErrorCode != EnErrorCode.NoError)
                            {
                                ModelState.AddModelError("Password", response.ErrorMessage + ". " + Localization.ContactAdministrator);
                                return PartialView("~/Views/Account/_Login.cshtml", authorizeViewModel);
                            }
                            else if (groupResponse.ErrorCode == EnErrorCode.NoError)
                            {
                                var naviations = JsonConvert.SerializeObject(groupResponse.Permission.Navigations);

                                userClaims.Add(new Claim("IsAdministrator", groupResponse.Permission.IsAdministrator.ToString()));
                                userClaims.Add(new Claim("Navigations", naviations));
                            }
                            var Guid_Coockie = Guid.NewGuid().ToString();
                            userClaims.Add(new Claim("Guid", Guid_Coockie));
                            await AsyncSessionHelper.Set_Token_Async(Guid_Coockie, response.Token);
                            //userClaims.Add(new Claim("IsAdministrator", "true"));
                            //userClaims.Add(new Claim("Navigations", "Allow"));

                            uiLanguage = response.User.UiLanguage;
                            if (lang != null)
                            {
                                if (lang.ToUpper() != response.User.UiLanguage.ToString())
                                {
                                    switch (lang.ToUpper())
                                    {
                                        case "EN":
                                            uiLanguage = EnUiLanguage.EN;
                                            break;
                                        case "RO":
                                            uiLanguage = EnUiLanguage.RO;
                                            break;
                                        case "RU":
                                            uiLanguage = EnUiLanguage.RU;
                                            break;
                                        default:
                                            uiLanguage = EnUiLanguage.RU;
                                            break;
                                    }


                                    var token = response.Token;
                                    var Guid_CookieLock = new Guid_CookieLock
                                    {
                                        LastAccessed =  DateTime.Now,
                                        Token = token,
                                    };
                                    var command_change = new Application.Requests.Commands.ChangeLanguage.ChangeLanguage.Command { guid_CookieLock = Guid_CookieLock, Lang = (int)uiLanguage };
                                    var responseLanguage = await _mediator.Send(command_change);
                                }
                            }

                            //var imageSize = 36;
                            //string initials = response.User.FirstName[0].ToString() + response.User.LastName[0].ToString();
                            //Color backgroundColor = Color.LightGray;
                            //Color textColor = Color.White;
                            //string imageBase64 = null;
                            //using (Bitmap btm = new Bitmap(imageSize, imageSize))
                            //{
                            //    using (Graphics grf = Graphics.FromImage(btm))
                            //    {
                            //        using (Brush brsh = new SolidBrush(ColorTranslator.FromHtml("#808080")))
                            //        {
                            //            int circleSize = imageSize * 3 / 4;
                            //            int circleX = (imageSize - circleSize) / 2;
                            //            int circleY = (imageSize - circleSize) / 2;

                            //            grf.FillEllipse(brsh, circleX, circleY, circleSize, circleSize);
                            //            Font font = new Font("Arial", imageSize / 3, FontStyle.Bold, GraphicsUnit.World);
                            //            StringFormat stringFormat = new StringFormat();
                            //            stringFormat.Alignment = StringAlignment.Center;
                            //            stringFormat.LineAlignment = StringAlignment.Center;


                            //            grf.TextRenderingHint = TextRenderingHint.AntiAlias;
                            //            grf.DrawString(initials, font, new SolidBrush(textColor), new Rectangle(0, 0, imageSize, imageSize), stringFormat);
                            //        }
                            //    }

                            //    using (MemoryStream ms = new MemoryStream())
                            //    {
                            //        btm.Save(ms, ImageFormat.Png);
                            //        byte[] imageBytes = ms.ToArray();
                            //        imageBase64 = Convert.ToBase64String(imageBytes);
                            //    }
                            //}
                            userClaims.Add(new Claim("ID", response.User.ID.ToString()));
                            userClaims.Add(new Claim(ClaimTypes.NameIdentifier, response.User.ID.ToString()));
                            userClaims.Add(new Claim(ClaimTypes.Email, response.User.Email));
                            userClaims.Add(new Claim(ClaimTypes.Name, response.User.FirstName + " " + response.User.LastName));
                            userClaims.Add(new Claim("FullName", response.User.FirstName + " " + response.User.LastName));
                            userClaims.Add(new Claim("Company", response.User.Company));
                            userClaims.Add(new Claim("CompanyID", response.User.CompanyID.ToString()));
                            userClaims.Add(new Claim("PhoneNumber", response.User.PhoneNumber));
                            userClaims.Add(new Claim("UiLanguage", uiLanguage.ToString()));
                            if (response.User.Picture!=null)
                            {
                                string base64image = Convert.ToBase64String(response.User.Picture);
                                userClaims.Add(new Claim("Picture", base64image));
                            }
                            else
                            {
                                userClaims.Add(new Claim("Picture", "/assets/images/no-photo.jpg"));
                            }
                            userClaims.Add(new Claim(".AspNetCore.Admin", response.Token));
                            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName, CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(uiLanguage.ToString())), new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) });
                        }

                        var claimsIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);
                        var claimsPrincipal = new ClaimsPrincipal(new[] { claimsIdentity });

                        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
                        return RedirectToAction(nameof(HomeController.Index), "Home");
                    }
                    else if (response.ErrorCode == EnErrorCode.User_name_not_found_or_incorrect_password)
                    {
                        ModelState.AddModelError("Email", Localization.UserNotFoundOrIncorrenctEmailValidation);
                        return View("~/Views/Account/_Login.cshtml", authorizeViewModel);
                    }
                    else if (response.ErrorCode == EnErrorCode.Internal_error)
                    {
                        ModelState.AddModelError("Email", Localization.Internal_error);
                        return View("~/Views/Account/_Login.cshtml", authorizeViewModel);
                    }
                    else if (response.ErrorCode != EnErrorCode.NoError)
                    {
                        ModelState.AddModelError("Password", response.ErrorMessage + ". " + Localization.ContactAdministrator);
                        return View("~/Views/Account/_Login.cshtml", authorizeViewModel);
                    }
                }
                return View("~/Views/Account/_Login.cshtml", authorizeViewModel);
            }
            catch (Exception ex)
            {
                BaseResponse errorResponse = new BaseResponse()
                {
                    ErrorCode = EnErrorCode.Internal_error,
                    ErrorMessage = ex.Message,
                };
                return PartialView("~/Views/Home/_500.cshtml", errorResponse);
            }
        }

        [AllowAnonymous]
        [HttpGet("ForgotPassword")]
        public IActionResult ForgotPassword()
        {
            return View("~/Views/Account/_ForgotPassword.cshtml");
        }

        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel_DTO forgotPasswordViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var command = new Application.Requests.Commands.ForgotPassword.ForgotPas.Command();
                    command.Email =forgotPasswordViewModel.Email;
                    command.Info=forgotPasswordViewModel.INFO;
                    var response = await _mediator.Send(command);

                    if (response.ErrorCode == EnErrorCode.User_name_not_found_or_incorrect_Email)
                    {
                        ModelState.AddModelError("Email", Localization.UserNotFoundOrIncorrenctEmailValidation);
                        return CreateJsonError(Localization.UserNotFoundOrIncorrenctEmailValidation, false);
                    }
                    else if (response.ErrorCode == EnErrorCode.Internal_error)
                    {
                        ModelState.AddModelError("Email", Localization.Internal_error);
                        return PartialView("~/Views/Account/_ForgotPassword.cshtml", forgotPasswordViewModel);
                    }
                    else if (response.ErrorCode != EnErrorCode.NoError)
                    {
                        ModelState.AddModelError("Email", response.ErrorMessage + ". " + Localization.ContactAdministrator);
                        return CreateJsonKo(Localization.ContactAdministrator, false);
                    }
                    return CreateJsonOk(Localization.Reset_Password, false);
                }
                else
                {
                    foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                    {
                        ModelState.AddModelError("", error.ErrorMessage);
                        return CreateJsonNotValid(error.ErrorMessage, false);
                    }
                }

                return View("~/Views/Account/_ForgotPassword.cshtml", forgotPasswordViewModel);
            }
            catch (Exception ex)
            {
                BaseResponse errorResponse = new BaseResponse()
                {
                    ErrorCode = EnErrorCode.Internal_error,
                    ErrorMessage = ex.Message,
                };

                return PartialView("~/Views/Home/_500.cshtml", errorResponse);
            }
        }
        [Authorize]
        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {
            PerformLogout();
            await HttpContext.SignOutAsync();
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }
        [Authorize]
        [HttpGet("TokenLogout")]
        public async Task<IActionResult> TokenLogout()
        {
            PerformLogout();
            await HttpContext.SignOutAsync();
            return RedirectToAction(nameof(AccountController.Login), "Account");
        }

        [AllowAnonymous]
        [HttpGet("ChangeLang")]
        public IActionResult ChangeLang(string shortLang)
        {
            try
            {
                string url = HttpContext.Request.Path;
                EnUiLanguage uiLanguage;
                List<string> cultures = new List<string>() { "en", "ro", "ru" };
                if (!cultures.Contains(shortLang))
                {
                    shortLang = "ru";
                }
                switch (shortLang)
                {
                    case "en":
                        uiLanguage = EnUiLanguage.EN;
                        break;
                    case "ro":
                        uiLanguage = EnUiLanguage.RO;
                        break;
                    case "ru":
                        uiLanguage = EnUiLanguage.RU;
                        break;
                    default:
                        uiLanguage = EnUiLanguage.RU;
                        break;
                }

                EnUiLanguage newLang = uiLanguage;
                _httpContextAccessor.HttpContext.Response.Cookies.Append(
                    CookieRequestCultureProvider.DefaultCookieName,
                    CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(newLang.ToString())),
                    new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) });

                return Json(new BaseJsonResponse { result = ExecutionResult.OK, message = "Saved" });
            }
            catch (Exception ex)
            {
                return Json(new BaseJsonResponse { result = ExecutionResult.OK, message = "Error" });
            }
        }
        [Authorize]
        [HttpGet("ChangeLanguage")]
        public async Task<IActionResult> ChangeLanguage([FromQuery] string shortLang)
        {
            try
            {
                string url = HttpContext.Request.Path;
                EnUiLanguage uiLanguage;
                List<string> cultures = new List<string>() { "en", "ro", "ru" };
                if (!cultures.Contains(shortLang))
                {
                    shortLang = "ru";
                }
                switch (shortLang)
                {
                    case "en":
                        uiLanguage = EnUiLanguage.EN;
                        break;
                    case "ro":
                        uiLanguage = EnUiLanguage.RO;
                        break;
                    case "ru":
                        uiLanguage = EnUiLanguage.RU;
                        break;
                    default:
                        uiLanguage = EnUiLanguage.RU;
                        break;
                }

                var Guid_CookieLock = await GetToken_Async();
                //     string token = GetToken();
                var basequery = new BaseQueryModel()
                {
                    guid_CookieLock = Guid_CookieLock,
                };

                var command_change = new Application.Requests.Commands.ChangeLanguage.ChangeLanguage.Command { guid_CookieLock = Guid_CookieLock, Lang = (int)uiLanguage };
                var responseLanguage = await _mediator.Send(command_change);

                EnUiLanguage newLang = uiLanguage;
                _httpContextAccessor.HttpContext.Response.Cookies.Append(
                    CookieRequestCultureProvider.DefaultCookieName,
                    CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(newLang.ToString())),
                    new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) });

                return Json(new BaseJsonResponse { result = ExecutionResult.OK, message =Localization.Saved });
            }
            catch (Exception ex)
            {
                return Json(new BaseJsonResponse { result = ExecutionResult.OK, message = Localization.Error });
            }
        }

        [Authorize]
        [HttpGet("ProfileInfo_Get")]
        public async Task<IActionResult> ProfileInfo_Get()
        {
            var Guid_CookieLock = await GetToken_Async();
            var query = new ProfileInfo_Get.Query { guid_CookieLock = Guid_CookieLock, };

            var response = await _mediator.Send(query);

            if (response.ErrorCode != EnErrorCode.NoError)
            {
                throw new Exception_Response<BaseResponse>("", response);
            }
            return Json(response);
        }

        [AllowAnonymous]
        [HttpGet("LockScreen")]
        public async Task<IActionResult> LockScreen(string redirectedFrom)
        {
            UserClaim user = new UserClaim();
            var userClaim = GetUserClaims();
            if (userClaim.Id != 0)
            {
                user = new UserClaim()
                {
                    Email = userClaim.Email,
                    FullName = userClaim.FullName,
                    Id = userClaim.Id,
                    UiLanguage = userClaim.UiLanguage,
                    Picture = userClaim.Picture,
                };
                TempData["User"] = JsonConvert.SerializeObject(user);
                await HttpContext.SignOutAsync();
            }
            else if (userClaim.Id == 0 && TempData["User"] != null)
            {
                var tempData = JsonConvert.DeserializeObject<UserClaim>(TempData["User"].ToString());
                user = new UserClaim()
                {
                    Email = tempData.Email,
                    FullName = tempData.FullName,
                    Id = tempData.Id,
                    UiLanguage = tempData.UiLanguage,
                    Picture = tempData.Picture,
                };
                TempData["UserRewrite"] = JsonConvert.SerializeObject(user);
            }
            else if (TempData["UserRewrite"] != null)
            {
                var tempData = JsonConvert.DeserializeObject<UserClaim>(TempData["UserRewrite"].ToString());
                user = new UserClaim()
                {
                    Email = tempData.Email,
                    FullName = tempData.FullName,
                    Id = tempData.Id,
                    UiLanguage = tempData.UiLanguage,
                    Picture = tempData.Picture,
                };
            }
            else
            {
                return RedirectToAction(nameof(AccountController.Login), "Account");
            }

            await HttpContext.SignOutAsync();
            var language = GetLanguageCookie();
            if (string.IsNullOrEmpty(language))
            {
                ViewBag.Language = "ru";
            }
            else
            {
                ViewBag.Language = language.ToLower();
            }
            ViewBag.redirectedFrom = redirectedFrom;
            return View("~/Views/Account/_LockScreen.cshtml", user);
        }

        [AllowAnonymous]
        [HttpPost("LockScreen")]
        public async Task<IActionResult> LockScreen(UserClaim userClaimViewModel)
        {
            try
            {

                int loginAttempts = 0;
                if (TempData.ContainsKey("LoginAttempts"))
                {
                    loginAttempts = (int)TempData["LoginAttempts"];
                }
                if (loginAttempts >= 3)
                {
                    return RedirectToAction(nameof(AccountController.Login), "Account");
                }

                var lang = GetLanguageCookie();
                if (string.IsNullOrEmpty(lang))
                {
                    ViewBag.Language = "ru";
                }
                else
                {
                    ViewBag.Language = lang.ToLower();
                }
                AuthorizeViewModel_DTO authorizeViewModel = new AuthorizeViewModel_DTO()
                {
                    Email = userClaimViewModel.Email.ToLower().Trim(),
                    Password = userClaimViewModel.Password,

                };
                if (ModelState.IsValid)
                {
                    authorizeViewModel.Email = authorizeViewModel?.Email?.ToLower().Trim();

                    var command = new User_Authorize.Command(authorizeViewModel.Email, authorizeViewModel.Password);
                    var response = await _mediator.Send(command);

                    if (response.ErrorCode == EnErrorCode.NoError)
                    {
                       
                        var uiLanguage = Enums.EnUiLanguage.RU;
                        List<Claim> userClaims = new List<Claim>();
                        if (response.User != null)
                        {
                            //var groupResponse = await groupQuery.GetSecurityPermissionAsync(response.Token);
                            var query = new Application.Requests.Queries.Get_Permission.Permissions_Get.Query { Token = response.Token };
                            var groupResponse = await _mediator.Send(query);
                            if (groupResponse.ErrorCode != EnErrorCode.NoError)
                            {
                                return View("~/Views/Account/_Login.cshtml");
                            }
                            else if (groupResponse.ErrorCode == EnErrorCode.NoError)
                            {
                                var naviations = JsonConvert.SerializeObject(groupResponse.Permission.Navigations);

                                userClaims.Add(new Claim("IsAdministrator", groupResponse.Permission.IsAdministrator.ToString()));
                                userClaims.Add(new Claim("Navigations", naviations));
                            }
                            var Guid_Coockie = Guid.NewGuid().ToString();
                            userClaims.Add(new Claim("Guid", Guid_Coockie));
                            await AsyncSessionHelper.Set_Token_Async(Guid_Coockie, response.Token);

                            uiLanguage = response.User.UiLanguage;
                            if (lang != null)
                            {
                                if (lang.ToUpper() != response.User.UiLanguage.ToString())
                                {
                                    switch (lang.ToUpper())
                                    {
                                        case "EN":
                                            uiLanguage = EnUiLanguage.EN;
                                            break;
                                        case "RO":
                                            uiLanguage = EnUiLanguage.RO;
                                            break;
                                        case "RU":
                                            uiLanguage = EnUiLanguage.RU;
                                            break;
                                        default:
                                            uiLanguage = EnUiLanguage.RU;
                                            break;
                                    }
                                    var token = response.Token;
                                    var Guid_CookieLock = new Guid_CookieLock
                                    {
                                        LastAccessed =  DateTime.Now,
                                        Token = token,
                                    };
                                    var command_change = new Application.Requests.Commands.ChangeLanguage.ChangeLanguage.Command { guid_CookieLock = Guid_CookieLock, Lang = (int)uiLanguage };
                                    var responseLanguage = await _mediator.Send(command_change);
                                }
                            }

                            userClaims.Add(new Claim("ID", response.User.ID.ToString()));
                            userClaims.Add(new Claim(ClaimTypes.NameIdentifier, response.User.ID.ToString()));
                            userClaims.Add(new Claim(ClaimTypes.Email, response.User.Email));
                            userClaims.Add(new Claim(ClaimTypes.Name, response.User.FirstName + " " + response.User.LastName));
                            userClaims.Add(new Claim("FullName", response.User.FirstName + " " + response.User.LastName));
                            userClaims.Add(new Claim("Company", response.User.Company));
                            userClaims.Add(new Claim("CompanyID", response.User.CompanyID.ToString()));
                            userClaims.Add(new Claim("PhoneNumber", response.User.PhoneNumber));
                            userClaims.Add(new Claim("UiLanguage", uiLanguage.ToString()));
                            if (response.User.Picture!= null)
                            {
                                string base64Image = Convert.ToBase64String(response.User.Picture);
                                userClaims.Add(new Claim("Picture", base64Image));
                            }
                            else
                            {
                                userClaims.Add(new Claim("Picture", "/assets/images/no-photo.jpg"));
                            }
                            userClaims.Add(new Claim(".AspNetCore.Admin", response.Token));
                            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName, CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(uiLanguage.ToString())), new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) });
                        }
                        var claimsIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);
                        var claimsPrincipal = new ClaimsPrincipal(new[] { claimsIdentity });
                        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
                        TempData["LoginAttempts"] = 0;
                        return RedirectToAction(nameof(HomeController.Index), "Home");
                    }
                    else
                    {
                        loginAttempts++;
                        TempData["LoginAttempts"] = loginAttempts;
                    }

                    if (response.ErrorCode == EnErrorCode.User_name_not_found_or_incorrect_password)
                    {
                        return CreateJsonError(Localization.UserNotFoundOrIncorrenctEmailValidation, false);
                    }
                    else if (response.ErrorCode == EnErrorCode.Internal_error)
                    {
                        return CreateJsonError(Localization.Internal_error, false);
                    }
                    else if (response.ErrorCode != EnErrorCode.NoError)
                    {
                        return CreateJsonKo(response.ErrorMessage, false);
                    }
                }
                return View("~/Views/Account/_LockScreen.cshtml", userClaimViewModel);
            }
            catch (Exception ex)
            {
                BaseResponse errorResponse = new BaseResponse()
                {
                    ErrorCode = EnErrorCode.Internal_error,
                    ErrorMessage = ex.Message,
                };
                return PartialView("~/Views/Home/_500.cshtml", errorResponse);
            }
        }
        public void PerformLogout()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            httpContext.Session.Clear();
        }
    }
}
