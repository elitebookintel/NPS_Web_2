'use strict'

var name_dictionary = {};
var Lang_curent

function onSubmitGroupClick(e, curent_lang, info_oprostnik) {

    if (Lang_curent == undefined || Lang_curent == null) {
        Lang_curent = curent_lang;
    }
    e.event.preventDefault();
    var isgrid = $("#gridOprostnik")
    if (isgrid.length > 0) var gridId = "gridOprostnik"; else var gridId = null;
    var $form = $('form[name="addOprostnik"]');
    var url = $form.attr('action');
    var modal = '#lgModalBody';

    var result = Validation_Oprostnik_Save()
    if (result !== false) {
        var array_key = ["RU", "EN", "RO"];
        name_dictionary[Lang_curent] = result;
        if (info_oprostnik !== null) {
            for (var i = 0; i < array_key.length; i++) {
                var key = array_key[i];
                if (info_oprostnik.hasOwnProperty(key) && !name_dictionary.hasOwnProperty(key) && info_oprostnik[key] !== null) {
                    name_dictionary[key] = info_oprostnik[key].trim();
                }
            }
        }
        var formdata = {};
        var textBoxElement = $("#Oid");
        var textBoxInstance = textBoxElement.dxTextBox("instance");
        var Oid = textBoxInstance.option('value');
        formdata.Oid = Oid;
        formdata.Name = name_dictionary;
        var url_get = '/Oprostnik_API/Oprostnik_List';
        ISNPS.ajaxPOST(url, formdata, modal, gridId, true, url_get);

        var oprostnik_name = $("[id*=Oprostnik_name_]");
        if (oprostnik_name.length > 0) {
            var fullId = $(oprostnik_name).attr("id");
            var curentlang = fullId.split("_");
            curentlang = curentlang[2];
            oprostnik_name.text(name_dictionary[curentlang]);
        }
        Lang_curent = null;
    }
}

function onLanguage_Oprostnik(e, lang_button, lang_prev, name_button_lang) {
    var textBoxElement = $("#Language_Question_div");
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var lang = textBoxInstance.option('value');
    Lang_curent = lang_button;
    var result = Validation_Oprostnik()
    name_dictionary[lang] = result.trim();
    var Name_textbox = $("#Name").dxTextBox("instance");
    var readonly = Name_textbox.option("readOnly");
    var Name_Oprostnik = $("#Name_Oprostnik").empty();

    if (name_button_lang != null) {
        var name_Oprostnik_textbox = $('<div id="Name">').dxTextBox({
            id: "Name",
            value: name_button_lang,
            labelMode: 'floating',
            label: formatMessage("Name_Questionnaire"),
            name: "Name",
            visible: true,
            readOnly: readonly,
        });
        Name_Oprostnik.append(name_Oprostnik_textbox[0]);
    }
    var type_button = "success";

    if (name_dictionary.length > 0 && name_dictionary.hasOwnProperty(lang)) type_button = "normal";
    if (name_dictionary[lang] == "" || name_dictionary[lang] == null) type_button = "normal";
    var Language_Oprostnik = $("#Language_" + lang + "_Oprostnik").empty();
    var Language_Button = $('<div id="Language_' + lang + '">').dxButton({
        id: 'Language_' + lang,
        text: lang,
        icon: '/assets/images/Flag_' + lang + '.png',
        type: type_button,
        stylingMode: 'contained',
        onClick: function (e) {
            onLanguage_Oprostnik(e, lang, lang_prev, name_dictionary[lang]);
        },
        visible: true,
        disabled: false
    });
    Language_Oprostnik.append(Language_Button[0])

    name_dictionary[lang] = result;

    var curent_button = $("#Language_" + lang_button).dxButton("instance");
    var type_button = curent_button.option('type');

    var Language_Oprostnik_curent = $("#Language_" + lang_button + "_Oprostnik").empty();
    var Language_Button_curent = $('<div id="Language_' + lang_button + '">').dxButton({
        id: 'Language_' + lang_button,
        text: lang_button,
        icon: '/assets/images/Flag_' + lang_button + '.png',
        type: type_button,
        stylingMode: 'contained',
        onClick: function (e) {
            onLanguage_Oprostnik(e, lang, lang_prev, name_button_lang);
        },
        visible: true,
        disabled: true
    });
    Language_Oprostnik_curent.append(Language_Button_curent[0])

    var Language_Question = $('#Language').empty();
    var Language_Question_textBox = $('<div id="Language_Question_div">').dxTextBox({
        inputAttr: { 'id': ' Language_Question' },
        labelMode: 'floating',
        label: ' Language_Question',
        name: ' Language_Question',
        id: ' Language_Question',
        visible: false,
        readOnly: false,
        value: lang_button
    });
    Language_Question.append(Language_Question_textBox[0]);
}

function Validation_Oprostnik() {
    var textBoxElement = $("#Name");
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var value_name = textBoxInstance.option('value');
    if (value_name !== "" && value_name !== undefined && value_name !== null) {
        value_name = value_name.trim();
        textBoxInstance.option('value', value_name);
    }
    textBoxInstance.option({
        isValid: true,
        validationError: null
    });
    if ((value_name == "" || value_name == null)) {
        return value_name = "";
    }
    else return value_name;
}

function Validation_Oprostnik_Save() {
    var textBoxElement = $("#Name");
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var value_name = textBoxInstance.option('value')
    if (value_name !== "" && value_name !== undefined && value_name !== null) {
        value_name = value_name.trim();
        textBoxInstance.option('value', value_name)
    }

    var readOnly_text_box = textBoxInstance.option('readOnly')
    textBoxInstance.option({
        isValid: true,
        validationError: null
    });
    if ((value_name == "" || value_name == null) && !readOnly_text_box) {
        textBoxInstance.option({
            isValid: false,
            validationError: { message: formatMessage('Field_not_empty') }
        });
        return false;
    }
    return value_name;
}