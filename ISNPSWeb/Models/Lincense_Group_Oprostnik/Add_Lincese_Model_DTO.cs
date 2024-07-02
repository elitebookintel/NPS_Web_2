using Application.Global_Models;

namespace ISNPSWeb.Models.Lincense_Group_Oprostnik
{
    public class Add_Lincese_Model_DTO : BaseResponse
    {
        public int Quantity { get; set; }
        public int GroupQ { get; set; }
        public string Name_GroupQ { get; set; }
    }
}


