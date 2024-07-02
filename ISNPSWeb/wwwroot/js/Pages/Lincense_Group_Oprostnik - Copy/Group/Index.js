$(document).ready(function () {
    ISNPS.DrawPartialView("/GroupQuestionnarei/Get_Group_List")
    changeTitle(formatMessage('Group_Title') + ' | NPS Portal');
})