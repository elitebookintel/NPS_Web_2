using Application.Global_Models;

namespace ISNPSWeb.Models
{
    public class Oprostnik_Model
    {
        public string Oid { get; set; }
        public string Name { get; set; }
    }

    public class List_Oprostnik_Model: BaseResponse
    {
        public IList<Oprostnik_Model> List_Id_Oprostnik_Model { get; set; }  
    }
}
