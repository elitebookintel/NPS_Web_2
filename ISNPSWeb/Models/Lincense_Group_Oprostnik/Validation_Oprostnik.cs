using Domain.Resources;
using FluentValidation;
using ISNPSWeb.Filter;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    [Culture]
    public class Validation_Oprostnik : AbstractValidator<Upsert_Oprostnik_DTO>
    {
        public Validation_Oprostnik()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage(Localization.Cannot_empty).NotNull();
         
        }
    }
}
