'use strict'

function onDeleteClick(e,id) {
    
    e.event.preventDefault();
    var gridId = "gridGroup";

    var name = $("input[name='Name']").val();
    var textBox = $("#Name_Delet_input").dxTextBox("instance");
    var Tittle = textBox.option("value").trim();
    
    if (Tittle == name) {
        var url_get = '/GroupQuestionnarei_API/Group_List';
        ISNPS.ajaxGET("/GroupQuestionnarei_API/Delet_Group/" + id + "/" + encodeURIComponent(name), null, gridId, url_get);
    } else if (Tittle === "")
    {
        textBox.option({
            value: Tittle,
            isValid: false,
            validationError: { message: formatMessage('Field_not_empty') }
        });
    }
    else {
        textBox.option({
            isValid: false,
            validationError: { message: formatMessage('Does_not_match') }
        });
    }

}
