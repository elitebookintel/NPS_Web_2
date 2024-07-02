$(document).ready(function () {
    changeTitle(formatMessage('Login')  + ' | NPS Portal');
})

function changePasswordMode() {
    var passwordEditor = $("#Input_Password").dxTextBox("instance");
    var buttonEditor = $("#passwordButton").dxButton("instance");
    passwordEditor.option("mode", passwordEditor.option("mode") === "text" ? "password" : "text");
    buttonEditor.option("icon", buttonEditor.option("icon") === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash");
} 


function changePasswordMode_OldPassword() {
    var passwordEditor = $("#OldPassword").dxTextBox("instance");
    var buttonEditor = $("#passwordButton_OldPassword").dxButton("instance");
    passwordEditor.option("mode", passwordEditor.option("mode") === "text" ? "password" : "text");
    buttonEditor.option("icon", buttonEditor.option("icon") === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash");
} 

function changePasswordMode_NewPassword() {
    var passwordEditor = $("#NewPassword").dxTextBox("instance");
    var buttonEditor = $("#passwordButton_NewPassword").dxButton("instance");
    passwordEditor.option("mode", passwordEditor.option("mode") === "text" ? "password" : "text");
    buttonEditor.option("icon", buttonEditor.option("icon") === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash");
} 

function changePasswordMode_ConfirmPassword() {
    var passwordEditor = $("#ConfirmPassword").dxTextBox("instance");
    var buttonEditor = $("#passwordButton_ConfirmPassword").dxButton("instance");
    passwordEditor.option("mode", passwordEditor.option("mode") === "text" ? "password" : "text");
    buttonEditor.option("icon", buttonEditor.option("icon") === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash");
} 


