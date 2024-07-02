'use strict'

var ISNPS = {
    isNotEmpty: function (value) {
        return value !== undefined && value !== null && value !== '';
    },
    IsJSON: function (value) {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    },
    ParseJSON: function (value) {
        try {
            var parsed = JSON.parse(value);
            return parsed;
        } catch (e) {

            var json = {
                parsed: value,
                e: e,
            };
            return json;
        }
        return value;
    },

    HideModals: function () {
        $('#lgModal,#xlModal,#xxxlModal').modal('hide');
    },


    LargeModal: function () {

        var myModal = new bootstrap.Modal(document.getElementById('lgModal'), {

            keyboard: false
        });

        myModal.toggle();
        myModal.show();
    },
    ExtraLargeModal: function () {
        var myModal = new bootstrap.Modal(document.getElementById('xlModal'), {
            keyboard: false
        });
        myModal.toggle();
        myModal.show();
    },

    SuperExtraLargeModal: function () {
        var myModal = new bootstrap.Modal(document.getElementById('xxxlModal'), {
            keyboard: false
        });
        myModal.toggle();
        myModal.show();
    },

    ajaxGET: function (url, modal, gridId, url_get) {
        $.ajax({
            url: url,
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
                ISNPS.GETResponse(result, modal, gridId, url_get);
                return result;
            }
        });
        ISNPS.HideModals();

    },
    GETResponse: function (result, modal, gridId, url_get) {
        
        if (ISNPS.IsJSON(result)) {
            result = ISNPS.ParseJSON(result);
            if (result.result == 1) { // OK
                if (result.showToast) {
                    ShowToast('success', result.message);
                }
                if (result.Record != null) {
                    return result.Record;
                }
                if (gridId) {
                    /*  $("#" + gridId).dxDataGrid("getDataSource").reload();*/
                    $("#" + gridId).dxDataGrid("instance").option("dataSource", ISNPS.load_dataSource(url_get, gridId, 'DataGrid'));
                }
            }
            else if (result.result == 2) {// KO
                if (result.showToast) {
                    ShowToast('warning', result.message);
                }
            }
            else if (result.result == 3) {// ERROR
                if (result.showToast) {
                    ShowToast('info', result.message);
                }
            } else if (result.result == 4) {// NOTVALID
                if (result.showToast) {
                    ShowToast('warning', result.message);
                }
            } else if (result.result == 5) {// EXCEPTION
                if (result.showToast) {
                    ShowToast('warning', result.message);
                }
            } else if (result.result == 6) {// LOGOUT
                if (result.showToast) {
                    ShowToast('error', result.message);
                }
                window.location.href = '/Account/Logout/';
            }
        }
        if (modal != null) {
            $(modal).html(result);
        }

    },
    ajaxPOST: function (url, form, modal, gridId, not_form, url_get) {
        
        if ((not_form != undefined || not_form != null) && !not_form) {
            form = form.serialize()
        }
        $.ajax({
            url: url,
            cache: false,
            type: "POST",
            dataType: "html",
            data: form,
            statusCode: {
                302: function (data) {
                    window.location.href = '/Account/Logout/';
                },
                401: function (data) {
                    window.location.href = '/Account/Logout/';
                }
            },
            success: function (result) {
                
                ISNPS.POSTResponse(result, modal, gridId, url_get);
            }
        });
    },

    POSTResponse: function (result, modal, gridId, url_get) {
        
        if (ISNPS.IsJSON(result)) {
            result = ISNPS.ParseJSON(result);
            if (modal != null) {
                ISNPS.HideModals();
            }
            if (result.result == 1) { // OK
                if (modal == "#lgModalRolesBody") {
                    ISNPS.HideRolesModals();
                }
                else {
                    ISNPS.HideModals();
                }
                if (result.showToast) {
                    ShowToast('success', result.message);
                }
                if (gridId) {
                    
                    var table = $("#" + gridId).dxDataGrid("instance");
                    if (ISNPS.isNotEmpty(table)) {
                        //$("#" + gridId).dxDataGrid("getDataSource").reload();
                        //table.getDataSource().reload();
                        $("#" + gridId).dxDataGrid("instance").option("dataSource", ISNPS.load_dataSource(url_get, gridId, 'DataGrid'));
                    }
                }
                if (result.Record != null) {
                    return result.Record;
                }
            }
            else if (result.result == 2) {// KO
                if (result.showToast) {
                    ShowToast('warning', result.message);
                }
            }
            else if (result.result == 3) {// ERROR
                if (result.showToast) {
                    ShowToast('info', result.message);
                }
            } else if (result.result == 4) {// NOTVALID
                if (result.showToast) {
                    ShowToast('warning', result.message);
                }
            } else if (result.result == 5) {// EXCEPTION
                if (result.showToast) {
                    ShowToast('warning', result.message);
                }
            } else if (result.result == 6) {// LOGOUT
                if (result.showToast) {
                    ShowToast('error', result.message);
                }
                window.location.href = '/Account/Logout/';
            }
        }
        else if (!ISNPS.IsJSON(result)) {
            if (modal != null) {
                $(modal).html(result);
            }
        }

    },

    DrawPartialView: function (url, divId) {
        $.ajax({
            url: url,
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
            beforeSend: function () {
                $('#' + divId).html('<div id="spinner-content" class="d-flex justify-content-center">' +
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
                    '</div >');
            },
            success: function (result, e) {

                if (divId == null) {
                    $('#bodyContent').html(result);
                }
                else {
                    $('#' + divId).html(result);
                }

            },
        });
    },


    DrawPartialModal: function (url, modalId) {

        if (modalId == "xlModalBody") {
            ISNPS.ExtraLargeModal();
        }
        else if (modalId == "lgModalBody") {
            modalId
            ISNPS.LargeModal();
        } else if (modalId == "xxxlModalBody") {
            ISNPS.SuperExtraLargeModal();
        }
        $.ajax({
            url: url,
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
            beforeSend: function () {
                $('#' + modalId).html('<div id="spinner-content" class="d-flex justify-content-center">' +
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
                    '</div >');
            },
            success: function (result) {
                if (!ISNPS.IsJSON(result)) {
                    $('#' + modalId).html(result);
                }
            }
        });
    },

    ajaxCultureGET: function (url) {
        $.ajax({
            url: url,
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
                ISNPS.GETCultureResponse(result);
            }
        });

    },
    GETCultureResponse: function (result) {
        var replacedText = ISNPS.IsJSON(result);
        if (ISNPS.IsJSON(result)) {
            result = ISNPS.ParseJSON(result);
            if (result.result == 1) {
                var drawUrl = window.location.pathname;
                if (drawUrl == "/Account/LockScreen") {
                    window.location.href = '/Account/LockScreen';
                }
                else {
                    if (drawUrl == "/Account/Login") {
                        window.location.reload();
                    }
                    else {
                        window.location.href = drawUrl;
                    }
                }
            }
        }
    },

    ajaxGET_Question: function (url, valueOfTextBoxInDiv) {
        $.ajax({
            url: url,
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
                    var formData =
                    {
                        Command:
                        {
                            Questions: [],
                            BaseQueryModel: {}
                        },
                    };
                    var question_info = result;
                    question_info[0].Index = valueOfTextBoxInDiv;
                    question_info[0].Question = JSON.stringify(question_info[0].Question);
                    question_info[0].Comentary = JSON.stringify(question_info[0].Comentary);

                    question_info[0].ResponseVariants = [];

                    formData.Command.Questions = question_info;

                    $.ajax({
                        url: "/Question/POST_Upsert_Question",
                        cache: false,
                        type: "POST",
                        dataType: "html",
                        data: formData,
                        statusCode: {
                            302: function (data) {
                                window.location.href = '/Account/Logout/';
                            },
                            401: function (data) {
                                window.location.href = '/Account/Logout/';
                            }
                        },
                        success: function (response) {
                        },
                        error: function (xhr, status, error) {

                            console.error("Error:", error);
                        }
                    });
                }
            }
        });
        ISNPS.HideModals();

    },
    ajaxGET_Question_Info: function (url, questionId, curent_lang) {
        $.ajax({
            url: url,
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
                    if (result.result == 1) {
                        result = result.Record[0];
                        var textBox = $("#Tittle_" + questionId);
                        textBox.dxTextBox("instance").option({
                            readOnly: true,
                            value: result.Question[curent_lang],
                            validationError: null,
                            isValid: true,
                        })
                        var textArea = $("#Comentary_" + questionId);
                        textArea.dxTextArea("instance").option({
                            readOnly: true,
                            value: result.Comentary[curent_lang],
                            validationError: null,
                            isValid: true,
                        })
                        var Button = $("#Edit_Question_" + questionId);
                        Button.dxButton("instance").option("visible", true);

                        var modalFooter = document.getElementById("footer_button_" + questionId);
                        modalFooter.setAttribute('hidden', 'hidden');

                        if (result.GradingType == 3 || result.GradingType == 4) {
                            var ButtonAdd_Answert_Question_ = document.getElementById("ButtonAdd_Answert_Question_" + questionId);
                            ButtonAdd_Answert_Question_.style.display = "none";
                        }
                        var listElement = $('#List_Answert_' + questionId);
                        if (listElement.length > 0) {
                            listElement.children('.row').remove();
                        }

                        for (var key in result.Question) {
                            if (result.Question[key] == "") {
                                var type = "normal";
                                var disabled = false;
                            }
                            else {
                                var type = "success";
                                var disabled = false;
                            }
                            if (curent_lang == key) {
                                var disabled = true;
                            }

                            if (window.innerWidth < 600) {
                                var text_button = ""
                            } else {
                                var text_button = key
                            }
                            if (window.innerWidth <= 365) {
                                var width = 30;
                                var height = 30;
                            } else {
                                var width = "";
                                var height = "";
                            }
                            var Language_Question_ = $("#Language_" + key + "_Question_" + questionId);
                            Language_Question_.empty();
                            var Language_Button_prev = $('<div id="Language_' + key + "_" + questionId + '">').dxButton({
                                id: 'Language_' + key + "_" + questionId,
                                text: text_button,
                                icon: '/assets/images/Flag_' + key + '.png',
                                type: type,
                                width: width,
                                height: height,
                                stylingMode: 'contained',
                                onClick: function (e) {
                                    onLanguage_Questions(e, key, key, result);
                                },
                                visible: true,
                                disabled: disabled
                            });
                            Language_Question_.append(Language_Button_prev.get(0));
                        }

                        for (let i = 0; i < result.ResponseVariants.length; i++) {
                            var idanswert = result.ResponseVariants[i].Id;
                            var textBox = $("#Answert_Response_" + questionId + "_" + idanswert);

                            textBox.dxTextBox("instance").option({
                                readOnly: true,
                                value: result.ResponseVariants[i].Response[curent_lang],
                                validationError: null,
                                isValid: true,
                            })
                        }
                    }
                } 
                else if (result.result == 2) {// KO
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                }
                else if (result.result == 3) {// ERROR
                    if (result.showToast) {
                        ShowToast('error', result.message);
                    }
                } else if (result.result == 4) {// NOTVALID
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                } else if (result.result == 5) {// EXCEPTION
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                } else if (result.result == 6) {// LOGOUT
                    if (result.showToast) {
                        ShowToast('error', result.message);
                    }
                    window.location.href = '/Account/Logout/';
                }
            },
            error: function (xhr, status, error) {
                reject(error);
            },
        });

    },
    load_dataSource: function (url, instance_id, type_instance) {
        
        $.ajax({
            url: url,
            method: "GET",
            success: function (result) {
                
                if (result.result == 1) { // OK
                    var button = $("#submit_button")[0];
                    if (button !== undefined) {
                        $(button).dxButton("instance").option("disabled", false)
                    }
                    if (type_instance === "DataGrid") {
                        var grid = $("#" + instance_id).dxDataGrid("instance");
                        grid.option("dataSource", result.Record)
                    } else if (type_instance === "SelectBox") {
                        var SelectBox = $("#" + instance_id).dxSelectBox("instance");
                        SelectBox.option("dataSource", result.Record)
                    } else if (type_instance === "TagBox") {
                        
                        var TagBox = $("#" + instance_id).dxTagBox("instance");
                        TagBox.option("dataSource", result.Record)
                    }
                }
                else if (result.result == 2) {// KO
                    var button = $("#submit_button")[0];
                    if (button !== undefined) {
                        $(button).dxButton("instance").option("disabled", true)
                    }              
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                }
                else if (result.result == 3) {// ERROR
                    if (result.showToast) {
                        ShowToast('error', result.message);
                    }
                } else if (result.result == 4) {// NOTVALID
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                } else if (result.result == 5) {// EXCEPTION
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                } else if (result.result == 6) {// LOGOUT
                    if (result.showToast) {
                        ShowToast('error', result.message);
                    }
                    window.location.href = '/Account/Logout/';
                }
            },
            error: function (error) {

            }
        });
    }
}