using Domain.Resources;
using FluentValidation;
using ISNPSWeb.Filter;

namespace ISNPSWeb.Models.ProfileInfo
{
    [Culture]
    public class Validation_ProfileInfo : AbstractValidator<ChangePassword_DTO>
    {
        public Validation_ProfileInfo()
        {
            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage(Localization.New_Password_not_emty)
                .MinimumLength(8).WithMessage(Localization.Minimum_password_length)
                .Must(ContainLettersDigitsUpperCaseAndSymbol).WithMessage(Localization.Password_letters_numbers_capitalletter);

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty().WithMessage(Localization.New_Password_not_emty)
                .NotNull().WithMessage(Localization.Old_password_not_empty)
                .Equal(x => x.NewPassword).WithMessage(Localization.Confirm_password_not_match);

            RuleFor(x => x.OldPassword)
                .NotNull().WithMessage(Localization.Old_password_not_empty)
                .NotEmpty().WithMessage(Localization.Old_password_not_empty);
        }
        private bool ContainLettersDigitsUpperCaseAndSymbol(string password)
        {
            string allowedSymbols = "!@#$%^&*()_\\/\"~`№+-=[]{}|;:',.<>?";

            return !string.IsNullOrEmpty(password) &&
                   password.Any(char.IsLetter) &&
                   password.Any(char.IsDigit) &&
                   password.Any(char.IsUpper) &&
                   password.Any(c => allowedSymbols.Contains(c));
        }
    }
}
