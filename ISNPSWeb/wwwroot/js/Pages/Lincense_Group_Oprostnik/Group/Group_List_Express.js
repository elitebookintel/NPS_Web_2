var LincenseIdGrid;

function addGroupButtonClicked(e) {
    ISNPS.DrawPartialModal("/GroupQuestionnarei/GroupID/0/ ", "lgModalBody");
}

function infoButtonClicked(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    var id = e.row.data.Id;
    var name = e.row.data.Name;
    var modal = '#lgModalBody';
    ISNPS.ajaxGET("/GroupQuestionnarei/Info_GroupQuestionnarei/" + id + "/" + name, modal);
}

function editButtonClicked(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    const data = e.row.data;
    if (data) {
        var id = data.Id;
        var name = data.Name;
        var modal = '#lgModalBody';
        ISNPS.ajaxGET("/GroupQuestionnarei/GroupID/" + id + "/" + encodeURIComponent(name), modal);
    }
}
function deletButtonClicked(e) {
    e.component.selectRowsByIndexes(e.row.rowIndex);
    ISNPS.LargeModal();
    var id = e.row.data.Id;
    var modal = '#lgModalBody';
    var name = e.row.data.Name;
    ISNPS.ajaxGET("/GroupQuestionnarei/GeT_Delet_Group/" + id + "/" + encodeURIComponent(name), modal);
}

function refresh_Group_List() {
    ISNPS.load_dataSource('/GroupQuestionnarei_API/Group_List','gridGroup','DataGrid')
    //return $("#gridGroup").dxDataGrid("instance").refresh(true);
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

//$(() => {
//    
//    $('#gridGroup').dxDataGrid({
//        dataSource: ISNPS.load_dataSource('/GroupQuestionnarei_API/Group_List', 'gridGroup', 'DataGrid'),
//        keyExpr: 'Id',
//        columns: [{ dataField: "Id", caption: "ID", width: 70 },
//        { dataField: "Name", caption: "Group Name" }],
//        showBorders: true,
//        showRowLines: true,
//        filterRow: { visible: true },
//        filterPanel: { visible: true },
//        headerFilter: { visible: true },
//        columnChooser: { enabled: true },
//        hoverStateEnabled: true,
//        scrolling: { rowRenderingMode: "standard" },
//        selection: { mode: "single" },
//        grouping: { autoExpandAll: true },
//        groupPanel: { visible: true },
//        allowColumnResizing: true,
//        allowColumnReordering: true,
//        searchPanel: {
//            visible: true,
//            width: 240,
//            placeholder: "search",
//        },
//        loadPanel: { enabled: true },
//        paging: { pageSize: 15 },
//        pager: {
//            Visible: true,
//            ShowInfo: true,
//            DisplayMode: "adaptive",
//            ShowPageSizeSelector: true,
//            ShowNavigationButtons: true,
//            allowedPageSizes: [15, 25,50, 'all'],
//        },
//        columns: [{ dataField: "Id", caption: "ID", width: 70 },
//            { dataField: "Name", caption: "Group Name" },
//            {
//                type: "buttons",
//                buttons: [
//                    {
//                        hint: "Edit",
//                        icon: "edit",
//                        onClick: function (e) {
//                            editButtonClicked(e);
//                        }
//                    },
//                    {
//                        hint: "Details",
//                        icon: "file",
//                        onClick: function (e) {
//                            infoButtonClicked(e);
//                        }
//                    },
//                    {
//                        hint: "Delete",
//                        icon: "remove",
//                        onClick: function (e) {
//                            deletButtonClicked(e);
//                        }
//                    }
//                ]
//            }
//        ],
//        toolbar: {
//            items: [
//                {
//                    location: "before",
//                    widget: "dxButton",
//                    options: {
//                        text: "Add Group Questionnaire",
//                        icon: "plus",
//                        onClick: function () {
//                            addGroupButtonClicked();
//                        },
//                        stylingMode: "contained",
//                        type: "success"
//                    }
//                },
//                {
//                    location: "after",
//                    locateInMenu: "auto",
//                    widget: "dxButton",
//                    options: {
//                        icon: "refresh",
//                        onClick: function () {
//                            refresh_Group_List();
//                        }
//                    }
//                },
//                {
//                    location: "after",
//                    locateInMenu: "auto",
//                    name: "searchPanel",
//                    text: "Search Panel"
//                }
//            ]
//        },
//        onContentReady: function (e) {
//            created_data_grid(e);
//        }
//    });
//});