
var elements = document.getElementsByName('langSelector');
var dataLang = elements[0].getAttribute('data-lang').toUpperCase();
function addGroupButtonClicked(e) {
    ISNPS.DrawPartialModal("/Oprostnik/OprostnikID/0/ ", "lgModalBody");
}

function infoButtonClicked(e) {

    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    name_oprostnik = e.row.data.Name;
    var id = e.row.data.Oid;
    /*    var name = JSON.parse(e.row.data.Name);*/
    var modal = '#lgModalBody';
    ISNPS.ajaxGET("/Oprostnik/Info_Oprostnik/" + encodeURIComponent(name_oprostnik) + "/" + id, modal);
}

function editButtonClicked(e) {

    e.component.selectRowsByIndexes(e.row.rowIndex);
    const data = e.row.data;
    name_oprostnik = e.row.data.Name;
    if (data) {
        var id = data.Oid;
        /*        var name = JSON.parse(e.row.data.Name);*/
        var modal = '#lgModalBody';
        ISNPS.DrawPartialModal("/Oprostnik/OprostnikID/" + id + "/" + encodeURIComponent(name_oprostnik), "lgModalBody");
    }
}

function deletButtonClicked(rowOid) {
    ISNPS.LargeModal();
    var modal = '#lgModalBody';
    /*    var name = JSON.parse(e.row.data.Name);*/
    ISNPS.ajaxGET("/Oprostnik/GeT_Delet_Oprostnik/" + rowOid + "/" + encodeURIComponent(name_oprostnik), modal);
}

function refresh_Oprostnik_List() {
    /*    return $("#gridOprostnik").dxDataGrid("instance").refresh(true);*/
    //var url_get = '/Oprostnik_API/Oprostnik_List';
    //ISNPS.ajaxGET("/Oprostnik_API/Delet_Oprostnik/" + id, null, gridId, url_get);

    ISNPS.load_dataSource('/Oprostnik_API/Oprostnik_List', 'gridOprostnik', 'DataGrid')
}

var name_oprostnik;
function onClickContextMenuBtn(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    var status = e.row.data.Status;
    rowOid = e.row.data.Oid;

    name_oprostnik = e.row.data.Name;
    if (status == 0 || status == 'New') {
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
        case 'delet': {
            deletButtonClicked(rowOid, name_oprostnik);
        }
    }
}
function changeStatusButtonClicked(e, status) {
    var gridId = "gridOprostnik";

    /*    var name = JSON.parse(e.row.data.Name);*/
    //  var url = "/Oprostnik_API/Change_Status_Questionnaire?id=" + encodeURIComponent(rowOid) + "&status_int=" + encodeURIComponent(status);
    ISNPS.DrawPartialModal("/Oprostnik/Change_Status_Oprostnik/" + encodeURIComponent(rowOid) + "/" + encodeURIComponent(name_oprostnik) + "/" + encodeURIComponent(status), "lgModalBody");
}


function lincButtonOrostnikClicked(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    var id = e.row.data.Oid;
    window.location.href = "/Question/Index/" + id;
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

function load_dataSource(a, b) {

}