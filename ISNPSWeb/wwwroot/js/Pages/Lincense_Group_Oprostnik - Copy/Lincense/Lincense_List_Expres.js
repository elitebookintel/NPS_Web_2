var LincenseIdGrid;
var rowOid;
var DeviceName;

function addLincenseButtonClicked(e) {
    ISNPS.DrawPartialModal("/Lincense/Get_Add_Lincense", "lgModalBody");
}
function editButtonClicked(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    var Oid = e.row.data.Oid;
    var DeviceName = e.row.data.DeviceName;
    var name_group = e.row.data.GroupQuestionnarie_Name
    var modal = '#lgModalBody';
    ISNPS.ajaxGET("/Lincense/Get_UpsertLicense/" + Oid + "/" + encodeURIComponent(DeviceName) + "/" + encodeURIComponent(name_group), modal);
}
function infoButtonClicked(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    var Oid = e.row.data.Oid;
    var DeviceName = e.row.data.DeviceName;
    var name_group = e.row.data.GroupQuestionnarie_Name
    var modal = '#lgModalBody';
    ISNPS.ajaxGET("/Lincense/Get_Lincesne/" + Oid + "/" + encodeURIComponent(DeviceName) + "/" + encodeURIComponent(name_group), modal);
}

function deletButtonClicked(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    var id = e.row.data.Oid;
    var DeviceName = e.row.data.DeviceName;
    var name_group = e.row.data.GroupQuestionnarie_Name
    var modal = '#lgModalBody';
    ISNPS.ajaxGET("/Lincense/Delet_Get_Lincesne/" + id + "/" + encodeURIComponent(DeviceName) + "/" + encodeURIComponent(name_group), modal);
}

function refresh_Lincese_List() {
    ISNPS.load_dataSource('/Lincense_API/Get_Lincesne_List', 'gridLincese', 'DataGrid')
/*    return $("#gridLincese").dxDataGrid("instance").refresh(true);*/
}

function onDataGridInitialized(e) {
    var dataGrid = e.component; 
    var a = dataGrid.option("dataSource")
    var b = dataGrid.option("value")
}
function onClickContextMenuBtn(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    var status = e.row.data.LicenseStatus;
    rowOid = e.row.data.Oid;
    DeviceName = e.row.data.DeviceName;
    if (status == 0 || status == 'NotActivated') {
        var contextMenu = $("#ActiveContext").dxContextMenu('instance');
        contextMenu.option('target', e.event.target)
        $("#ActiveContext").dxContextMenu("show");
    }
    else if (status == 1 || status == 'Activate') {
        var contextMenu = $("#DisabledContext").dxContextMenu('instance');
        contextMenu.option('target', e.event.target)
        $("#DisabledContext").dxContextMenu("show");
    }
    else if (status == 2 || status == 'Disable') {
        var contextMenu = $("#ActiveContext").dxContextMenu('instance');
        contextMenu.option('target', e.event.target)
        $("#ActiveContext").dxContextMenu("show");
    }
}

function onContextMenuItemClick(e) {
    switch (e.itemData.id) {
        case 'active':
            {
                changeStatusButtonClicked(e, 1);
                break;
            }
        case 'disable':
            {
                changeStatusButtonClicked(e, 2);
                break;
            }
        case 'releaseLicense':
            {
                changeStatusButtonClicked(e, -1);
                break;
            }
    }
}
function changeStatusButtonClicked(e, status) {
    var gridId = "gridLincese";
    var url = "/Lincense_API/Change_Status_Lincense?id=" + encodeURIComponent(rowOid) + "&licenseStatus_int=" + encodeURIComponent(status);
    ISNPS.DrawPartialModal("/Lincense/Change_Status_Lincense/" + encodeURIComponent(rowOid) + "/" + encodeURIComponent(status) + "/" + encodeURIComponent(DeviceName), "lgModalBody");
}

var isreload = false;
function created_data_grid() {
    if (!isreload) {
        var elements = document.getElementsByClassName("dx-texteditor-input-container");
        var elements_children = elements[0].children;
        var input_element = elements_children[2];
        input_element.setAttribute('data-dx_placeholder', formatMessage('Search'))
        isreload = true;
    }
    if (window.innerWidth <= 499) {
        var elements = document.querySelectorAll('[id="Add_item"]');
        elements.forEach(function (element) {
            var instance = $(element).dxButton("instance");
            instance.option("width", 170);
        });
    }
    var selector = ".dx-datagrid-search-panel.dx-show-invalid-badge.dx-textbox.dx-texteditor.dx-editor-outlined.dx-searchbox.dx-show-clear-button.dx-texteditor-empty.dx-widget";
    var search = document.querySelector(selector);
    if (window.innerWidth <= 358) {
        if (search) {
            search.style.width = "200px";
        }
    }
    else if (search) {
        search.style.width = "280px";
    }
}

//var observer = new MutationObserver(function (mutationsList, observer) {
//    for (var mutation of mutationsList) {
//        if (mutation.type === 'childList') {
//            mutation.addedNodes.forEach(function (addedNode) { 
//                if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.matches('.dx-error-row')) {
//                    var alertElements = document.querySelector('[role="alert"]');
//                    if (alertElements !== undefined || alertElements !== null) {
//                        var text = alertElements.textContent.trim();
//                        if (text === "Unexpected response received") {
//                            alertElements.textContent = formatMessage("Unexpected_response_received");
//                        }
//                    }
//                }
//            });
//        }
//    }
//});
//observer.observe(document.body, { childList: true, subtree: true });
