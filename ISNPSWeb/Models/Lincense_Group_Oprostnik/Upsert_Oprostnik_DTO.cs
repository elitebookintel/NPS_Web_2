using Application.Global_Models;
using static Domain.Enums;
using Application.Requests.Commands.Upsert_Oprostnik;
using static Application.Requests.Commands.Upsert_Oprostnik.Oprostnik_Upsert;
using Newtonsoft.Json;
using Application.Service.Token;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    public class Upsert_Oprostnik_DTO : BaseResponse
    {
        public int Oid { get; set; }
        public IDictionary<EnUiLanguage, string> Name { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public QuestionnaireStatus Status { get; set; }

        public Command ToOprostnikUpsertCommand(Guid_CookieLock QueryModel)
        {
            return new Command
            {
                Oid = this.Oid,
                Name = JsonConvert.SerializeObject(this.Name),
                CreateDate = this.CreateDate,
                UpdateDate = this.UpdateDate,
                Status = this.Status,
                guid_CookieLock = QueryModel,
            };
        }
    }
}
