'use strict'
var selectedItems;
var isItems = false;;
$(document).ready(function () {
    //loadTagBoxData();

    var json_string = JSON.parse($("#oprostnik_list")[0].innerText);
    tagBoxData = json_string;

    var questionnariesInstance = $("#div_Questionnaries")
    if (questionnariesInstance.length > 0) {
        questionnariesInstance = questionnariesInstance[0].innerText;
        selectedItems = parseStringToObject(questionnariesInstance);
    }
});

//function addListener(event, obj, fn) {

//    if (obj.addEventListener) {
//        obj.addEventListener(event, fn, false);
//    } else {
//        obj.attachEvent("on" + event, fn);
//    }
//}

//addListener('load', window, function (event) {
//    alert("Your page is loaded");
//});

//window.addEventListener('load', () => {
//    console.log('Все ресурсы успешно загружены!');
//});
//document.onreadystatechange = () => {
//    
//    if (document.readyState === 'interactive ') {
//        console.log('Все ресурсы успешно загружены!');
//    }
//};
//if (document.readyState === 'interactive ') {
//    console.log('Все ресурсы успешно загружены!');
//}
//function doSomething() {
//   // 
//    //var datasource = $("#DeleteQuestionnaries")
//    //datasource = datasource[0].dxTagBox("instance");
//    //value = datasource.option("dataSource");
//}

//function doSomethingWhenPageIsLoaded() {
//    
//    var datasource = $("#DeleteQuestionnaries")
//    datasource = datasource.dxTagBox("instance");
//    value = datasource.option("dataSource");
//}

//if (document.readyState === "loading") {
//    document.addEventListener("DOMContentLoaded", doSomething);
//} else {
//    doSomething();
//}
function parseStringToObject(input) {
    let arr = input.replace(/\[|\]|\s/g, '').split(',');
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        obj[i] = arr[i];
    }
    return obj;
}

function onSubmitGroupClick(e, json_string) {

    e.event.preventDefault();
    var gridId = "gridGroup";
    var $form = $('form[name="addGroup"]');
    var url = $form.attr('action');
    var modal = '#lgModalBody';
    var form_field = {};


    var questionnariesInstance = $("#div_Questionnaries");
    if (questionnariesInstance.length > 0) {
        questionnariesInstance = questionnariesInstance[0].innerText;
        selectedItems = parseStringToObject(questionnariesInstance);
    } else {
        var Questionnaries = $("#Questionnaries").dxTagBox("instance");
        if (Questionnaries !== undefined) {
            selectedItems = Questionnaries.option("value");
        }
    }

    form_field.Questionnaries = [];
    form_field.Questionnaries = selectedItems;

    var DeleteQuestionnariesInstance = $("#DeleteQuestionnaries").dxTagBox("instance");
    if (DeleteQuestionnariesInstance !== undefined)
        var DeleteQuestionselectedItems = DeleteQuestionnariesInstance.option("value");
    else DeleteQuestionselectedItems = [];
    form_field.DeleteQuestionnaries = [];
    form_field.DeleteQuestionnaries = DeleteQuestionselectedItems;

    $form.find('input, textarea').each(function () {

        var name = $(this).attr('name');
        var value = $(this).val();
        switch (name) {
            case "Oid":
                form_field.Oid = value
                break;
            case "Name":
                form_field.Name = value.trim()
                break;
        }
    });
    var url_get = '/GroupQuestionnarei_API/Group_List';
    ISNPS.ajaxPOST(url, form_field, modal, gridId, true, url_get);
}

function customItem_creating(args) {
    var newValue = args.text,
        component = args.component,
        currentItems = component.option("items") || [];

    const isItemInDataSource = currentItems.some((item) => item === newValue);
    if (!isItemInDataSource) {
        currentItems.unshift(newValue);
        component.option('items', currentItems);
    }

    args.customItem = newValue;
}
var tagBoxData = null;

//function loadTagBoxData() {

//    if (tagBoxData === null) {
//        $.ajax({
//            url: '/GroupQuestionnarei_API/Oprostnik_Id_List',
//            type: 'GET',
//            success: function (data) {
//                tagBoxData = data;
//            },
//            error: function (xhr, status, error) {
//                console.error(status, error);
//            }
//        });
//    }
//}

