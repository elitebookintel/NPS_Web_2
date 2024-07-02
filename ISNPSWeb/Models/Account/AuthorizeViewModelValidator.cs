using Domain.Resources;
using FluentValidation;

namespace ISNPSWeb.Models.Account
{
    public class AuthorizeViewModelValidator : AbstractValidator<AuthorizeViewModel_DTO>
    {
        public AuthorizeViewModelValidator()
        {
            RuleFor(x => x.Email)
                .EmailAddress()
                .NotNull()
                .WithName(Localization.Email);

            RuleFor(x => x.Password)
                .NotNull()
                .WithName(Localization.Password);
        }
    }
}
