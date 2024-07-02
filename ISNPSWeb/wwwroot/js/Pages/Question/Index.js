$(document).ready(function () {
    var id = document.getElementById("elementId").getAttribute("data-id");
    ISNPS.DrawPartialView("/Question/Get_Question_List/" + id)
    changeTitle(formatMessage('Questionnaire_Title') + ' | NPS Portal');
})