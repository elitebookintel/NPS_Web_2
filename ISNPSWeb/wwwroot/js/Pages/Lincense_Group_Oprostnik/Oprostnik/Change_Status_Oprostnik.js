'use strict'

function onChange_Status(LicenseStatus, Id, name, isEmpty) {
    
    var url_get = '/Oprostnik_API/Oprostnik_List';
    if (parseInt(LicenseStatus, 10)  === 1) {
        if (isEmpty === "False") {
            var gridId = "gridOprostnik";
            var url = "/Oprostnik_API/Change_Status_Questionnaire?id=" + encodeURIComponent(Id) + "&status_int=" + encodeURIComponent(LicenseStatus) + "&name_oprostnik=" + encodeURIComponent(name);       
            ISNPS.ajaxGET(url, null, gridId, url_get);
        } else {
            ShowToast('warning', formatMessage("Questionnaire_currently_empty"));
        }
    } else {
        var gridId = "gridOprostnik";
        var url = "/Oprostnik_API/Change_Status_Questionnaire?id=" + encodeURIComponent(Id) + "&status_int=" + encodeURIComponent(LicenseStatus) + "&name_oprostnik=" + encodeURIComponent(name);       
        ISNPS.ajaxGET(url, null, gridId, url_get);
    }
}