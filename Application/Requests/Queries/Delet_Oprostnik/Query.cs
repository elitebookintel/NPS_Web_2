﻿using Application.Global_Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Queries.Delet_Oprostnik
{
    public partial class Oprostnik_Delet
    {
        public class Query: BaseQueryModel,  IRequest<BaseResponse>
        {
            public int ID_Oprostniks { get; set; }
        }
    }
}
