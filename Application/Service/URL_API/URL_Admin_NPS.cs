using static Domain.Enums;

namespace Application.Service.URL_API
{
    public class URL_Admin_NPS
    {
        public string Credentials()
        {
#if (DEBUG)
            return "uSr_nps:V8-}W31S!l'D";
#endif
#if (RELEASE)
                        return "nspapi_usr:4b3pY6<mY)+F";
#endif
            //#if (DEBUG)
            //            return "nspapi_usr:4b3pY6<mY)+F";
            //#endif
            //#if (RELEASE)
            //            return "nspapi_usr:4b3pY6<mY)+F";
            //#endif
        }
        //POST
        public string AuthorizeUser()
        {
            return "/ISAuthService/json/AuthorizeUser";
        }

        public string ResetPassword()
        {
            return "/ISAuthService/json/ResetPassword";
        }
        //GET
        public string RefreshToken(string Token)
        {
            return "/ISAuthService/json/RefreshToken?Token=" + Token;
        }

        //GET
        public string GetProfileInfo(string Token)
        {
            return "/ISAuthService/json/GetProfileInfo?Token=" + Token;
        }

        public string ChangePassword()
        {
            return "/ISAuthService/json/ChangePassword";
        }
        //GET
        public string Security_GetPermission(string Token)
        {
            return "/ISAdminWebAppService/json/Security/GetPermission?Token=" + Token;
        }

        //GET
        public string ChangeUILanguage(string Token, int Language)
        {
            return "/ISAuthService/json/ChangeUILanguage?Token=" + Token + "&Language=" + Language;
        }
        #region LinceseController
        //GET
        public string Get_List_Lincenses(string token)
        {
            return $"/ISNPSAPI/Web/GetLicenseList?token={token}";
        }

        //GET
        public string Get_Lincense(Guid Oid, string token)
        {
            return $"/ISNPSAPI/Web/GetLicense?token={token}&Oid={Oid}";
        }

        //GET
        public string Get_DeactivateLicense(Guid Oid, string token)
        {
            return $"/ISNPSAPI/Web/DeactivateLicense?token={token}&Oid={Oid}";
        }
        //GET
        public string Get_ActivateLicense(Guid Oid, string token)
        {
            return $"/ISNPSAPI/Web/ActivateLicense?token={token}&Oid={Oid}";
        }
        //GET
        public string Get_ReleaseLicense(Guid Oid, string token)
        {
            return $"/ISNPSAPI/Web/ReleaseLicense?token={token}&Oid={Oid}";
        }
        //POST
        public string Creat_Lincense(string Token, int Quantity, int GroupQ)
        {
            return $"/ISNPSAPI/Web/GenerateLicense?token={Token}&quantity={Quantity}&groupQ={GroupQ}";
        }

        //DELET
        public string Delet_Lincense(Guid Oid, string token)
        {
            return $"/ISNPSAPI/Web/DeleteLicense?token={token}&Oid={Oid}";
        }

        //PUT
        public string Update_Lincense_Status(Guid id_Lincesne, EnLicenseStatus status, string token)
        {
            return "/Lincense/Update_Lincense_Status";
        }

        //PUT
        public string UpsertLicense()
        {
            return "/ISNPSAPI/Web/UpsertLicense";
        }
        #endregion

        #region GrupQuestion
        //GET
        public string Get_List_GroupQuestionnaire(string token)
        {
            return $"/ISNPSAPI/Web/GetGroupQuestionnaires?token={token}";
        }

        //GET
        public string Get_GroupQuestionnaire(int GroupQuestionnaireID, string token)
        {
            return $"/ISNPSAPI/Web/GetGroupQuestionnaire?token={token}&id={GroupQuestionnaireID}";
        }

        //POST
        public string Creat_GroupQuestionnaire()
        {
            return "/ISNPSAPI/Web/UpsertGroupQuestionnaire";
        }

        //DELET
        public string Delet_GroupQuestionnaire(int id, string token)
        {
            return $"/ISNPSAPI/Web/DeleteGroupQuestionnaire?token={token}&id={id}";
        }
        #endregion

        #region OprostnikController


        //GET
        public string Get_List_Oprostnik(string token)
        {
            return $"/ISNPSAPI/Web/GetQuestionnaires?token={token}";
        }

        //GET
        public string Get_Oprostnik(int ID_Oprostnik, string token)
        {
            return $"/ISNPSAPI/Web/GetQuestionnaire?token={token}&id={ID_Oprostnik}";
        }

        //POST
        public string Upsert_Oprostnik()
        {
            return "/ISNPSAPI/Web/UpsertQuestionnaire";
        }

        //DELET
        public string Delet_Oprostnik(int ID_Oprostnik, string token)
        {
            return $"/ISNPSAPI/Web/DeleteQuestionnaire?token={token}&id={ID_Oprostnik}";
        }
        #endregion

        #region Question
        //GET
        public string GetListQuestion(int OprostnikID, string token)
        {
            return $"/ISNPSAPI/Web/GetQuestions?token={token}&questionnaireId={OprostnikID}";
        }

        //GET
        public string GetQustion(int Question_ID, string token)
        {
            return $"/ISNPSAPI/Web/GetQuestion?token={token}&questionId={Question_ID}";
        }

        public string Add_Response()
        {
            return $"/Respons/Add_Response";
        }

        //POST
        public string UpsertQuestion()
        {
            return "/ISNPSAPI/Web/UpsertQuestions";
        }

        //DELET
        public string Delet_Question(int questionId, string token)
        {
            return $"/ISNPSAPI/Web/DeleteQuestions?token={token}&questionId={questionId}";
        }

        //PUT
        public string Update_Status_Question(int QuestionID, QuestionnaireStatus status_Question, string token)
        {
            return $"/Question/Update_Status_Question?QuestionID={QuestionID}";
        }

        public string ActivateQuestionnaire(int QuestionID, string token)
        {
            return $"/ISNPSAPI/Web/ActivateQuestionnaire?token={token}&id={QuestionID}";
        }

        public string DeactivateQuestionnaire(int QuestionID, string token)
        {
            return $"/ISNPSAPI/Web/DeactivateQuestionnaire?token={token}&id={QuestionID}";
        }

        #endregion

        #region QuestionVariant
        //GET 

        //POST
        public string UpsertQuestionVariant()
        {
            return $"/QuestionVariant/UpsertQuestionVariant";
        }
        #endregion

        #region Get_Statistika

        public string Get_Statistika(int QuestionID, DateTime data_Start, DateTime data_End, string Token)
        {
            string data_start_string = data_Start.ToString("s");
            string data_end_string = data_End.ToString("s");
            return $"/ISNPSAPI/Web/QuestionStatistic?Token={Token}&id={QuestionID}&SDate={data_start_string}&EDate={data_end_string}";
        }

        #endregion
    }
}
