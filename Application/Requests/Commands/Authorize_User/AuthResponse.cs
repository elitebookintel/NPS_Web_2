﻿using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Requests.Commands.Authorize_User
{
    public partial class User_Authorize
    {
        public class AuthResponse
        {
            public EnErrorCode ErrorCode { get; set; }
            public string ErrorMessage { get; set; }
            public string Token { get; set; }
            public User User { get; set; }
        }
    }
}
