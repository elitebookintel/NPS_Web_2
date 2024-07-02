'use strict'


function onDeleteClick(e) {

    e.event.preventDefault();
    var gridId = "gridLincese";
    var textBox = $("#Oid");
    var id = textBox.dxTextBox("instance").option("value");

    var Device_Name_textBox = $("#Device_Name");
    var Device_Name = Device_Name_textBox.dxTextBox("instance").option("value");

    var License_Oid_inputtextBox = $("#License_Oid_input").dxTextBox("instance")
    var Tittle = License_Oid_inputtextBox.option("value").trim();

    if (Tittle == Device_Name) {
        var url_get = "/Lincense_API/Get_Lincesne_List";
        ISNPS.ajaxGET("/Lincense_API/Delet_Lincense/" + id + "/" + encodeURIComponent(Device_Name), null, gridId, url_get);
    } else if (Tittle == "") {
        License_Oid_inputtextBox.option({
            value: Tittle,
            isValid: false,
            validationError: { message: formatMessage('Field_not_empty') }
        });
    }
    else {
        License_Oid_inputtextBox.option({
            isValid: false,
            validationError: { message: formatMessage('Does_not_match') }
        });
    }
}