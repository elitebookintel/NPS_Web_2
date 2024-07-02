$(document).ready(function () {

    changeTitle(formatMessage('LockScreen') + '| NPS Portal');
});

function changePasswordMode_lockscren() {
    var passwordEditor = $("#LockScreen_Input").dxTextBox("instance");
    var buttonEditor = $("#passwordButton").dxButton("instance");
    //passwordEditor.option("mode", passwordEditor.option("mode") === "text" ? "password" : "text");
    var input = document.querySelector('input#LockScreen_Input.dx-texteditor-input')
    var newIcon;

    var currentIcon = buttonEditor.option("icon");
    if (currentIcon === "fa fa-eye") {
        newIcon = "fa fa-eye-slash";
        input.value = password;
    } else {
        newIcon = "fa fa-eye";
        input.value = value;
    }
    buttonEditor.option("icon", newIcon);
}

function getCaretPosition(ctrl) {
    // IE < 9 Support 
    if (document.selection) {
        ctrl.focus();
        var range = document.selection.createRange();
        var rangelen = range.text.length;
        range.moveStart('character', -ctrl.value.length);
        var start = range.text.length - rangelen;
        return {
            'start': start,
            'end': start + rangelen
        };
    } // IE >=9 and other browsers
    else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        return {
            'start': ctrl.selectionStart,
            'end': ctrl.selectionEnd
        };
    } else {
        return {
            'start': 0,
            'end': 0
        };
    }
}

var val;
var selectionStart;
var selectionEnd;
var password = "";
var value = "";

$(document).ready(function () {
    var lockScreenInput = document.querySelector('#LockScreen_Input.dx-texteditor-input')
    lockScreenInput.onselect = function () {
        selectionStart = lockScreenInput.selectionStart;
        selectionEnd = lockScreenInput.selectionEnd;
    };
});
function Password_Input(e) {
    var textbox = e.component;
    var input = document.querySelector('input#LockScreen_Input.dx-texteditor-input')
    var value_input = input.value;

    var buttonEditor = $("#passwordButton").dxButton("instance");
    var currentIcon = buttonEditor.option("icon");

    if (currentIcon === "fa fa-eye") {
        var caretPos = getCaretPosition(input);
        var cursorPosition = caretPos.start + 1;
        if (value_input.length > password.length) {
            if (selectionStart === selectionEnd) {
                var flag = false;
                if ((value_input.length - password.length) > 1) {
                    var Caret_position = cursorPosition;
                    cursorPosition -= (value_input.length - password.length - 1)
                    flag = true;
                }
                var passwordBeforeCursor = password.slice(0, cursorPosition - 2);
                var passwordAfterCursor = password.slice(cursorPosition - 2);
                for (var i = 0; i < value_input.length; i++) {
                    if (value_input[i] !== "\u2022") {
                        passwordBeforeCursor += value_input[i];
                        //valueBeforeCursor += "*";
                        value += "\u2022";
                    }
                }
                password = passwordBeforeCursor + passwordAfterCursor;
            }
        } else if (value_input.length < password.length) {
            if (selectionStart === selectionEnd) {
                password = password.slice(0, cursorPosition - 1) + password.slice(cursorPosition);
                value = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
            }
        } else if (value_input.length === password.length) {
            password = "";
            value = "";
            for (var i = 0; i < value_input.length; i++) {
                if (value_input[i] !== "\u2022") {
                    password += value_input[i];
                    //valueBeforeCursor += "*";
                    value += "\u2022";
                }
            }
            input.value = value;
        }
        if (selectionStart !== selectionEnd) {
            var passwordBeforeCursor = password.slice(0, selectionStart);
            var passwordAfterCursor = password.slice(selectionEnd);
            value = value.slice(0, selectionStart) + value.slice(selectionEnd);

            for (var i = 0; i < value_input.length; i++) {
                if (value_input[i] !== "\u2022") {
                    passwordBeforeCursor += value_input[i];
                    //valueBeforeCursor += "*";
                    value += "\u2022";
                }
            }
            password = passwordBeforeCursor + passwordAfterCursor;
        }
        textbox.option("value", value);

        if (flag) {
            input.setSelectionRange(Caret_position - 1, Caret_position - 1);
        } else {
            input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        }
    }
    else if (currentIcon === "fa fa-eye-slash") {
        if (value_input.length > password.length) {
            password = value_input;
        } else {
            password = value_input;
        }
        value = "";
        for (let i = 0; i < value_input.length; i++) {
            value += "\u2022";
        }
        textbox.option("value", password);
    }
    selectionStart = 0;
    selectionEnd = 0;
}
function Submit_Form(redirectedFrom) {
    var $form = $('form[name="lockScreenForm"]');
    $form.find('input:eq(5)').val(password);
    var url = $form.attr('action');
    var userClaimViewModel = {};
    $form.find('input, textarea').each(function () {
        var name = $(this).attr('name');
        var value_field = $(this).val();
        if (!name) {
            return;
        }
        switch (name) {
            case "Email":
                userClaimViewModel.Email = value_field;
                break;
            case "Id":
                userClaimViewModel.Id = value_field;
                break;
            case "FullName":
                userClaimViewModel.FullName = value_field;
                break;
            case "UiLanguage":
                userClaimViewModel.UiLanguage = value_field;
                break;
            case "Picture":
                userClaimViewModel.Picture = value_field;
                break;
        }
    });

    if (password === "" || password === undefined || password === null) {
        var password_textbox = $("#LockScreen_Input").dxTextBox("instance");
        password_textbox.option({
            isValid: false,
            validationError: { message: formatMessage('LockScreenPasswordValidation'), }
        });
        return;
    }
    userClaimViewModel.Password = password;

    var input = document.querySelector('input#LockScreen_Input.dx-texteditor-input')
    input.value = value;
    $.ajax({
        url: url,
        cache: false,
        type: "POST",
        dataType: "html",
        data: userClaimViewModel,
        success: function (result) {
            
            var currentUrl = window.location.href;
            var cleanUrl = new URL(currentUrl);
            var baseUrl = cleanUrl.origin + cleanUrl.pathname;
            if (ISNPS.IsJSON(result)) {
                result = ISNPS.ParseJSON(result);
                if (result.result == 1) {
                }
                else if (result.result == 2) {
                    Swal.fire(
                        DevExpress.localization.formatMessage('Error'),
                        result.message,
                        'error'
                    );
                }
                else if (result.result == 3) {
                    Swal.fire(
                        DevExpress.localization.formatMessage('Error'),
                        result.message,
                        'error'
                    );
                }
                var input = document.querySelector('input#LockScreen_Input.dx-texteditor-input')
                input.value = value;
                var buttonEditor = $("#passwordButton").dxButton("instance");
                buttonEditor.option("icon", "fa fa-eye");
            }
            else if (baseUrl !== redirectedFrom && redirectedFrom !== "") {
                window.location = redirectedFrom;
            }
            else {
                window.location = "/";
            }
        },
        error: function (xhr, status, error) {
        }
    });
    selectionStart = 0;
    selectionEnd = 0;
}


