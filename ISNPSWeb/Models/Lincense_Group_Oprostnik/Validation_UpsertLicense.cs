using Domain.Resources;
using FluentValidation;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    public class Validation_UpsertLicense : AbstractValidator<UpsertLicense_DTO>
    {
        public Validation_UpsertLicense() {
            RuleFor(c => c.groupQuestionnarieID).NotEmpty().WithMessage(Localization.Cannot_empty);
        }
    }
}
