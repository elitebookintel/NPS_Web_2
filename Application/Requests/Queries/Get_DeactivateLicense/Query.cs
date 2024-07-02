﻿using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Queries.Get_DeactivateLicense
{
    public partial class DeactivateLicense_Get
    {
        public class Query : BaseQueryModel, IRequest<BaseResponse>
        {
            public Guid Oid { get; set; }
        }
    }
}
