
var lgModal = document.getElementById('lgModal');
var xlModal = document.getElementById('xlModal');
var xxxlModal = document.getElementById('xxxlModal');

$.ajax({
    url: "/Base/GetUserClaims/",
    cache: false,
    type: "GET",
    dataType: "json",
    statusCode: {
        302: function (data) {
            window.location.href = '/Account/Logout/';
        }
    },
    success: function (result) {
        var languageUser = result.UiLanguage.toLowerCase() != null ? result.UiLanguage.toLowerCase() : "ru";
        DevExpress.localization.locale(languageUser);
    }
});

function changeTitle(newTitle) {
    $('title').text(newTitle);
}


var formatMessage = DevExpress.localization.formatMessage;

var html = '<div id="spinner-content" class="d-flex justify-content-center">' +
    '<div class="" name="Growing-Spinners">' +
    '<div class="spinner-grow text-primary" role = "status" style="height:3rem;width:3rem;" >' +
    '<span class="sr-only">Loading...</span>' +
    '</div >' +
    '<div class="spinner-grow text-secondary" role="status" style="height:3rem;width:3rem;">' +
    ' <span class="sr-only">Loading...</span>' +
    '</div>' +
    '<div class="spinner-grow text-success" role="status" style="height:3rem;width:3rem;">' +
    '<span class="sr-only">Loading...</span>' +
    '</div>' +
    '<div class="spinner-grow text-danger" role="status"style="height:3rem;width:3rem;">' +
    '<span class="sr-only">Loading...</span>' +
    '</div>' +
    '<div class="spinner-grow text-warning" role="status" style="height:3rem;width:3rem;">' +
    '<span class="sr-only">Loading...</span>' +
    '</div>' +
    '<div class="spinner-grow text-info" role="status" style="height:3rem;width:3rem;">' +
    '<span class="sr-only">Loading...</span>' +
    '</div>' +
    '</div >' +
    '</div >';


lgModal.addEventListener('hidden.bs.modal', function () {
    $(this).removeData();
    $("#lgModalBody").html(html);

})

xlModal.addEventListener('hidden.bs.modal', function () {
    $(this).removeData();
    $("#xlModalBody").html(html);
})

xxxlModal.addEventListener('hidden.bs.modal', function () {
    $(this).removeData();
    $("#xxxlModalBody").html(html);
})

function ShowToast(id, text) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[id](text);
}

function showDangerAlert(message) {
    toastr["danger"](message);
}

function closeModalClick(e) {

    $('#lgModal,#xlModal,#xxxlModal').modal('hide');
}
$(function () {
    Edit_button();
})

window.addEventListener('resize', function () {
    Edit_button();
});

function Edit_button() {
    if (window.innerWidth <= 499) {
        var elements = document.querySelectorAll('[id="Add_item"]');
        elements.forEach(function (element) {
            var instance = $(element).dxButton("instance");
            instance.option("width", 170);
        });
    }
    else {
        var elements = document.querySelectorAll('[id="Add_item"]');
        elements.forEach(function (element) {
            var instance = $(element).dxButton("instance");
            instance.option("width", "");
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