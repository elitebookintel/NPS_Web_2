using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Domain
{
    public class Enums
    {
        public enum HTTP_Methods
        {
            GET=0,
            POST=1,
            PUT=2,
            DELETE=3,
        }
        public enum ExecutionResult
        {
            OK = 1,
            KO = 2,
            ERROR = 3,
            NOTVALID = 4,
            EXCEPTION = 5,
            LOGOUT = 6,
        }
        public enum EUserStatus
        {
            [Display(Name = "Новая регистрация")]
            NewRegistered = 0,
            [Display(Name = "Пользователь активен")]
            Active = 1,
            [Display(Name = "Деактивировано")]
            Disabled = 2,
        }

        public enum EnUiLanguage
        {
            EN = 0,
            RO = 1,
            RU = 2,

        }

        public enum ECompanyStatus
        {
            [Display(Name = "NewRegistered")]
            NewRegistered = 0,
            [Display(Name = "Activated")]
            Active = 1,
            [Display(Name = "Disabled")]
            Disabled = 2,

        }

        public enum EnSecurityPermissionState
        {
            [Display(Name = "Deny")]
            Deny = 0,
            [Display(Name = "ReadOnly")]
            Read_only = 1,
            [Display(Name = "Allow")]
            Allow = 2,
        }

        public enum EnLicenseStatus : byte
        {
            [Display(Name = "NotActivated")]
            NotActivated =0,
            [Display(Name = "Active")]
            Active = 1,
            [Display(Name = "Disabled")]
            Disabled = 2,
        }
        public enum GradingType : byte
        {
            YesNo=1,
            Point10Score=2,
            SingleAnswerVariant=3,
            MultipleAnswerVariant=4,
            Point5Score=5,
        }

        public enum QuestionnaireStatus
        {
            New = 0,
            Activated = 1,
            Disabled = 2,
        }
        public enum Genus
        {
            Man = 0,
            Wom = 1,
            Avar = 2,
        }
    }
}
