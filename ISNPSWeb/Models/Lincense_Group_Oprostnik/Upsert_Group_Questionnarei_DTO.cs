using Application.Global_Models;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    public class Upsert_Group_Questionnarei_DTO : BaseResponse
    {
        public int Oid { get; set; }
        public string Name { get; set; }
        public string[]? Questionnaries { get; set; }
        public string[]? DeleteQuestionnaries { get; set; }
        public BaseQueryModel BaseQueryModel { get; set; }
        public List_Oprostnik_Model List_id_Questionnaire { get; set; }
        public IList<Oprostnik_Model> Questionnaires_List { get; set; }

    }
}
