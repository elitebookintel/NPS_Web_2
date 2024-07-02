using Domain.Resources;
using FluentValidation;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    public class Validation_GroupQuestionnarei : AbstractValidator<Upsert_Group_Questionnarei_DTO>
    {

        public Validation_GroupQuestionnarei()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage(Localization.Cannot_empty).NotNull();
        }

    }
}
