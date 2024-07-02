'use strict'

function onDeleteClick(e) {

    e.event.preventDefault();
    var gridId = "gridOprostnik";
    var id = $("input[name='Oid']").val();

    var h3Element = document.getElementById("delet_Oprostnik");
    if (h3Element) {
        var name = h3Element.innerText;
    }

    var textBox = $("#Name_Delet_input").dxTextBox("instance")
    var Tittle = textBox.option("value").trim();

    if (Tittle == name) {
        var url_get = '/Oprostnik_API/Oprostnik_List';
        ISNPS.ajaxGET("/Oprostnik_API/Delet_Oprostnik/" + id + "/" + encodeURIComponent(name), null, gridId, url_get);
    } else if (Tittle == "") {
        textBox.option({
            value: Tittle,
            isValid: false,
            validationError: { message: formatMessage('Field_not_empty') }
        });
    }
    else {
        textBox.option({
            value: Tittle,
            isValid: false,
            validationError: { message: formatMessage('Does_not_match') }
        });
    }
}