var isChangingDataSource = false;
var previousValue = [];
function onTagBoxValueChanged(e) {

    if (isChangingDataSource) {
        return;
    }
    if (tagBoxData === null) {
        var json_string = JSON.parse($("#oprostnik_list")[0].innerText);
        tagBoxData = json_string;
    }
    debugger
    var Value = e.value;
    if (previousValue.length <= Value.length) {
        if (Value.length > 0) {
            var elementsOnlyInValue = Value.filter(function (item) {
                return previousValue.indexOf(item) === -1;
            });
            previousValue = previousValue.concat(elementsOnlyInValue);
        }
    } else {
        previousValue = [];
        previousValue = Value;
    }
    isChangingDataSource = true;

    e.component.beginUpdate();
    e.component.option({
        "value": previousValue,
        "dataSource": tagBoxData
    });
    e.component.endUpdate();

    isChangingDataSource = false;
}

var isDelet_Duplicat = false;
var config = { childList: true, subtree: true };
var targetNode = document.body;
var observer = new MutationObserver(function (mutationsList, observer) {
    var mutation = mutationsList[0];
    if (mutation.type === 'childList' && !isDelet_Duplicat) {
        var listItems = $(".dx-list-items").children();
        if (listItems.length > 0 && listItems.length % 2 === 0) {
            var flag = true;
            for (let i = 0; i < listItems.length / 2; i++) {
                var firstChildren = listItems.eq(i).children();
                var firstChildrenText = firstChildren[1].outerText;

                var Children_middle = listItems.eq(listItems.length / 2 + i).children();
                var Children_middleText = Children_middle[1].outerText;
                if (firstChildrenText !== Children_middleText) {
                    flag = false;
                    break;
                }
            }
            if (flag === true) {
                debugger
                var interval = listItems.length / 2;
                var length_listItems = listItems.length - 1;
                for (var i = interval; i <= length_listItems; i++) {
                    listItems.eq(i).remove();
                }
                var overlay_conten = $(".dx-popup-content")[0];
                var height = 55 + interval * 36;
                overlay_conten.setAttribute('style', 'height:' + height + 'px');
                isDelet_Duplicat = true;
                observer.disconnect()
                return;
            }
        }
    }
});
observer.observe(targetNode, config);

var observer2 = new MutationObserver(function (mutationsList, observer) {
    mutationsList.forEach(function (mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            document.querySelectorAll('.dx-checkbox-icon').forEach(function (icon) {
                icon.classList.add('hide-before');
            });
            mutation.addedNodes.forEach(function (addedNode) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    if (addedNode.matches('.dx-item.dx-list-item.dx-list-item-selected')) {
                        addedNode.remove();
                    }
                }
            });
        }
    });
});

observer2.observe(targetNode, config);
var flag = true;
var count_observer = 0;
var flag_ShowToast = false;

//var observer3 = new MutationObserver(function (mutationsList, observer) {
//    var count = 0;
//    mutationsList.forEach(function (mutation) {
//        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
//            var dx_tag_content = document.querySelector('.dx-texteditor-input-container.dx-tag-container');
//            if (dx_tag_content !== null) {
//                if (flag === true && dx_tag_content !== null && dx_tag_content.childNodes.length > 2) {
//                    flag = false;
//                    Toast_Remove();
//                    $("#toast-container").remove();
//                    observer2.disconnect();
//                }
//                if (flag_ShowToast === false && flag === true && dx_tag_content !== null && dx_tag_content.childNodes.length <= 2) {
//
//                    var questionnariesInstance = $("#div_Questionnaries")
//                    if (questionnariesInstance.length > 0) {
//                        questionnariesInstance = questionnariesInstance[0].innerText;
//                        // selectedItems = parseStringToObject(questionnariesInstance);
//                    } if (questionnariesInstance !== " [] " && tagBoxData!==null&& tagBoxData.length>0) {
//                        ShowToast_Custom('warning', "errorMessage");
//                        $("#toast-container .toast:not(:first)").remove();
//                    }
//                    flag_ShowToast = true;
//                }
//            }
//        }
//    });
//});

//observer3.observe(targetNode, config);
//function ShowToast_Custom(id, text) {
//    toastr.options = {
//        "closeButton": true,
//        "debug": false,
//        "newestOnTop": false,
//        "progressBar": true,
//        "positionClass": "toast-top-right",
//        "preventDuplicates": false,
//        "onclick": null,
//        "showDuration": "200",
//        "hideDuration": "800",
//        "timeOut": "3500",
//        "extendedTimeOut": "800",
//        "showEasing": "swing",
//        "hideEasing": "linear",
//        "showMethod": "fadeIn",
//        "hideMethod": "fadeOut"
//    }
//    toastr[id](text);
//}
//function Toast_Remove() {
//    toastr.remove();
//}
