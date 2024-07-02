﻿using Application.Requests.Commands.Add_Response;
using Application.Requests.Commands.AddLincense;
using Application.Requests.Commands.Authorize_User;
using Application.Requests.Commands.ForgotPassword;
using Application.Requests.Commands.Upsert_GroupQuestionnaire;
using Application.Requests.Commands.Upsert_Oprostnik;
using Application.Requests.Commands.Upsert_Question;
using Application.Requests.Commands.Upsert_QuestionVariant;
using Application.Requests.Queries.Update_Status_Lincense;
using Application.Service;
using Application.Service.Token;
using Application.Service.URL_API;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(
            this IServiceCollection services)
        {
            services.AddMediatR(typeof(DependencyInjection).Assembly);
            services.AddSingleton<URL_Admin_NPS>();
            services.AddSingleton<GlobalQuery>();
            services.AddTransient<ITokenService, TokenService>();

            services.AddTransient<IValidator<ForgotPas.Command>, ForgotPas.Validation>();
            //   services.AddTransient<IValidator<User_Authorize.Command>, Auth_User_Validation>();

            services.AddTransient<IValidator<Response_Add.Command>, Response_Add.Validation>();
            services.AddTransient<IValidator<Response_Add.CommandAnswert>, Response_Add.CommandValidation>();

            services.AddTransient<IValidator<Lincense_Add.Command>, Lincense_Add.Validation>();

            services.AddTransient<IValidator<GroupQuestionnaire_Upsert.Command>, GroupQuestionnaire_Upsert.Validation>();

            services.AddTransient<IValidator<Oprostnik_Upsert.Command>, Oprostnik_Upsert.Validation>();

            services.AddTransient<IValidator<Status_Lincense_Update.Query>, Status_Lincense_Update.Validation>();

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(TokenBehavior<,>));
           // services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ExceptionHandlingBehavior<,>));
            return services;
        }
    }
}
