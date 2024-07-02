using Domain.Resources;
using FluentValidation;
using ISNPSWeb.Filter;
using ISNPSWeb.Models.ProfileInfo;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    [Culture]
    public class Validation_Lincense: AbstractValidator<Add_Lincese_Model_DTO>
    {
        public Validation_Lincense() 
        {
            RuleFor(c => c.Quantity)
                       .NotEmpty().WithMessage(Localization.Cannot_empty);

            RuleFor(c => c.GroupQ)
                .NotEmpty().WithMessage(Localization.Cannot_empty);
        }
    }  
}
