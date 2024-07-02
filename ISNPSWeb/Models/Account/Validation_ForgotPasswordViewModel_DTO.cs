using FluentValidation;

namespace ISNPSWeb.Models.Account
{
    public class Validation_ForgotPasswordViewModel_DTO : AbstractValidator<ForgotPasswordViewModel_DTO>
    {
        public Validation_ForgotPasswordViewModel_DTO()
        {
            RuleFor(x => x.Email).EmailAddress().NotNull().NotEmpty();
        }
    }
}
