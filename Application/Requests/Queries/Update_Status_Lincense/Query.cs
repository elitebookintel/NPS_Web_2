﻿using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums;

namespace Application.Requests.Queries.Update_Status_Lincense
{
    public partial class Status_Lincense_Update
    {
        public class Query : BaseQueryModel,IRequest<View_Model>
        {
            public Guid ID { get; set; }
            public EnLicenseStatus License_Status { get; set; }
        }
    }
}
