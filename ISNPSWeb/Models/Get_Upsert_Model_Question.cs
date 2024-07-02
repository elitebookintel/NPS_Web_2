using Application.Global_Models;
using Application.Requests.Commands.Upsert_Question;
using Application.Requests.Queries.Get_List_Question;
using MediatR;
using static Domain.Enums;
namespace ISNPSWeb.Models
{
    public class Get_Upsert_Model_Question
    {
      //  public Question_Upsert.Command Command {  get; set; }
        public List_Question_Get.View_List_Model View_List_Model { get; set; }
    }

    public class Upsert_Model_Question
    {
        public Question_Upsert.Command Command { get; set; }       
    }
  
}
