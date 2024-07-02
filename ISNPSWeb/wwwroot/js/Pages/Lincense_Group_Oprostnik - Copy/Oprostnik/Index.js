$(document).ready(function () {
    ISNPS.DrawPartialView("/Oprostnik/Get_Oprostnik_List")
    changeTitle(formatMessage('Questionnaire_List_Title') + ' | NPS Portal');
})