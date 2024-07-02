using Application;
using FluentValidation;
using FluentValidation.AspNetCore;
using ISNPSWeb.Filter;
using ISNPSWeb.Middleware;
using ISNPSWeb.Models.Account;
using ISNPSWeb.Models.Lincense_Group_Oprostnik;
using ISNPSWeb.Models.ProfileInfo;
using ISNPSWeb.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace ISNPSWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                var builder = WebApplication.CreateBuilder(args);
                var services = builder.Services;

                services.AddApplication();
                services.AddControllersWithViews();

                services.AddMvc();

                services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
                services.AddTransient<RefreshToken>();

                services.AddLocalization(opt => opt.ResourcesPath = "Resources");
                services.AddMvc()
                            .AddMvcLocalization(Microsoft.AspNetCore.Mvc.Razor.LanguageViewLocationExpanderFormat.Suffix)
                            .AddDataAnnotationsLocalization();

                services.Configure<RequestLocalizationOptions>(opt =>
                   {
                       var supportedCultures = new[] { "en", "ro", "ru" };
                       opt.SetDefaultCulture(supportedCultures[2])
                           .AddSupportedCultures(supportedCultures)
                           .AddSupportedUICultures(supportedCultures);
                   });

                services.AddRazorPages()
                    .AddViewLocalization()
                    .AddSessionStateTempDataProvider();

                services.AddControllersWithViews()
                    .AddSessionStateTempDataProvider();

                services.AddDistributedMemoryCache();

                services.Configure<IISServerOptions>(options =>
                {
                    options.AutomaticAuthentication = false;
                });

                //Added sessions
                services.AddHttpContextAccessor();
                services.AddSession(options =>
                {
                    options.IdleTimeout = TimeSpan.FromMinutes(40);
                    options.Cookie.HttpOnly = true;
                    options.Cookie.IsEssential = true;
                });

                services.AddDataProtection();
                services.AddScoped<ICurrentUserService, CurrentUserService>();

                services.AddTransient<ILocalization_Exception, Localization_Exception>();
                services.AddTransient<IValidator<ChangePassword_DTO>, Validation_ProfileInfo>();
                services.AddTransient<IValidator<Add_Lincese_Model_DTO>, Validation_Lincense>();
                services.AddTransient<IValidator<Upsert_Group_Questionnarei_DTO>, Validation_GroupQuestionnarei>();
                services.AddTransient<IValidator<Upsert_Oprostnik_DTO>, Validation_Oprostnik>();
                services.AddTransient<IValidator<ForgotPasswordViewModel_DTO>, Validation_ForgotPasswordViewModel_DTO>();
                services.AddTransient<IValidator<UpsertLicense_DTO>, Validation_UpsertLicense>();

                services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                    .AddCookie(options =>
                    {
                        options.LoginPath = "/Account/Login";
                        options.Events = new CookieAuthenticationEvents
                        {
                            OnRedirectToLogin = context =>
                            {
                                string relativeRedirectUri = new Uri(context.RedirectUri).PathAndQuery;

                                if (IsJquery.IsAjaxRequest(context.Request))
                                {
                                    context.Response.Headers["Location"] = relativeRedirectUri;
                                    context.Response.StatusCode = 401;
                                }
                                else
                                {
                                    context.Response.Redirect(relativeRedirectUri);
                                }
                                return Task.CompletedTask;
                            }
                        };
                    });

                // services.AddAuthentication("SessionScheme").AddScheme<AuthenticationSchemeOptions, SessionAuthenticationHandler>("SessionScheme", options => { });

                //Added fluent validation
                services.AddControllers().AddFluentValidation(options =>
                {
                    options.RegisterValidatorsFromAssemblyContaining<Program>();
                    options.LocalizationEnabled = true;
                });

                // ValidatorViewModel validatorViewModel = new ValidatorViewModel(services);

                //services.AddScoped<IViewRenderService, ViewRenderService>();
                services.AddScoped<ICurrentUserService, CurrentUserService>();

                var app = builder.Build();

                var supportedCultures = new[] { "en", "ro", "ru" };
                var localizationOptions = new RequestLocalizationOptions().SetDefaultCulture(supportedCultures[2])
                .AddSupportedCultures(supportedCultures)
                .AddSupportedUICultures(supportedCultures);

                app.UseRequestLocalization(localizationOptions);

                // Configure the HTTP request pipeline.
                if (!app.Environment.IsDevelopment())
                {
                    app.UseExceptionHandler("/Home/Error");
                    app.UseHsts();
                }
                else
                {
                    app.UseDeveloperExceptionPage();
                }
                app.UseExceptionHandlerMiddleware();

                app.Use(async (context, next) =>
                {
                    await next();
                    if (context.Response.StatusCode == 404)
                    {
                        context.Request.Path = "/404";
                        await next();
                    }
                });
                app.UseHttpsRedirection();

                app.UseStaticFiles();

                app.UseRouting();
                app.UseSession();
                app.UseAuthentication();
                app.UseAuthorization();
                app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");


                app.Run();
            }
            catch (Exception exception)
            {
                throw;
            }
        }
    }
}