'use strict'

function onChange_Status(LicenseStatus, Id, divece_name) {
    var gridId = "gridLincese";
    var url_get = "/Lincense_API/Get_Lincesne_List";
    var url = "/Lincense_API/Change_Status_Lincense?id=" + encodeURIComponent(Id) + "&licenseStatus_int=" + encodeURIComponent(LicenseStatus) + "&divace_Name=" + encodeURIComponent(divece_name);
    ISNPS.ajaxGET(url, null, gridId, url_get);

}