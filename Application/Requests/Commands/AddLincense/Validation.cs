using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Commands.AddLincense
{
    public partial class Lincense_Add
    {
        public class Validation: AbstractValidator<Command>
        {
            public Validation()
            {
                RuleFor(c => c.Quantity)
                    .NotEmpty().WithMessage("CompanyOID не может быть пустым.");
                 

                RuleFor(c => c.GroupQ)
                    .NotEmpty().WithMessage("GroupQ не может быть пустым.");

                //RuleFor(x => x.License_Status)
                //    .IsInEnum().WithMessage("License_Status должен быть допустимым значением перечисления LicenseStatus.");
                //RuleFor(x => x.Lincense_Activated)
                //    .NotEmpty().WithMessage("Lincense_Activated не может быть пустым.")
                //    .LessThanOrEqualTo(DateTime.Now).WithMessage("Lincense_Activated не может быть в будущем.");
            }
        }
    }

}
