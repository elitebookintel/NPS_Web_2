'use strict'

var name_dictionary = {};
var Lang_curent;
function onSubmitGroupClick(e, curent_lang, info_oprostnik) {
    
    if (Lang_curent == undefined || Lang_curent == null) {
        Lang_curent = curent_lang;
    }
    e.event.preventDefault();
  /*  var gridId = "gridOprostnik";*/
    var $form = $('form[name="addOprostnik"]');
    var url = $form.attr('action');
    var modal = '#lgModalBody';

    var isgrid = $("#gridOprostnik")
    if (isgrid.length > 0) gridId = "gridOprostnik"; else gridId = null;

    var result = Validation_Oprostnik()
    if (result !== false)
    {
        name_dictionary[Lang_curent] = result;
        var array_key = ["RU", "EN", "RO"];
        name_dictionary[Lang_curent] = result;
        if (info_oprostnik !== null)
        { 
            for (var i = 0; i < array_key.length; i++)
            {
                var key = array_key[i];
                if (info_oprostnik.hasOwnProperty(key) && !name_dictionary.hasOwnProperty(key))
                {
                    name_dictionary[key] = info_oprostnik[key];
                }
            }
        }
        var formdata = {};

        var textBoxElement = $("#Oid");
        var textBoxInstance = textBoxElement.dxTextBox("instance");
        var Oid = textBoxInstance.option('value');

        formdata.Oid = Oid;
        formdata.Name = name_dictionary;
        ISNPS.ajaxPOST(url, formdata, modal, gridId, true);
    }
}

function onLanguage_Oprostnik(e, lang_button, lang_prev, name_button_lang) {
    var textBoxElement = $("#Language_Question_div");
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var lang = textBoxInstance.option('value');
    Lang_curent = lang_button;
    var result = Validation_Oprostnik()
    if (result !== false) {
        var delet_Oprostnik = $("#delet_Oprostnik");
        if (delet_Oprostnik.length > 0) {
            delet_Oprostnik.text(name_button_lang);
        }
        name_dictionary[lang] = result;

        var Name_textbox = $("#Name").dxTextBox("instance");
        var readonly = Name_textbox.option("readOnly");

        var Name_Oprostnik = $("#Name_Oprostnik").empty();
        if (name_button_lang != null)
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

        var type_button = "success";
        if (readonly && name_dictionary[lang] == "") type_button = "normal";

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
    else {

    }
}


function Validation_Oprostnik() {
    var textBoxElement = $("#Name");
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var value_name = textBoxInstance.option('value');
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

function onEditOprostnik()
{
    $('#Button_Edit_Oprostnik').hide();
    $('#Button_Save_Oprostnik').show();
    $('#edit_name_oprostnik').show();
}
function editButtonClicked(Oid, name_Oprostnik)
{
    var modal = '#lgModalBody';
    ISNPS.DrawPartialModal("/Question/OprostnikID/" + Oid + "/" + name_Oprostnik, "lgModalBody");
}
function onSaveOprostnik() {
    var newValue = $('#txtHeader').val();
    var Oid = $('#propertyOidOprostni').val(); 
    var originalValue = $('#originalValue').val();

    var url = "/Question/Edit_Tittle_Oprostnik/" + Oid + "/" + newValue;
    if (newValue !== originalValue)
    {
        $.ajax({
            url: url,
            cache: false,
            type: "GET",
            dataType: "html",
            success: function (data) {
                $('#header').text(newValue);
                $('#txtHeader').replaceWith('<h3 id="header" class="text-decoration-underline">' + newValue + '</h3>');
                $('#Button_Edit_Oprostnik').show();
                $('#Button_Save_Oprostnik').hide();
            },
            error: function () {
                console.error('Ошибка при сохранении данных');
            }
        });
    }
    else {
        $('#header').replaceWith('<h3 id="header" class="text-decoration-underline">' + originalValue + '</h3>');
        $('#Button_Edit_Oprostnik').show();
        $('#Button_Save_Oprostnik').hide();
        }
    }
