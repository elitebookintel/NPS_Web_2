
function onSubmitLincenseClick(e) {
    $.ajax({
        url: "/GroupQuestionnarei_API/Group_List",
        cache: false,
        type: "GET",
        dataType: "html",
        statusCode: {
            302: function (data) {
                window.location.href = '/Account/Logout/';
            },
            401: function (data) {
                window.location.href = '/Account/Logout/';
            }
        },
        success: function (result) {
            if (ISNPS.IsJSON(result)) {
                url_get = "/Lincense_API/Get_Lincesne_List";
                result = ISNPS.ParseJSON(result);
                e.event.preventDefault();
                var gridId = "gridLincese";
                var $form = $('form[name="addLincense"]');
                var url = $form.attr('action');
                var modal = '#lgModalBody';
                var Quantity = $("#Quantity")
                Quantity = $(Quantity[0]).dxTextBox("instance");
                Quantity_value = Quantity.option("value");

                //if (Quantity_value == "" || Quantity_value ==null) {
                //    Quantity.option({
                //        isValid: false,
                //        validationError: { message: formatMessage('Field_not_empty') },
                //    });
                //}
                var GroupQ = $("#GroupQ")
                GroupQ = $(GroupQ[0]).dxSelectBox("instance");
                value_GroupQ = document.querySelector('input#GroupQ.dx-texteditor-input').value;
                var id_grup;
                var form = {};
                form.Quantity = Quantity_value
                result.Record.some(function (item) {
                    if (item.Name === value_GroupQ) {
                        id_grup = item.Id;
                        return;
                    }
                });
                form.GroupQ = id_grup;
                form.Name_GroupQ = value_GroupQ;
                ISNPS.ajaxPOST(url, form, modal, gridId, true, url_get);
            }
        }
    });

}


var flag = false;

function OnValueChanged(e) {
    if (flag) {
        var GroupQ = $("#GroupQ").dxSelectBox("instance");
        if (inputElement !== undefined && inputElement !== "") {
            if (exists === false) {

                flag = false;
                var string = formatMessage('Group_not_exist')
                var newString = string.replace(/_/g, inputElement);
                GroupQ.option("value", null);
                GroupQ.option({
                    isValid: false,
                    validationError: { message: newString },
                    validationMessageMode: "auto",
                });
            } else {
                GroupQ.option("isValid", true);
                flag = false;
                if (e.value === undefined) {
                    GroupQ.option("value", input_id);
                }
                else {
                    GroupQ.option("value", e.value);
                }
            }
        } else {
            GroupQ.option("isValid", true);
        }
    }
    input_value = undefined;
    input_id = undefined;
    //  document.querySelector('input#GroupQ.dx-texteditor-input').value = inputElement
}

var targetNode;
var inputElement
var input_value;
var input_id;
var exists = false;
function OnInput() {
    flag = true;
    inputElement = document.querySelector('input#GroupQ.dx-texteditor-input').value;
    var GroupQ = $("#GroupQ").dxSelectBox("instance")
    GroupQ.option("isValid", true);
    var items = GroupQ.option("items");
    exists = items.some(function (item) {
        if (item.Name === inputElement) {
            input_value = item.Name;
            input_id = item.Id;
            return true;
        }
    });
}

function created_SelectBox(e, Name_Group) {
    var GroupQinstance = $("#GroupQ").dxSelectBox("instance")
    if (Name_Group == null || Name_Group === undefined || Name_Group == "string") {
        Name_Group = "";
    }
    GroupQinstance.option("value", Name_Group);
}

function onSubmitUpsertLicenseClick(e, LicenseStatus) {
    $.ajax({
        url: "/GroupQuestionnarei_API/Group_List",
        cache: false,
        type: "GET",
        dataType: "html",
        statusCode: {
            302: function (data) {
                window.location.href = '/Account/Logout/';
            },
            401: function (data) {
                window.location.href = '/Account/Logout/';
            }
        },
        success: function (result) {
            if (ISNPS.IsJSON(result)) {
                result = ISNPS.ParseJSON(result);

                e.event.preventDefault();
                var gridId = "gridLincese";
                var $form = $('form[name="UpsertLicense"]');
                var url = $form.attr('action');
                var modal = '#lgModalBody';

                var Oid = $("#Oid")
                Oid = $(Oid[0]).dxTextBox("instance");
                Oid = Oid.option("value");

                var DeviceName = $("#DeviceName")
                DeviceName = $(DeviceName[0]).dxTextBox("instance");
                DeviceName = DeviceName.option("value");

                var ActivationCode = $("#ActivationCode")
                ActivationCode = $(ActivationCode[0]).dxTextBox("instance");
                ActivationCode = ActivationCode.option("value");

                var LincenseActivated = $("#LincenseActivated")
                LincenseActivated = $(LincenseActivated[0]).dxTextBox("instance");
                LincenseActivated = LincenseActivated.option("value");

                var GroupQ = $("#GroupQ")
                GroupQ = $(GroupQ[0]).dxSelectBox("instance");
                var value_GroupQ = document.querySelector('input#GroupQ.dx-texteditor-input').value;
                if (value_GroupQ !== "" && value_GroupQ !== null && value_GroupQ !== undefined) {
                    if (typeof value_GroupQ === 'string' || value_GroupQ instanceof String) {
                        var id_grup;
                        result.Record.some(function (item) {
                            if (item.Name === value_GroupQ) {
                                id_grup = item.Id;
                                return true;
                            }
                        });
                        value_GroupQ = id_grup;
                    }
                    var form = {};
                    form.Oid = Oid;
                    form.deviceName = DeviceName;
                    form.activationCode = ActivationCode;
                    form.licenseStatus = LicenseStatus;
                    form.licenseActivated = LincenseActivated;
                    form.groupQuestionnarieID = value_GroupQ;
                    var url_get = "/Lincense_API/Get_Lincesne_List";
                    ISNPS.ajaxPOST(url, form, modal, gridId, true, url_get);
                } else {
                    GroupQ.option({
                        isValid: false,
                        validationError: { message: formatMessage("Field_not_empty") },
                    });
                }
            }

        }
    });
}

