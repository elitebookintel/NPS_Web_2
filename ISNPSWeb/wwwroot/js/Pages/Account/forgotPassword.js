'use strict'

$(document).ready(function () {
    changeTitle(formatMessage('Forgot_Password_Title') + ' | NPS Portal');
})
function onSubmitClickResetPass(e) {
    e.event.preventDefault();
    var $form = $('form[name="resetPassword"]');
    var url = $form.attr('action');
    var method = $form.attr('method');
    var email = $('input[name="Email"]').val();
    
    $.ajax({
        url: url,
        cache: false,
        type: method,
        dataType: "json",
        data: $form.serialize(),
        success: function (result)
        {      
            if (result.result == 1) {
                Swal.fire(
                    DevExpress.localization.formatMessage('ForgotPasswordSuccessFirstRow'),
                    DevExpress.localization.formatMessage('ForgotPasswordSuccessSecondRow') + ' ' + email,
                    'success'
                ).then(function () {
                    window.location = "/Account/Logout/";
                });
            }
            else if (result.result == 2) {
                Swal.fire(
                    DevExpress.localization.formatMessage('Error'),
                    DevExpress.localization.formatMessage('ForgotPasswordContactAdministrator'),
                    'error'
                );
            }
            else if (result.result == 3) {
                Swal.fire(
                    DevExpress.localization.formatMessage('ForgotPasswordErrorFirstRow'),
                    formatMessage('ForgotPasswordErrorSecondRow'),
                    'error'
                );
            }
            else if (result.result == 4) {
                let editor = $("#Email").dxTextBox("instance");
                editor.option({
                    validationStatus: "invalid",
                    validationErrors: [{ message: result.message }]
                });
            }
        }
    });
}