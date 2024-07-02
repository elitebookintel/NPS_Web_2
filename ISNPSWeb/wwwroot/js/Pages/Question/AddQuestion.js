var GradingType = {
    "Yes/No": 1,
    "10-point rating system": 2,
    "Single answer variant": 3,
    "Multiple answer variant": 4,
    "5-point rating system": 5,

    "Da/Nu": 1,
    "Sistem de evaluare cu 10 puncte": 2,
    "Varianta cu un singur răspuns": 3,
    "Varianta cu răspunsuri multiple": 4,
    "Sistem de evaluare în 5 puncte": 5,

    "Да/Нет": 1,
    "10-балльная система оценок": 2,
    "Вариант с одним ответом": 3,
    "Вариант с несколькими ответами": 4,
    "5-балльная система оценок": 5,

    YesNo: 1,
    Point10Score: 2,
    SingleAnswerVariant: 3,
    MultipleAnswerVariant: 4,
    Point5Score: 5
}
function Edit_Language_Button(lang, buttonId, text, isDisabled, type, question_info) {
    var width = window.innerWidth <= 365 ? 30 : "";
    var height = window.innerWidth <= 365 ? 30 : "";
    var text_button = window.innerWidth < 800 ? "" : text;
    var lang_id_button = `Language_${lang}_Question_${buttonId}`;

    var textBoxElement = $("#Language_Question_" + buttonId);
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var lang_prev = textBoxInstance.option('value');

    if (type === undefined) {
        var type = $('#Language_' + lang + "_" + buttonId).dxButton("instance").option("type");
    }

    var Language = $(`#${lang_id_button}`).empty();
    var Language_Button = $(`<div id="Language_${lang}_${buttonId}">`).dxButton({
        id: `Language_${lang}_${buttonId}`,
        text: text_button,
        width: width,
        height: height,
        icon: `/assets/images/Flag_${lang}.png`,
        type: type,
        stylingMode: 'contained',
        onClick: function (e) {
            onLanguage_Questions(e, lang, lang_prev, question_info);
        },
        visible: true,
        disabled: isDisabled
    });
    Language.append(Language_Button.get(0));
}

var prev_question_info;
var class_body;
var isbutton_click = false;
$(document).ready(function () {
    $(".vertical-menu-btn").on("click", function () {
        class_body = $("body")[0].className;
        if (class_body !== null || class_body !== undefined || class_body !== "") {
            isbutton_click = true;
            Edit_button();
        }
        if (isbutton_click = true) {
            $('body').attr("class", class_body);
            isbutton_click = false;
        }
    });
    Sticky_container_heading();
});

$(function () {
    Edit_button();
})

function Edit_button() {
    var width_tasks__item = $(".tasks__item")
    if (width_tasks__item.length > 0) {
        width_tasks__item = width_tasks__item[0].offsetWidth;
    }

    if (window.innerWidth > 554)
        $(".AddButonFixed").css("width", ((width_tasks__item)) + "px");
    else {
        $(".AddButonFixed").css("width", ((width_tasks__item)) + "px");
    }

    var class_body = $("body")[0].className;
    if (window.innerWidth <= 992 && window.innerWidth >= 648) {
        $('body').attr("class", "sidebar-enable vertical-collpsed");
    }
    else {
        $('body').attr("class", class_body);
    }
    if (window.innerWidth <= 647 && !isbutton_click === true) {
        $('body').attr("class", "");
        isbutton_click = false;
    }

    //width_card_body = $("#bodyContent")[0].offsetWidth;

    var width_card_body = $("#bodyContent")
    if (width_card_body.length > 0) {
        width_card_body = width_card_body[0].offsetWidth;
    }
    if (width_card_body < 755) {
        var elements = document.querySelectorAll('[id*="Language_"][role="button"]');
        elements.forEach(function (element) {
            var id = element.parentElement.id.split("_");
            if (id[2] !== "Oprostnik") {
                var instance = $(element).dxButton("instance");
                instance.option("text", "");
            }
        });

        if (window.innerWidth > 499) {
            var elements = document.querySelectorAll('[id*="Delet_Question_"][role="button"]');
            elements.forEach(function (element) {
                var instance = $(element).dxButton("instance");
                instance.option("text", "");
            });
            var elements = document.querySelectorAll('[id*="Statistica_"][role="button"]');
            elements.forEach(function (element) {
                var instance = $(element).dxButton("instance");
                instance.option("text", "");
            });
        }
        var elements = document.querySelectorAll('[id*="Delet_Answert_Question_"]');
        elements.forEach(function (element) {
            var instance = $(element.children[0]).dxButton("instance");
            instance.option("text", "");
        });
    }
    else {
        var elements = document.querySelectorAll('[id*="Language_"][role="button"]');
        elements.forEach(function (element) {
            var id_parents = element.parentElement.id.split("_");
            if (id_parents[2] !== "Oprostnik") {
                var id = element.id.split("_");
                var id = id[1];
                var instance = $(element).dxButton("instance");
                instance.option("text", id);
            }
        });

        var elements = document.querySelectorAll('[id*="Statistica_"][role="button"]');
        elements.forEach(function (element) {
            var instance = $(element).dxButton("instance");
            instance.option("text", formatMessage('Statistics'));
        });
        var elements = document.querySelectorAll('[id*="Delet_Question_"][role="button"]');
        elements.forEach(function (element) {
            var instance = $(element).dxButton("instance");
            instance.option("text", formatMessage('Delet'));
        });

        var elements = document.querySelectorAll('[id*="Delet_Answert_Question_"]');
        elements.forEach(function (element) {
            var instance = $(element.children[0]).dxButton("instance");
            instance.option("text", formatMessage('Delet'));
        });
    }

    if (window.innerWidth <= 499) {
        var elements = document.querySelectorAll('[id*="Delet_Question_"][role="button"]');
        elements.forEach(function (element) {
            var instance = $(element).dxButton("instance");
            instance.option("text", formatMessage('Delet'));
        });

        var elements = document.querySelectorAll('[id*="Statistica_"][role="button"]');
        elements.forEach(function (element) {
            var instance = $(element).dxButton("instance");
            instance.option("text", formatMessage('Statistics'));
        });

        if (window.innerWidth <= 365) {
            var elements = document.querySelectorAll('[id*="Language_"][role="button"]');
            elements.forEach(function (element) {
                var id = element.id.split("_");
                if (id.length > 2) {
                    var instance = $(element).dxButton("instance");
                    instance.option("width", 30);
                    instance.option("height", 30);
                }
            });
        } else {
            var elements = document.querySelectorAll('[id*="Language_"][role="button"]');
            elements.forEach(function (element) {
                var id = element.id.split("_");
                if (id.length > 2) {
                    var instance = $(element).dxButton("instance");
                    instance.option("width", "");
                    instance.option("height", "");
                }
            });
        }
    }
}

function Sticky_container_heading() {
    var element = document.getElementById('sticky-container-2');
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var scrollLimit = 115;
    if (window.innerWidth < 499) {
        scrollLimit = 90;
    }
    var AddQuestionButton_clone = $("#AddQuestionButton_clone").dxButton("instance");
    var width_tasks__item = $(".tasks__item");

    if (width_tasks__item.length > 0) {
        width_tasks__item = width_tasks__item[0].offsetWidth;

        if (scrollPosition > scrollLimit) {
            AddQuestionButton_clone.option("visible", true);
            element.style.position = 'fixed';
            element.style.top = '4.2rem';
            element.style.zIndex = '101';
            element.style.padding = "10px 0px";
            if (window.innerWidth > 554) {
                $(".AddButonFixed").css("width", width_tasks__item + "px");
            }
        } else {
            AddQuestionButton_clone.option("visible", false);
            element.style.position = 'relative';
            element.style.padding = "0px 0px";
        }
    }
}

window.addEventListener('scroll', function () {
    Sticky_container_heading();
});

window.addEventListener('resize', function () {
    Edit_button();
});

var curentlang;

var shortestArrayKeys = [];

var dictionary_Question = {};

var dictionary_Comentory = {};
var dictionary_GradingType_Question;
var dictionary_Response_list = {};
var e_prev;
var countidAnswert = 0;
var curent_Language_input;
var lang_global;
var emty_answert = {};


var temp_answert_empty = {};
var temp_Questiom = {};
var temp_Comentary = {}

var isCahnge_GradingType_Question = false;
var QuestionId_One = -1;

var translations = {
    "EN": {
        YesNo: "Yes/No",
        Point10Score: "10-point rating system",
        SingleAnswerVariant: "Single answer variant",
        MultipleAnswerVariant: "Multiple answer variant",
        Point5Score: "5-point rating system"
    },
    "RO": {
        YesNo: "Da/Nu",
        Point10Score: "Sistem de evaluare cu 10 puncte",
        SingleAnswerVariant: "Varianta cu un singur răspuns",
        MultipleAnswerVariant: "Varianta cu răspunsuri multiple",
        Point5Score: "Sistem de evaluare în 5 puncte"
    },
    "RU": {
        YesNo: "Да/Нет",
        Point10Score: "10-балльная система оценок",
        SingleAnswerVariant: "Вариант с одним ответом",
        MultipleAnswerVariant: "Вариант с несколькими ответами",
        Point5Score: "5-балльная система оценок"
    }
};

function onStatistica_Questions(question_Id, lang, GradingType_2, name_Question) {
    var modal = 'lgModalBody';
    var name;
    
    if (name_Question[lang] !== "") name = name_Question[lang];
    else {
        ['EN', 'RU', 'RO'].forEach(lang_ => {
            if (name_Question[lang_] !== "") {
                name = name_Question[lang_];
            }
        });
    }
    ISNPS.DrawPartialModal("/Question/Statistica/" + question_Id + "/" + lang + "/" + GradingType + "/" + name, modal);
}

function onDeletQuestions(questionId, lang_delet, name_Question) {
    ISNPS.LargeModal();
    var modal = '#lgModalBody';
    var name;
    if (name_Question[lang] !== "") name = name_Question[lang];
    else {
        ['EN', 'RU', 'RO'].forEach(lang => {
            if (name_Question[lang !== ""]) {
                name = name_Question[lang];
            }
        });
    }
    ISNPS.ajaxGET("/Question/Get_Question_Delet/" + parseInt(questionId) + "/" + lang_delet + "/" + name, modal);
}
function POST_UP_Down_Question(questionId, valueOfTextBoxInDiv) {
    var url = "/Question_API/Question/" + questionId;
    ISNPS.ajaxGET_Question(url, valueOfTextBoxInDiv)
}


function onAddQuestions(QuestionnaireId, curentlang_input) {
    lang_global = curentlang_input;
    curentlang = curentlang_input;
    curent_Language_input = curentlang_input;
    var nextH3Elements = document.querySelectorAll('.tasks__list');
    nextH3Elements = nextH3Elements[0];
    if (QuestionId_One == -1) {
        QuestionId_One = undefined;
    }
    var lastTasksItem = document.querySelectorAll('.tasks__item');
    lastTasksItem = lastTasksItem[lastTasksItem.length - 1]
    var lastQuestionId;

    if (lastTasksItem !== undefined) {
        var lastQuestionElement = lastTasksItem.querySelector('[id*="Index_Question_value_"]');
        if (lastQuestionElement !== null) {
            var value_index = lastQuestionElement.innerText.split(" ");
            if (isNaN(parseInt(value_index[1]))) {
                lastQuestionId = parseInt(value_index[2]) + 1;
            } else lastQuestionId = parseInt(value_index[1]) + 1;
        }
    } else {
        lastQuestionId = 1;
    }

    var divElement = nextH3Elements;
    var inputElementcount = document.querySelectorAll('[name^="editQuestion_"]').length;
    var inputaddQuestion = document.querySelectorAll('[name^="addQuestion"]').length;
    if (inputElementcount == 0 && inputaddQuestion == 0) {
        QuestionId_One = undefined;
        if (nextH3Elements != null) {
            var formElement = document.createElement("form");
            formElement.className = "card card-body";
            formElement.name = "addQuestion";
            formElement.id = "addQuestion";
            formElement.action = "/Question/POST_Upsert_Question";
            formElement.method = "POST";
            formElement.autocomplete = "off";
            formElement.style = "background-color: #E3F0EA"
            var div_container = document.createElement('div');
            div_container.className = 'container';
            div_container.style = "margin-left: 0";
            formElement.appendChild(div_container);

            var div_row = document.createElement('div');
            div_row.className = 'flex-container align-items-center';
            div_row.style = "justify-content: flex-start;";
            div_container.append(div_row);

            var div_Col_Index_Question_value_ = document.createElement('div');
            div_row.append(div_Col_Index_Question_value_);

            var h3 = document.createElement('h3');
            h3.id = 'Index_Question_value_' + lastQuestionId;
            h3.style = "white-space: nowrap";
            h3.textContent = formatMessage('Question') + " " + lastQuestionId;
            div_Col_Index_Question_value_.appendChild(h3);
            function AddLanguageButton(langCode, langName, iconPath, isActive) {
                var colLanguage = document.createElement('div');
                var width_card_body = $("#bodyContent")
                if (width_card_body.length > 0) {
                    width_card_body = width_card_body[0].offsetWidth;
                }
                if (width_card_body < 706) {
                    var text_button = ""
                } else {
                    var text_button = langName;
                }
                div_row.append(colLanguage);
                var isDisabled = !isActive;
                var languageButton = $('<div id="Language_' + langCode + '">').dxButton({
                    id: 'Language_' + langCode,
                    text: text_button,
                    icon: iconPath,
                    type: 'normal',
                    stylingMode: 'contained',
                    disabled: isDisabled,
                    onClick: function (e) {
                        onLanguage_Questions(e, langCode, curentlang, null);
                    },
                    visible: true
                });
                colLanguage.appendChild(languageButton.get(0));
            }

            AddLanguageButton("EN", "EN", "/assets/images/Flag_EN.png", curentlang !== "EN");
            AddLanguageButton("RU", "RU", "/assets/images/Flag_RU.png", curentlang !== "RU");
            AddLanguageButton("RO", "RO", "/assets/images/Flag_RO.png", curentlang !== "RO");

            Generating_input_fields(formElement, lastQuestionId);

            countidAnswert = 0;
            var divButton_Question = document.createElement('div');
            divButton_Question.id = 'Button_Question';
            divButton_Question.className = 'modal-footer';

            var cancelButton = $('<div>').dxButton({
                icon: "revert",
                id: 'Esc' + countidAnswert,
                text: formatMessage('Cancel'),
                type: 'normal',
                onClick: onESCQuestionClick,
            });
            var saveButton = $('<div>').dxButton({
                icon: "save",
                text: formatMessage('Save'),
                type: 'success',
                onClick: function () {
                    onSaveQuestionClick(QuestionnaireId, lastQuestionId);
                }
            });
            divButton_Question.append(cancelButton[0]);
            divButton_Question.append(saveButton[0]);
            formElement.append(divButton_Question);
            divElement.append(formElement);
            var el = document.querySelector('[name^="addQuestion"]');
            if (el !== null) {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "end"
                });
            }
        }
    } else {
        var form = document.querySelectorAll('[name^="editQuestion_"]');
        if (form.length !== 0) {
            Element_notify(form[0].parentElement.parentElement);
        } else {
            form = document.querySelectorAll('[name^="addQuestion"]');
            Element_notify(form[0]);
        }
    }
}
function onESCQuestionClick() {

    var inputElement = document.querySelector('form');
    if (inputElement != null) {
        inputElement.remove();
        Tittle = null;
        Comentary = null;
        countidAnswert = 0;
        dictionary_Response_list = {};
        dictionary_Comentory = {};
        dictionary_Question = {};
        dictionary_GradingType_Question = null;
        shortestArrayKeys = [];
        emty_answert = {};
        temp_answert_empty = {};
        temp_Questiom = {};
        temp_Comentary = {}
        isCahnge_GradingType_Question = false;
        QuestionId_One = -1;
    }
}

function onEscEditClick(questionId, curent_lang) {
    var inputElement = document.querySelector('form');
    // var inputElement = document.getElementsByName("editQuestion_" + questionId);
    if (inputElement != null) {
        var li_Element = inputElement.parentElement.parentElement;
        li_Element.style.backgroundColor = "#f9f9f9";
        var newDiv = document.createElement("div");
        newDiv.id = "input_Question_" + questionId;
        while (inputElement.firstChild) {
            newDiv.appendChild(inputElement.firstChild);
        }
        inputElement.parentNode.replaceChild(newDiv, inputElement);

        var Language_ = $('#Language_' + questionId).empty();
        var Language_Question_ = $('<div id="Language_Question_' + questionId + '">').dxTextBox({
            inputAttr: { 'id': 'Language_Question_' },
            labelMode: 'floating',
            label: 'Language_Question',
            name: 'Language_Question',
            id: 'Language_Question_' + questionId,
            visible: false,
            readOnly: true,
            value: curent_lang
        });
        Language_.append(Language_Question_[0]);

        var url = "/Question_API/Question/" + questionId;

        ISNPS.ajaxGET_Question_Info(url, questionId, curent_lang)

        Tittle = null;
        prev_question_info = null;
        Comentary = null;
        countidAnswert = 0;
        dictionary_Response_list = {};
        dictionary_Comentory = {};
        dictionary_Question = {};
        dictionary_GradingType_Question = null;
        shortestArrayKeys = [];
        emty_answert = {};
        temp_answert_empty = {};
        temp_Questiom = {};
        temp_Comentary = {};
        QuestionId_One = -1;
    }
}

function createLanguageButton(langCode, langName, iconPath, type, onClickFunction, disabled) {
    if (window.innerWidth < 884) {
        var text_button = ""
    } else {
        var text_button = langName;
    }
    var element = $("#Language_" + langCode);
    var parentElement = element.parent();
    element.remove();
    var addButton = $('<div id="Language_' + langCode + '">').dxButton({
        id: 'Language_' + langCode,
        text: text_button,
        icon: iconPath,
        type: type,
        stylingMode: 'contained',
        onClick: onClickFunction,
        visible: true,
        disabled: disabled
    });
    parentElement.append(addButton.get(0));
}

function onSaveQuestionClick(QuestionnaireId, index_Question) {
    var textBoxElement = $("#Language_Question_div");
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    lang = textBoxInstance.option('value');
    curent_Language_input = lang;
    var $form = $('form[name="addQuestion"]');
    var url = $form.attr('action');
    var formData = {
        Command: {
            Questions: [],
            BaseQueryModel: {}
        },
    };
    var question_item = {};
    var ResponseVariants = [];
    var isbool = false;

    var $form = $('form[name="addQuestion"]');

    var prev_dictionary_GradingType_Question = dictionary_GradingType_Question;
    var isChange_GradingType = false;

    var Index_Question = $("#Index_Question").children();
    var Index_Question = $(Index_Question[0]).dxTextBox("instance");
    var set_index = parseInt(Index_Question.option("value"));

    function Validation(Field_div) {
        Field_div.option({
            isValid: true,
            validationError: null,
        });
        if (value = "") {
            Field_div.option({
                isValid: false,
                validationError: { message: formatMessage('Field_not_empty') }
            });
            isbool = true;
        }
    }

    var Tittle_Question = $("#Tittle_Question").children();
    var Tittle_Question = $(Tittle_Question[0]).dxTextBox("instance");
    dictionary_Question[curent_Language_input] = Tittle_Question.option("value");
    Validation(Tittle_Question);

    var Comentary_Question = $("#Comentary_Question").children();
    var Comentary_Question = $(Comentary_Question[0]).dxTextArea("instance");
    dictionary_Comentory[curent_Language_input] = Comentary_Question.option("value");

    $form.find('input, textarea').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (!name) {
            return;
        }
        if (name.includes("Answert_Question_")) {
            var count_answert_input = name.split("_")
            count_answert_input = count_answert_input[2];
        }
        switch (name) {
            case "Index_Question":
                set_index = parseInt(value)
                break;
            case "Tittle_Question":
                dictionary_Question[curent_Language_input] = value;
                var Tittle_Question = $("#Tittle_Question").children();
                var Tittle_Question = $(Tittle_Question[0]).dxTextBox("instance");
                Tittle_Question.option({
                    isValid: true,
                    validationError: null,
                });
                if (value == "") {
                    Tittle_Question.option({
                        isValid: false,
                        validationError: { message: formatMessage('Field_not_empty') }
                    });
                    isbool = true;
                }
                break;
            case "Comentary_Question":
                dictionary_Comentory[curent_Language_input] = value;
                var Comentary_Question = $("#Comentary_Question").children();
                var Comentary_Question = $(Comentary_Question[0]).dxTextArea("instance");
                break;
            case "GradingType_Question":
                var GradingType_Question = $("#GradingType_Question").children();
                var GradingType_Question = $(GradingType_Question[0]).dxSelectBox("instance");

                GradingType_Question.option({
                    isValid: true,
                    validationError: null
                });
                if (value == "" || isNaN(value)) {
                    GradingType_Question.option({
                        isValid: false,
                        validationError: { message: formatMessage('Select_one_proposed') }
                    });
                    isbool = true;
                }

                if ((prev_dictionary_GradingType_Question == 3 || prev_dictionary_GradingType_Question == 4) &&
                    (dictionary_GradingType_Question == 3 || dictionary_GradingType_Question == 4)) {
                } else {
                    isChange_GradingType = true;
                }

                if (!isbool) dictionary_GradingType_Question = value;
                break;
            case "Answert_Question_" + count_answert_input:
                {
                    var responseVariants = {};
                    responseVariants = value.trim();

                    var Answert_Question_ = $("#Answert_Question_" + count_answert_input)

                    Answert_Question_ = Answert_Question_.children();

                    var Answert_Question = $(Answert_Question_[0]).dxTextBox("instance");
                    Answert_Question.option({
                        isValid: true,
                        validationError: null
                    });
                    if (value == "") {
                        Answert_Question.option({
                            isValid: false,
                            validationError: { message: formatMessage('Field_not_empty') }
                        });
                        isbool = true;
                    }
                    ResponseVariants.push(responseVariants);
                    ++count_answert_input;
                    break;
                }
        }
    });

    if (isbool) { return false }
    var element = $("#Language_" + curentlang);
    var parent_Element = element.parent();
    element.remove();

    if (window.innerWidth < 884) {
        var text_button = ""
    } else {
        var text_button = curentlang;
    }
    var AddLanguage_Eng_Button = $('<div id="Language_' + curentlang + '">').dxButton({
        id: 'Language_' + curentlang,
        text: text_button,
        icon: '/assets/images/Flag_' + curentlang + '.png',
        type: 'success',
        stylingMode: 'contained',
        onClick: function (e) {

            onLanguage_Questions(e, curentlang, curentlang, null);
        },
        visible: true,
        disabled: true,
    });

    parent_Element.append(AddLanguage_Eng_Button.get(0));

    dictionary_Response_list[curent_Language_input] = ResponseVariants;

    ['EN', 'RU', 'RO'].forEach(lang => {
        if (!dictionary_Question.hasOwnProperty(lang)) {
            dictionary_Question[lang] = "";
        }
        if (!dictionary_Comentory.hasOwnProperty(lang)) {
            dictionary_Comentory[lang] = "";
        }
    });

    question_item.id = 0;
    question_item.questionnaireId = QuestionnaireId;
    question_item.question = JSON.stringify(dictionary_Question);
    question_item.gradingType = dictionary_GradingType_Question;

    question_item.comentary = JSON.stringify(dictionary_Comentory);
    question_item.index = set_index;
    question_item.createData = null;

    var shortestArrayKeys = [];
    if (dictionary_GradingType_Question == 3 || dictionary_GradingType_Question == 4) {
        var ResponseVariants = [];
        var lengthValues = {};

        for (var key in dictionary_Response_list) {
            if (dictionary_Response_list.hasOwnProperty(key)) {
                lengthValues[key] = dictionary_Response_list[key].length;
            }
        }
        var maxVal = Math.max(...Object.values(lengthValues));
        var shortestArrayKeys = Object.keys(lengthValues).filter(key => lengthValues[key] < maxVal);

        ['EN', 'RU', 'RO'].forEach(lang => {
            if (!lengthValues.hasOwnProperty(lang) && dictionary_Question[lang] !== "" && dictionary_Comentory[lang] !== "") {
                shortestArrayKeys.push(lang);
            }
        });
    }
    if (shortestArrayKeys.length != 0) {
        for (let i = 0; i < shortestArrayKeys.length; i++) {
            lang = shortestArrayKeys[i];
            var element = $("#Language_" + lang);
            var parent_Element = element.parent();

            var typeButton = "danger";
            var isValidation = true;

            if (curentlang !== lang) {
                parent_Element.append(createLanguageButton(
                    lang,
                    lang,
                    '/assets/images/Flag_' + lang + '.png',
                    typeButton,
                    function (e) {
                        onLanguage_Questions(e, lang, curentlang, null, isValidation);
                    }, false));
            }
        };

        shortestArrayKeys = [];
        return;
    }

    if (dictionary_GradingType_Question == 3 || dictionary_GradingType_Question == 4 || dictionary_GradingType_Question == "3" || dictionary_GradingType_Question == "4") {
        for (let i = 0; i < dictionary_Response_list[curent_Language_input].length; i++) {
            var Response = {
                response: {}
            };
            Response.id = 0;
            Response.questionId = 0;
            for (var key in dictionary_Response_list) {
                Response.response[key] = dictionary_Response_list[key][i] || "";
            }
            ['EN', 'RU', 'RO'].forEach(lang => {
                if (!Response.response.hasOwnProperty(lang)) {
                    Response.response[lang] = "";
                }
            });
            Response.response = JSON.stringify(Response.response);
            ResponseVariants.push(Response);
        }

    }

    question_item.responseVariants = ResponseVariants;

    formData.Command.Questions.push(question_item);
    info_question = {};
    info_question.Question = dictionary_Question;
    info_question.Comentary = dictionary_Comentory;
    info_question.ResponseVariants = dictionary_Response_list;

    ajax_post_question(url, formData, false, curent_Language_input);
    QuestionId_One = -1;
}

function Edit_Language_Button(lang, buttonId, text, isDisabled, type, question_info) {

    var width = window.innerWidth <= 365 ? 30 : "";
    var height = window.innerWidth <= 365 ? 30 : "";
    var text_button = window.innerWidth < 800 ? "" : text;
    var lang_id_button = `Language_${lang}_Question_${buttonId}`;

    var textBoxElement = $("#Language_Question_" + buttonId);
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var lang_prev = textBoxInstance.option('value');

    if (type === undefined) {
        var type = $('#Language_' + lang + "_" + buttonId).dxButton("instance").option("type");
    }

    var Language = $(`#${lang_id_button}`).empty();
    var Language_Button = $(`<div id="Language_${lang}_${buttonId}">`).dxButton({
        id: `Language_${lang}_${buttonId}`,
        text: text_button,
        width: width,
        height: height,
        icon: `/assets/images/Flag_${lang}.png`,
        type: type,
        stylingMode: 'contained',
        onClick: function (e) {
            onLanguage_Questions(e, lang, lang_prev, question_info);
        },
        visible: true,
        disabled: isDisabled
    });

    Language.append(Language_Button.get(0));
}

function onLanguage_Questions(e, lang_next, curentlang_botton, question_info, isvalidation, typу_changed) {
    curent_Language_input = lang_next;
    e_prev = e;
    var button = $(e.element[0]);
    var buttonId = $(button[0]).attr("id").split("_");

    buttonlang = buttonId[1];
    buttonId = buttonId[2];

    if (QuestionId_One == -1) {
        QuestionId_One = buttonId;
    }

    if (buttonId === undefined && QuestionId_One == buttonId) {
        var textBoxElement = $("#Language_Question_div");
        var textBoxInstance = textBoxElement.dxTextBox("instance");
        lang = textBoxInstance.option('value');
        var buttonComponent = e.component
        var buttonId = buttonComponent.option("id");
        buttonId = buttonId.split("_");
        if (buttonId.length != 2) {
            buttonId = buttonId[2];
        } else {
            buttonId = "Creat";
        }
        /*        var buttonType = buttonComponent.option("type");*/
        var formElement = document.querySelector('form');
        if (formElement != null || formElement.length != 0) {
        }
        if (lang in dictionary_Question) {
            delete dictionary_Question[lang];
            delete dictionary_Comentory[lang];

            var new_dictionary_Response_list = {};

            for (var key in dictionary_Response_list) {
                if (dictionary_Response_list.hasOwnProperty(key)) {
                    if (key !== lang) {
                        new_dictionary_Response_list[key] = dictionary_Response_list[key];
                    }
                }
            }
            dictionary_Response_list = new_dictionary_Response_list;
        }
        var field_input = Validation_Add_Question(false);
        var question_empty = examination_file_empty_add(field_input, lang);

        if (!question_empty) {
            field_input = Validation_Add_Question(true);
        }

        if (field_input !== false) {
            var textBoxElement = $("#Language_Question_div");
            var textBoxInstance = textBoxElement.dxTextBox("instance");
            var textBoxValue = textBoxInstance.option('value');

            var element = $("#Language_" + lang_next);
            var type_value = element.dxButton("instance").option("type");
            createLanguageButton(lang_next, lang_next, '/assets/images/Flag_' + lang_next + '.png', "normal", function (e) {
                onLanguage_Questions(e, lang_next, textBoxValue, null);
            }, true);

            ["EN", "RU", "RO"].forEach(lang => {
                if (lang !== textBoxValue && lang !== lang_next) {
                    var element = $("#Language_" + lang);
                    var type_value = element.dxButton("instance").option("type");
                    createLanguageButton(lang, lang, '/assets/images/Flag_' + lang + '.png', type_value, function (e) {
                        onLanguage_Questions(e, lang, textBoxValue, null);
                    }, false);
                }
            })

            var type_button = "success";
            if (question_empty) {
                type_button = "normal";
            }
            createLanguageButton(textBoxValue, textBoxValue, '/assets/images/Flag_' + textBoxValue + '.png', type_button, function (e) {
                onLanguage_Questions(e, textBoxValue, lang_next, null);
            }, false);

            countidAnswert = 0;

            if (!question_empty) {
                if (!(lang in dictionary_Question)) {
                    dictionary_Question[lang] = field_input.Question;
                    dictionary_Comentory[lang] = field_input.Comentary;
                    dictionary_GradingType_Question = field_input.GradingType;

                    if (!(lang in dictionary_Response_list)) {
                        dictionary_Response_list[lang] = [];
                    }
                    $.each(field_input.ResponseVariants, function (index, item) {
                        var dictionary_Response = {};
                        dictionary_Response.Id = 0;
                        dictionary_Response.questionId = 0;
                        dictionary_Response = item;
                        dictionary_Response_list[lang].push(dictionary_Response);
                    });
                }
                else {
                    delete dictionary_Question[lang];
                    delete dictionary_Comentory[lang];
                    delete dictionary_GradingType_Question;

                    var new_dictionary_Response_list = {};

                    for (var key in dictionary_Response_list) {
                        if (dictionary_Response_list.hasOwnProperty(key)) {
                            if (key !== lang) {
                                new_dictionary_Response_list[key] = dictionary_Response_list[key];
                            }
                        }
                    }

                    dictionary_Response_list = new_dictionary_Response_list;

                    dictionary_Question[lang] = field_input.Question;
                    dictionary_Comentory[lang] = field_input.Comentary;
                    dictionary_GradingType_Question = field_input.GradingType;

                    if (!(lang in dictionary_Response_list)) {
                        dictionary_Response_list[lang] = [];
                    }
                    $.each(field_input.ResponseVariants, function (index, item) {
                        var dictionary_Response = {};
                        dictionary_Response.Id = 0;
                        dictionary_Response.questionId = 0;
                        dictionary_Response = item;
                        dictionary_Response_list[lang].push(dictionary_Response);
                    });
                }
            }
            if (buttonId == "Creat") {
                var Language_Question = $('#Language')

                if (dictionary_Question[lang_next] == "") {
                    value_Tittle_Question = null;
                }
                else { value_Tittle_Question = dictionary_Question[lang_next] }
                var Tittle_Question = $('#Tittle_Question').empty();
                var Tittle_Question_textBox = $('<div>').dxTextBox({
                    inputAttr: { 'id': 'Tittle_Question' },
                    labelMode: 'floating',
                    label: DevExpress.localization.formatMessage('Question'),
                    name: 'Tittle_Question',
                    placeholder: DevExpress.localization.formatMessage('Enter_Question'),
                    id: 'Tittle_Question',
                    visible: true,
                    readOnly: false,
                    value: value_Tittle_Question
                });
                Tittle_Question.append(Tittle_Question_textBox[0]);

                if (dictionary_Comentory[lang_next] == "") {
                    value_Comentary_Question = null;
                }
                else { value_Comentary_Question = dictionary_Comentory[lang_next] }

                var Comentary_Question = $('#Comentary_Question').empty();
                var Comentary_Question_textBox = $('<div>').dxTextArea({
                    inputAttr: { 'id': 'Comentary_Question' },
                    labelMode: 'floating',
                    label: DevExpress.localization.formatMessage('Comentary'),
                    name: 'Comentary_Question',
                    placeholder: DevExpress.localization.formatMessage('Enter_Сomment'),
                    id: 'Comentary_Question',
                    visible: true,
                    readOnly: false,
                    value: value_Comentary_Question
                });
                Comentary_Question.append(Comentary_Question_textBox[0]);

                var Language_Question = $('#Language').empty();
                var Language_Question_textBox = $('<div id="Language_Question_div">').dxTextBox({
                    inputAttr: { 'id': ' Language_Question' },
                    labelMode: 'floating',
                    label: ' Language_Question',
                    name: ' Language_Question',
                    id: ' Language_Question',
                    visible: false,
                    readOnly: false,
                    value: lang_next
                });
                Language_Question.append(Language_Question_textBox[0]);

                var YesNo = translations[lang_next].YesNo;
                var Point10Score = translations[lang_next].Point10Score;
                var SingleAnswerVariant = translations[lang_next].SingleAnswerVariant;
                var MultipleAnswerVariant = translations[lang_next].MultipleAnswerVariant;
                var Point5Score = translations[lang_next].Point5Score;

                var GradingType_Question = $('#GradingType_Question').empty();
                var GradingType_Question_SelectBox = $('<div id="GradingType_Question_">').dxSelectBox({
                    inputAttr: { 'id': 'GradingType_Question' },
                    labelMode: 'floating',
                    label: formatMessage('GradingType'),
                    name: 'GradingType_Question',
                    id: 'GradingType_Question_',
                    visible: true,
                    dataSource: [
                        { Id: 1, Name: YesNo },
                        { Id: 2, Name: Point10Score },
                        { Id: 3, Name: SingleAnswerVariant },
                        { Id: 4, Name: MultipleAnswerVariant },
                        { Id: 5, Name: Point5Score }
                    ],
                    displayExpr: "Name",
                    valueExpr: "Id",
                    onValueChanged: function (e) {
                        var selectedId = e.value;

                        if ((selectedId == 3 && dictionary_GradingType_Question == 4) || (selectedId == 4 && dictionary_GradingType_Question == 3)) {
                        } else if (((dictionary_GradingType_Question == 3) && dictionary_GradingType_Question != selectedId) || ((dictionary_GradingType_Question == 4) && dictionary_GradingType_Question != selectedId) && value_Tittle_Question !== undefined) {
                            dictionary_Response_list = {};
                        }
                        if (selectedId === 3 || selectedId === 4) {
                            var List_Answert_Question = $('#List_Answert_Question');
                            if (List_Answert_Question.length == 0) {
                                var divList_Answert_Question = document.createElement('div');
                                divList_Answert_Question.id = 'List_Answert_Question';

                                var h3 = document.createElement('h3');
                                h3.id = 'h3_Answert_Question';
                                h3.textContent = formatMessage('GradingType'),
                                    divList_Answert_Question.appendChild(h3);

                                var divButtonAdd_Answert_Question = document.createElement('div');
                                divButtonAdd_Answert_Question.id = 'ButtonAdd_Answert_Question';
                                var ButtonAdd_Answert = $('<div>').dxButton({
                                    text: formatMessage('Add_Answer'),
                                    type: 'normal',
                                    icon: "plus",
                                    onClick: function () {
                                        var $elements = $('[id^="Answert_Question_"]');
                                        var $lastElement = $elements.last();
                                        var lastElementId = $lastElement.attr('id');
                                        var split = lastElementId.split("_");
                                        countidAnswert_split = split[2];
                                        createAnswerRow(++countidAnswert_split, divList_Answert_Question, null, curentlang);
                                    }
                                });
                                divButtonAdd_Answert_Question.append(ButtonAdd_Answert[0]);
                                divList_Answert_Question.append(divButtonAdd_Answert_Question);

                                var firstElement = '';
                                var lastElement = '';
                                if (dictionary_Response_list[lang_next] && Array.isArray(dictionary_Response_list[lang_next]) && dictionary_Response_list[lang_next].length > 0) {
                                    firstElement = dictionary_Response_list[lang_next][0] || '';
                                    lastElement = dictionary_Response_list[lang_next][1] || '';
                                }

                                var divTextBox_Answert_Question = document.createElement('div');
                                divTextBox_Answert_Question.id = 'Answert_Question_' + countidAnswert;
                                var textBoxAnswert = $('<div>').dxTextBox({
                                    inputAttr: { 'id': 'Answert_Question_' + countidAnswert },
                                    labelMode: 'floating',
                                    label: formatMessage('Answert_Response'),
                                    name: 'Answert_Question_' + countidAnswert,
                                    id: 'Answert_Question_' + countidAnswert,
                                    visible: true,
                                    readOnly: false,
                                    value: firstElement
                                });

                                divTextBox_Answert_Question.append(textBoxAnswert[0]);
                                divList_Answert_Question.append(divTextBox_Answert_Question);
                                countidAnswert++;

                                var divTextBox_Answert_Question = document.createElement('div');
                                divTextBox_Answert_Question.id = 'Answert_Question_' + countidAnswert;
                                var textBoxAnswert = $('<div>').dxTextBox({
                                    inputAttr: { 'id': 'Answert_Question_' + countidAnswert },
                                    labelMode: 'floating',
                                    label: formatMessage('Answert_Response'),
                                    name: 'Answert_Question_' + countidAnswert,
                                    id: 'Answert_Question_' + countidAnswert,
                                    visible: true,
                                    readOnly: false,
                                    value: lastElement
                                });

                                divTextBox_Answert_Question.append(textBoxAnswert[0]);
                                divList_Answert_Question.append(divTextBox_Answert_Question);

                                GradingType_Question_SelectBox.after(divList_Answert_Question);

                                if (dictionary_Question[lang_next] == "") {
                                    isvalidation = false;
                                }

                                if (isvalidation && firstElement == "") {
                                    var divTextBox_Answert_Question = $('#Answert_Question_' + countidAnswert);
                                    var children = divTextBox_Answert_Question.children();
                                    var textBoxInstance = children.dxTextBox("instance");
                                    textBoxInstance.option({
                                        isValid: false,
                                        validationError: { message: formatMessage('Field_not_empty') }
                                    });
                                }
                                if (isvalidation && lastElement == "") {
                                    var divTextBox_Answert_Question = $('#Answert_Question_' + (countidAnswert - 1));
                                    var children = divTextBox_Answert_Question.children();
                                    var textBoxInstance = children.dxTextBox("instance");
                                    textBoxInstance.option({
                                        isValid: false,
                                        validationError: { message: formatMessage('Field_not_empty') }
                                    });
                                }
                            }
                        } else {
                            $('#List_Answert_Question').remove();
                        }
                    }
                });
                GradingType_Question.append(GradingType_Question_SelectBox[0]);

                var initialValue = parseInt(dictionary_GradingType_Question, 10);
                GradingType_Question_SelectBox.dxSelectBox("instance").option("value", initialValue);
                var divList_Answert_Question = document.getElementById('List_Answert_Question');

                if (dictionary_GradingType_Question == "3" || dictionary_GradingType_Question == "4") {
                    var countidAnswert_curent_lang = 2;
                    var maxCount = 0;

                    for (var langKey in dictionary_Response_list) {
                        if (dictionary_Response_list[langKey].length > maxCount) {
                            maxCount = dictionary_Response_list[langKey].length;
                            maxLang = langKey;
                        }
                    }

                    if (lang_next in dictionary_Question) {

                        var bool = false;
                        if (lang_next && dictionary_Response_list[lang_next]) {
                            var responseArray = dictionary_Response_list[lang_next];
                            for (var i = 1; i < responseArray.length; i++) {
                                var response = responseArray[i];
                                if (response !== undefined) {
                                    if (bool) {
                                        createAnswerRow(++countidAnswert, divList_Answert_Question, response, curentlang, null, buttonId);
                                        countidAnswert_curent_lang++
                                        continue;
                                    }
                                    bool = true;
                                    countidAnswert_curent_lang++;
                                }
                            }
                        }
                    }
                    if (countidAnswert_curent_lang != 2) countidAnswert_curent_lang--;
                    for (let i = 0; i < maxCount - countidAnswert_curent_lang; i++) {
                        createAnswerRow(++countidAnswert, divList_Answert_Question, "", curentlang, isvalidation, buttonId);
                    }
                }
            }
            curentlang = lang_next;
        } else {

        }
    } else {
        var inputElement = document.querySelector('form');

        if (inputElement === null || (String(QuestionId_One) !== buttonId && buttonId !== undefined)) {
            var textBoxElement = $("#Language_Question_" + buttonId);
            var textBoxInstance = textBoxElement.dxTextBox("instance");
            var lang_prev = textBoxInstance.option('value');

            Edit_Language_Button(buttonlang, buttonId, buttonlang, true, undefined, question_info)
            Edit_Language_Button(lang_prev, buttonId, lang_prev, false, undefined, question_info)
            var width_card_body = $("#bodyContent")
            if (width_card_body.length > 0) {
                width_card_body = width_card_body[0].offsetWidth;
            }

            if (window.innerWidth >= 500 && width_card_body < 706 && window.innerWidth > 499) {
                var text_button = ""
            } else {
                var text_button = formatMessage('Delet');
            }
            var textBoxElement = $("#Button_Delet_Question_" + buttonId);
            textBoxElement.empty();

            var Delet_Question_ = $('<div id="Delet_Question_' + buttonId + '">').dxButton({
                text: text_button,
                icon: 'trash',
                type: 'danger',
                stylingMode: 'contained',
                onClick: function (e) {
                    onDeletQuestions(buttonId, buttonlang);
                },
                visible: true,
            });

            textBoxElement.append(Delet_Question_.get(0));


            var Index_Question_ = $('#Index_Question_' + buttonId).empty();
            var Index_ = $('<div id="Index_' + buttonId + '">').dxTextBox({
                inputAttr: { 'id': 'Index' },
                labelMode: 'floating',
                label: 'Index',
                name: 'Index',
                id: 'Index_' + buttonId,
                visible: false,
                readOnly: true,
                value: question_info.Index
            });
            Index_Question_.append(Index_[0]);

            var QuestionnaireId_Question_ = $('#QuestionnaireId_' + question_info.QuestionnaireId).empty();
            var QuestionnaireId_ = $('<div id="QuestionnaireId_' + buttonId + '">').dxTextBox({
                inputAttr: { 'id': 'QuestionnaireId' },
                labelMode: 'floating',
                label: 'QuestionnaireId_',
                name: 'QuestionnaireId_',
                id: 'QuestionnaireId_' + buttonId,
                visible: false,
                readOnly: true,
                value: question_info.QuestionnaireId
            });
            QuestionnaireId_Question_.append(QuestionnaireId_[0]);

            var Language_ = $('#Language_' + buttonId).empty();
            var Language_Question_ = $('<div id="Language_Question_' + buttonId + '">').dxTextBox({
                inputAttr: { 'id': 'Language_Question_' },
                labelMode: 'floating',
                label: 'Language_Question',
                name: 'Language_Question',
                id: 'Language_Question_' + buttonId,
                visible: false,
                readOnly: true,
                value: buttonlang
            });
            Language_.append(Language_Question_[0]);

            var Tittle_Question_ = $('#Tittle_Question_' + buttonId).empty();
            var Tittle_ = $('<div id="Tittle_' + buttonId + '">').dxTextBox({
                inputAttr: { 'id': 'Question' },
                labelMode: 'floating',
                label: formatMessage('Question'),
                name: 'Question',
                id: 'Tittle_' + buttonId,
                visible: true,
                readOnly: true,
                value: question_info.Question[buttonlang]
            });
            Tittle_Question_.append(Tittle_[0]);

            var Comentory_Question_ = $('#Comentory_Question_' + buttonId).empty();
            var Comentary_ = $('<div id="Comentary_' + buttonId + '">').dxTextArea({
                inputAttr: { 'id': 'Comentary' },
                labelMode: 'floating',
                label: formatMessage('Comentary'),
                name: 'Comentary',
                id: 'Comentary_' + buttonId,
                visible: true,
                readOnly: true,
                value: question_info.Comentary[buttonlang]
            });
            Comentory_Question_.append(Comentary_[0]);

            var YesNo = translations[buttonlang].YesNo;
            var Point10Score = translations[buttonlang].Point10Score;
            var SingleAnswerVariant = translations[buttonlang].SingleAnswerVariant;
            var MultipleAnswerVariant = translations[buttonlang].MultipleAnswerVariant;
            var Point5Score = translations[buttonlang].Point5Score;

            var gradingTypeValue = (question_info.GradingType === 1) ? YesNo :
                (question_info.GradingType === 2) ? Point10Score :
                    (question_info.GradingType === 3) ? SingleAnswerVariant :
                        (question_info.GradingType === 4) ? MultipleAnswerVariant :
                            Point5Score;

            var GradingType_Question_ = $('#GradingType_Question_' + buttonId).empty();
            var GradingType_ = $('<div id="GradingType_' + buttonId + '">').dxTextBox({
                inputAttr: { 'id': 'Comentary' },
                labelMode: 'floating',
                label: formatMessage('GradingType'),
                name: 'GradingType',
                id: 'GradingType_' + buttonId,
                visible: true,
                readOnly: true,
                value: gradingTypeValue
            });
            GradingType_Question_.append(GradingType_[0]);

            if (question_info.GradingType === 3 || question_info.GradingType === 4) {
                for (let i = 0; i < question_info.ResponseVariants.length; i++) {

                    var answerId = question_info.ResponseVariants[i].Id;
                    var selector = "[id^='Answert_" + answerId + " " + buttonId + "']";
                    var AnswertElement = $(document.querySelectorAll(selector)).empty();
                    var Answert_Id_ = $('<div id="Answert_Id_' + buttonId + "_" + question_info.ResponseVariants[i].Id + '">').dxTextBox({
                        labelMode: 'floating',
                        label: 'Answert_Id',
                        name: 'Answert_Id',
                        id: 'Answert_Id_' + buttonId + "_" + question_info.ResponseVariants[i].Id,
                        visible: false,
                        readOnly: true,
                        value: question_info.ResponseVariants[i].Id
                    });
                    AnswertElement.append(Answert_Id_[0]);

                    var Answert_Response_ = $('<div id="Answert_Response_' + buttonId + "_" + question_info.ResponseVariants[i].Id + '">').dxTextBox({
                        labelMode: 'floating',
                        label: formatMessage('Answert_Response'),
                        name: 'Answert_Response_' + i,
                        id: 'Answert_Response_' + buttonId + "_" + question_info.ResponseVariants[i].Id,
                        visible: true,
                        readOnly: true,
                        value: question_info.ResponseVariants[i].Response[buttonlang],
                        inputAttr: { 'id': 'Answert_Response_' + question_info.ResponseVariants[i].Id },
                    });
                    AnswertElement.append(Answert_Response_[0]);
                }
            }
        }
        else if (QuestionId_One == buttonId) {

            var textBoxElement = $("#Language_Question_" + buttonId);
            var textBoxInstance = textBoxElement.dxTextBox("instance");
            lang = textBoxInstance.option('value');

            if (lang in dictionary_Question) {
                delete dictionary_Question[lang];
                delete dictionary_Comentory[lang];

                var new_dictionary_Response_list = {};

                for (var key in dictionary_Response_list) {
                    if (dictionary_Response_list.hasOwnProperty(key)) {
                        if (key !== lang) {
                            new_dictionary_Response_list[key] = dictionary_Response_list[key];
                        }
                    }
                }
                dictionary_Response_list = new_dictionary_Response_list;
            }

            var textBoxElement = $("#Language_Question_" + buttonId);
            var textBoxInstance = textBoxElement.dxTextBox("instance");
            var lang_prev = textBoxInstance.option('value');

            var field_input = Validation_Edit_Question(buttonId, question_info, lang, false);
            var isempty_field = examination_file_empty(field_input, lang_prev, question_info);

            if (!isempty_field) field_input = Validation_Edit_Question(buttonId, question_info, lang, true);
            if (field_input !== false) {
                $('[id^="row_"]').remove();
                if (!(lang in dictionary_Question)) {
                    dictionary_Question[lang] = field_input.Question;
                    dictionary_Comentory[lang] = field_input.Comentary;
                    dictionary_GradingType_Question = field_input.GradingType;

                    if (!(lang in dictionary_Response_list)) {
                        dictionary_Response_list[lang] = [];
                    }
                    $.each(field_input.ResponseVariants, function (index, item) {
                        var dictionary_Response = {};
                        dictionary_Response.Id = 0;
                        dictionary_Response.questionId = 0;
                        dictionary_Response = item;
                        dictionary_Response_list[lang].push(dictionary_Response);
                    });
                }
                else {
                    delete dictionary_Question[lang];
                    delete dictionary_Comentory[lang];
                    delete dictionary_GradingType_Question;

                    var new_dictionary_Response_list = {};

                    for (var key in dictionary_Response_list) {
                        if (dictionary_Response_list.hasOwnProperty(key)) {
                            if (key !== lang) {
                                new_dictionary_Response_list[key] = dictionary_Response_list[key];
                            }
                        }
                    }
                    dictionary_Response_list = new_dictionary_Response_list;

                    dictionary_Question[lang] = field_input.Question;
                    dictionary_Comentory[lang] = field_input.Comentary;
                    dictionary_GradingType_Question = field_input.GradingType;
                    if (!(lang in dictionary_Response_list)) {
                        dictionary_Response_list[lang] = [];
                    }
                    $.each(field_input.ResponseVariants, function (index, item) {
                        var dictionary_Response = {};
                        dictionary_Response.Id = 0;
                        dictionary_Response.questionId = 0;
                        dictionary_Response = item;
                        dictionary_Response_list[lang].push(dictionary_Response);
                    });
                }

                Edit_Language_Button(buttonlang, buttonId, buttonlang, true, undefined, question_info)

                var buttontype = "success"
                if (isempty_field) {
                    buttontype = "normal"
                }
                Edit_Language_Button(lang_prev, buttonId, lang_prev, false, buttontype, question_info)

                var Index_Question_ = $('#Index_Question_' + buttonId).empty();
                var Index_ = $('<div id="Index_' + buttonId + '">').dxTextBox({
                    inputAttr: { 'id': 'Index' },
                    labelMode: 'floating',
                    label: 'Index',
                    name: 'Index',
                    id: 'Index_' + buttonId,
                    visible: false,
                    readOnly: true,
                    value: question_info.Index
                });
                Index_Question_.append(Index_[0]);

                var QuestionnaireId_Question_ = $('#QuestionnaireId_' + question_info.QuestionnaireId).empty();
                var QuestionnaireId_ = $('<div id="QuestionnaireId_' + buttonId + '">').dxTextBox({
                    inputAttr: { 'id': 'QuestionnaireId' },
                    labelMode: 'floating',
                    label: 'QuestionnaireId_',
                    name: 'QuestionnaireId_',
                    id: 'QuestionnaireId_' + buttonId,
                    visible: false,
                    readOnly: true,
                    value: question_info.QuestionnaireId
                });
                QuestionnaireId_Question_.append(QuestionnaireId_[0]);

                var Language_ = $('#Language_' + buttonId).empty();
                var Language_Question_ = $('<div id="Language_Question_' + buttonId + '">').dxTextBox({
                    inputAttr: { 'id': 'Language_Question_' },
                    labelMode: 'floating',
                    label: 'Language_Question',
                    name: 'Language_Question',
                    id: 'Language_Question_' + buttonId,
                    visible: false,
                    readOnly: true,
                    value: buttonlang
                });

                Language_.append(Language_Question_[0]);

                var question_value = question_info.Question[buttonlang];
                if (question_info.Question[buttonlang] === "") {
                    var readOnly_Question = false;
                    question_value = temp_Questiom[buttonlang];
                }
                else {
                    if (temp_Questiom[buttonlang] == "" || temp_Questiom[buttonlang] == undefined) {
                        question_value = question_info.Question[buttonlang];
                    }
                    else {
                        question_value = temp_Questiom[buttonlang];
                    }
                    var readOnly_Question = $('#Tittle_' + buttonId).dxTextBox("instance").option("readOnly");
                }

                var Tittle_Question_ = $('#Tittle_Question_' + buttonId).empty();
                var Tittle_ = $('<div id="Tittle_' + buttonId + '">').dxTextBox({
                    inputAttr: { 'id': 'Question' },
                    labelMode: 'floating',
                    label: formatMessage('Question'),
                    name: 'Question',
                    id: 'Tittle_' + buttonId,
                    visible: true,
                    readOnly: readOnly_Question,
                    value: question_value
                });
                Tittle_Question_.append(Tittle_[0]);
                var width_card_body = $("#bodyContent")
                if (width_card_body.length > 0) {
                    width_card_body = width_card_body[0].offsetWidth;
                }
                if (window.innerWidth >= 500 && width_card_body < 706 && window.innerWidth > 499) {
                    var text_button = ""
                } else {
                    var text_button = formatMessage('Delet');
                }
                var textBoxElement = $("#Button_Delet_Question_" + buttonId);
                textBoxElement.empty();
                var Delet_Question_ = $('<div id="Delet_Question_"' + buttonId + '>').dxButton({
                    id: 'Delet_Question_' + buttonId,
                    text: text_button,
                    icon: 'trash',
                    type: 'danger',
                    stylingMode: 'contained',
                    onClick: function (e) {
                        onDeletQuestions(buttonId, buttonlang);
                    },
                    visible: true,
                });
                textBoxElement.append(Delet_Question_.get(0));

                var comentary_value = question_info.Comentary[buttonlang];
                if (question_info.Comentary[buttonlang] === "") {
                    var readOnly_Comentary = false;
                    comentary_value = dictionary_Comentory[buttonlang];
                }
                else {
                    if (dictionary_Comentory.hasOwnProperty(buttonlang) && dictionary_Comentory[buttonlang] == "" && question_info.Comentary !== "") {
                        comentary_value = dictionary_Comentory[buttonlang];
                        question_info.Comentary[buttonlang] = comentary_value;
                    }
                    else {
                        comentary_value = question_info.Comentary[buttonlang];
                    }
                    var readOnly_Comentary = $('#Comentary_' + buttonId).dxTextArea("instance").option("readOnly");
                }
                var Comentory_Question_ = $('#Comentory_Question_' + buttonId).empty();
                var Comentary_ = $('<div id="Comentary_' + buttonId + '">').dxTextArea({
                    inputAttr: { 'id': 'Comentary' },
                    labelMode: 'floating',
                    label: formatMessage('Comentary'),
                    name: 'Comentary',
                    id: 'Comentary_' + buttonId,
                    visible: true,
                    readOnly: readOnly_Comentary,
                    value: comentary_value
                });
                Comentory_Question_.append(Comentary_[0]);

                var YesNo = translations[buttonlang].YesNo;
                var Point10Score = translations[buttonlang].Point10Score;
                var SingleAnswerVariant = translations[buttonlang].SingleAnswerVariant;
                var MultipleAnswerVariant = translations[buttonlang].MultipleAnswerVariant;
                var Point5Score = translations[buttonlang].Point5Score;

                var gradingTypeValue;
                switch (question_info.GradingType) {
                    case 1:
                        gradingTypeValue = translations[buttonlang].YesNo;
                        break;
                    case 2:
                        gradingTypeValue = translations[buttonlang].Point10Score;
                        break;
                    case 3:
                        gradingTypeValue = translations[buttonlang].SingleAnswerVariant;
                        break;
                    case 4:
                        gradingTypeValue = translations[buttonlang].MultipleAnswerVariant;
                        break;
                    default:
                        gradingTypeValue = translations[buttonlang].Point5Score;
                }

                var GradingType_Question_ = $('#GradingType_Question_' + buttonId).empty();
                var GradingType_ = $('<div id="GradingType_' + buttonId + '">').dxTextBox({
                    inputAttr: { 'id': 'Comentary' },
                    labelMode: 'floating',
                    label: formatMessage('GradingType'),
                    name: 'GradingType',
                    id: 'GradingType_' + buttonId,
                    visible: true,
                    readOnly: true,
                    value: gradingTypeValue
                });
                GradingType_Question_.append(GradingType_[0]);

                if (question_info.GradingType === 3 || question_info.GradingType === 4) {
                    countidAnswert = 0;

                    for (let i = 0; i < question_info.ResponseVariants.length; i++) {
                        var answerId = question_info.ResponseVariants[i].Id;
                        var selector = "[id^='Answert_" + answerId + " " + buttonId + "']";
                        var AnswertElement = $(document.querySelectorAll(selector)).empty();
                        var Answert_Id_ = $('<div id="Answert_Id_' + buttonId + "_" + question_info.ResponseVariants[i].Id + '">').dxTextBox({
                            labelMode: 'floating',
                            label: 'Answert_Id',
                            name: 'Answert_Id',
                            id: 'Answert_Id_' + buttonId + "_" + question_info.ResponseVariants[i].Id,
                            visible: false,
                            readOnly: true,
                            value: question_info.ResponseVariants[i].Id
                        });
                        AnswertElement.append(Answert_Id_[0]);

                        var response_variants = question_info.ResponseVariants[i].Response[buttonlang]
                        if (question_info.ResponseVariants[i].Response[buttonlang] === "" || emty_answert[buttonlang]) {
                            var readOnly_Answert_Response_ = false;
                            emty_answert[buttonlang] = true;
                            if (temp_answert_empty.hasOwnProperty(buttonlang) && temp_answert_empty[buttonlang][i] !== "") {
                                response_variants = temp_answert_empty[buttonlang][i];
                            }
                        }
                        else { var readOnly_Answert_Response_ = true; }
                        var Answert_Response_ = $('<div id="Answert_Response_' + buttonId + "_" + question_info.ResponseVariants[i].Id + '">').dxTextBox({
                            labelMode: 'floating',
                            label: formatMessage('Answert_Response'),
                            name: 'Answert_Response',
                            id: 'Answert_Response_' + buttonId + "_" + question_info.ResponseVariants[i].Id,
                            visible: true,
                            readOnly: readOnly_Answert_Response_,
                            value: response_variants
                        });
                        AnswertElement.append(Answert_Response_[0]);

                        if (!question_info.ResponseVariants[i].Response.hasOwnProperty(buttonlang) || question_info.ResponseVariants[i].Response[buttonlang] === "" || (temp_answert_empty.hasOwnProperty(buttonlang) && temp_answert_empty[buttonlang][i] !== "")) {
                            var Answert_Response_ = $('#Answert_Response_' + buttonId + "_" + question_info.ResponseVariants[i].Id).dxTextBox("instance");
                            Answert_Response_.option("inputAttr", { 'id': 'Answert_Response_' + i });
                            Answert_Response_.option("name", "Answert_Response_" + i);
                        }
                    }
                    var countidAnswert_curent_lang = 0;
                    var maxCount = 0;

                    for (var langKey in dictionary_Response_list) {
                        if (dictionary_Response_list[langKey].length > maxCount) {
                            maxCount = dictionary_Response_list[langKey].length;
                            maxLang = langKey;
                        }
                    }

                    var divList_Answert_Question = document.getElementById('List_Answert_' + buttonId);
                    if (buttonlang in dictionary_Question) {

                        if (buttonlang && dictionary_Response_list[buttonlang]) {
                            var responseArray = dictionary_Response_list[buttonlang];
                            for (var i = 0; i < responseArray.length; i++) {
                                var response = responseArray[i];
                                if (response !== undefined) {
                                    createAnswerRow(++countidAnswert, divList_Answert_Question, response, curentlang, null, buttonId);
                                    countidAnswert_curent_lang++
                                    continue;
                                }
                            }
                        }
                    }
                    if (question_info.Question[buttonlang] == "" || question_info.Question[buttonlang] == undefined) {
                        isvalidation = false;
                    }
                    for (let i = 0; i < maxCount - countidAnswert_curent_lang; i++) {
                        createAnswerRow(++countidAnswert, divList_Answert_Question, "", curentlang, isvalidation, buttonId);
                    }
                }
                curentlang = lang_next;
            }
        }

    }
}

function onAdd_Answert_Handler(questionId) {
    var inputElement = document.getElementById("input_Question_" + questionId);

    var inputform = document.querySelector('form');
    var flag = false;

    if (inputElement != null && inputform == null) {
        var divElementQuestion = document.getElementById("input_Question_" + questionId);
        var formElement = document.createElement("form");
        formElement.name = "editQuestion_" + questionId;
        formElement.action = "/Question/POST_Upsert_Question";
        formElement.method = "POST";
        formElement.autocomplete = "off";

        while (divElementQuestion.firstChild) {
            formElement.appendChild(divElementQuestion.firstChild);
        }
        divElementQuestion.parentNode.replaceChild(formElement, divElementQuestion);
        var modalFooter = document.getElementById("footer_button_" + questionId);
        modalFooter.className = "modal-footer"
        modalFooter.removeAttribute('hidden');
        flag = true;
    }
    else if (inputform.length > 0) {
        var editQuestion = document.getElementsByName("editQuestion_" + questionId).length;

        if (editQuestion == 1) {
            var modalFooter = document.getElementById("footer_button_" + questionId);
            modalFooter.removeAttribute('hidden');
            modalFooter.className = "modal-footer"
            flag = true;
        } else {
            flag = false;
        }
    }
    if (flag) {
        var $divList_Answert_Question = $(document.getElementById('List_Answert_' + questionId));
        var $children_List_Answert = $divList_Answert_Question.children().last();
        var lastElementId = $children_List_Answert.attr('id');
        var split = lastElementId.split("_");
        countidAnswert_split = split[1].split(" ");
        countidAnswert_split = countidAnswert_split[0];
        var divList_Answert_Question = document.getElementById('List_Answert_' + questionId);
        createAnswerRow(++countidAnswert, divList_Answert_Question, null, null, null, questionId);
    }
}
function createAnswerRow(set_countidAnswert, divList_Answert_Question, input_value, lang, isvalidation, questionid) {
    var divRow_Answert_Question = document.createElement('div');
    divRow_Answert_Question.className = 'row';
    divRow_Answert_Question.id = 'row_' + set_countidAnswert;

    var divCol_10_Answert_Question = document.createElement('div');
    divCol_10_Answert_Question.className = 'col flex-grow-1';
    divRow_Answert_Question.appendChild(divCol_10_Answert_Question);

    var divTextBox_Answert_Question = document.createElement('div');
    divTextBox_Answert_Question.id = 'Answert_Question_' + set_countidAnswert;


    var textBoxAnswert = $('<div id="Answert_Question_' + set_countidAnswert + '">').dxTextBox({
        inputAttr: { 'id': 'Answert_Question_' + set_countidAnswert },
        labelMode: 'floating',
        label: formatMessage('Answert_Response'),
        name: 'Answert_Question_' + set_countidAnswert,
        id: 'Answert_Question_' + set_countidAnswert,
        visible: true,
        readOnly: false,
        placeholder: formatMessage('Enter_Question'),
        value: input_value
    });

    divTextBox_Answert_Question.append(textBoxAnswert[0]);
    divCol_10_Answert_Question.append(divTextBox_Answert_Question);

    var divCol_2_Answert_Question = document.createElement('div');
    divCol_2_Answert_Question.className = 'col-auto';
    divCol_2_Answert_Question.style = "top:6px";
    divRow_Answert_Question.appendChild(divCol_2_Answert_Question);

    var divButtonDelet_Answert_Question = document.createElement('div');
    divButtonDelet_Answert_Question.id = 'Delet_Answert_Question_' + set_countidAnswert;
    var width = $("#bodyContent")[0].offsetWidth;
    var width_card_body = $("#bodyContent")
    if (width_card_body.length > 0) {
        width_card_body = width_card_body[0].offsetWidth;
    }
    if (width_card_body < 706) {
        var text_button = ""
    } else {
        var text_button = formatMessage('Delet');
    }
    var DeletAnswertButton = $('<div id="' + set_countidAnswert + '">').dxButton({
        /*  label: 'Delet_Answert_Button',*/
        name: 'Delet_Answert_Button' + set_countidAnswert,
        text: text_button,
        type: 'danger',
        id: 'Delet_Answert_Button ' + set_countidAnswert,
        visible: true,
        icon: 'trash',
        onClick: function (e) {
            var increment = 1;

            var buttonId = e.element[0].getAttribute("id");
            var row = $('#row_' + buttonId);
            var parentElementId = row.parent().attr('id');
            parentElementId = parentElementId.split("_");
            parentElementId = parentElementId[2];
            row.remove();
            if (isNaN(parentElementId)) {
                increment = 0;
            }
            var $element = $('#Answert_Question_' + id_next);
            --countidAnswert;
            for (var langKey in dictionary_Response_list) {
                dictionary_Response_list[langKey].splice(parseInt(buttonId, 10) - increment, 1);
            }
            var bool = true;
            var id_next = ++buttonId;
            var count_element = buttonId;
            while (bool) {
                var $element = $('#Answert_Question_' + id_next);
                var $element_children = $element.children();
                var $button_delet = $('#' + id_next);
                var $row_id = $('#row_' + id_next);
                var $inputElement = $('[name="Answert_Question_' + id_next + '"]');

                var id_answert_offset = count_element - 1;

                $element_children.attr('id', 'Answert_Question_' + id_answert_offset);
                $element.attr('id', 'Answert_Question_' + id_answert_offset);
                $button_delet.attr('id', id_answert_offset);
                $row_id.attr('id', 'row_' + id_answert_offset);

                $inputElement.attr('id', 'Answert_Question_' + id_answert_offset);
                $inputElement.attr('name', 'Answert_Question_' + id_answert_offset);
                if ($element.length == 0) {
                    bool = false;
                }
                count_element++;
                id_next++;
            }
        }
    });
    divButtonDelet_Answert_Question.append(DeletAnswertButton[0]);
    divCol_2_Answert_Question.append(divButtonDelet_Answert_Question);

    divList_Answert_Question.appendChild(divRow_Answert_Question);

    if (isvalidation) {
        var divTextBox_Answert_Question = $('#Answert_Question_' + set_countidAnswert);
        var children = divTextBox_Answert_Question.children();
        var textBoxInstance = children.dxTextBox("instance");
        textBoxInstance.option({
            isValid: false,
            validationError: { message: formatMessage('Field_not_empty'), }
        });
    }
}

function Generating_input_fields(formElement, lastQuestionId) {
    var divIndex_Question = document.createElement('div');
    divIndex_Question.id = 'Index_Question';
    var Index_Question_textBox = $('<div>').dxTextBox({
        inputAttr: { 'id': 'Index_Question' },
        labelMode: 'floating',
        label: 'Index_Question',
        name: 'Index_Question',
        id: 'Index_Question',
        visible: false,
        readOnly: false,
        value: lastQuestionId,
    });
    divIndex_Question.append(Index_Question_textBox[0]);
    formElement.append(divIndex_Question);

    var divLanguage_Question = document.createElement('div');
    divLanguage_Question.id = 'Language';
    var Language_Question_textBox = $('<div id="Language_Question_div">').dxTextBox({
        inputAttr: { 'id': ' Language_Question' },
        labelMode: 'floating',
        label: formatMessage('Answert_Response'),
        name: ' Language_Question',
        placeholder: formatMessage('Enter_Question'),
        id: ' Language_Question',
        visible: false,
        readOnly: false,
        value: curentlang
    });
    divLanguage_Question.append(Language_Question_textBox[0]);
    formElement.append(divLanguage_Question);

    var divTittle_Question = document.createElement('div');
    divTittle_Question.id = 'Tittle_Question';

    var Tittle_Question_textBox = $('<div>').dxTextBox({
        inputAttr: { 'id': 'Tittle_Question' },
        labelMode: 'floating',
        label: formatMessage('Question'),
        name: 'Tittle_Question',
        placeholder: formatMessage('Enter_Question'),
        id: 'Tittle_Question',
        visible: true,
        readOnly: false,
    });
    divTittle_Question.append(Tittle_Question_textBox[0]);
    formElement.append(divTittle_Question);

    var divComentary_Question = document.createElement('div');
    divComentary_Question.id = 'Comentary_Question';

    var Comentary_Question_textBox = $('<div>').dxTextArea({
        inputAttr: { 'id': 'Comentary_Question' },
        labelMode: 'floating',
        label: formatMessage('Comentary'),
        name: 'Comentary_Question',
        placeholder: formatMessage('Enter_Сomment'),
        id: 'Comentary_Question',
        visible: true,
        readOnly: false,
    });
    divComentary_Question.append(Comentary_Question_textBox[0]);
    formElement.append(divComentary_Question);

    var divGradingType_Question = document.createElement('div');
    divGradingType_Question.id = 'GradingType_Question';

    var GradingType_Question_SelectBox = $('<div>').dxSelectBox({
        inputAttr: { 'id': 'GradingType_Question' },
        labelMode: 'floating',
        label: formatMessage('GradingType'),
        name: 'GradingType_Question',
        id: 'GradingType_Question',
        visible: true,
        dataSource: [
            { Id: 1, Name: formatMessage("YesNo") },
            { Id: 2, Name: formatMessage("Point10Score") },
            { Id: 3, Name: formatMessage("SingleAnswerVariant") },
            { Id: 4, Name: formatMessage("MultipleAnswerVariant") },
            { Id: 5, Name: formatMessage("Point5Score") }
        ],

        displayExpr: "Name",
        valueExpr: "Id",
        onValueChanged: function (e) {
            var selectedId = e.value;
            dictionary_GradingType_Question = selectedId

            if (selectedId === 3 || selectedId === 4) {
                var List_Answert_Question = $('#List_Answert_Question');
                if (List_Answert_Question.length == 0) {
                    var divList_Answert_Question = document.createElement('div');
                    divList_Answert_Question.id = 'List_Answert_Question';

                    var h3 = document.createElement('h3');
                    h3.id = 'h3_Answert_Question';
                    h3.textContent = formatMessage('List_Answer');
                    divList_Answert_Question.appendChild(h3);

                    var divButtonAdd_Answert_Question = document.createElement('div');
                    divButtonAdd_Answert_Question.id = 'ButtonAdd_Answert_Question';
                    var ButtonAdd_Answert = $('<div>').dxButton({
                        text: formatMessage('Add_Answer'),
                        type: 'normal',
                        icon: "plus",
                        onClick: function () {
                            createAnswerRow(countidAnswert, divList_Answert_Question, null);
                            countidAnswert++
                        }
                    });
                    divButtonAdd_Answert_Question.append(ButtonAdd_Answert[0]);
                    divList_Answert_Question.append(divButtonAdd_Answert_Question);

                    var divTextBox_Answert_Question = document.createElement('div');
                    divTextBox_Answert_Question.id = 'Answert_Question_' + countidAnswert;
                    var textBoxAnswert = $('<div>').dxTextBox({
                        inputAttr: { 'id': 'Answert_Question_' + countidAnswert },
                        labelMode: 'floating',
                        label: formatMessage('Answert_Response'),
                        name: 'Answert_Question_' + countidAnswert,
                        id: 'Answert_Question_' + countidAnswert,
                        visible: true,
                        readOnly: false,
                        placeholder: formatMessage('Enter_Question')
                    });
                    divTextBox_Answert_Question.append(textBoxAnswert[0]);
                    divList_Answert_Question.append(divTextBox_Answert_Question);
                    countidAnswert++;

                    var divTextBox_Answert_Question = document.createElement('div');
                    divTextBox_Answert_Question.id = 'Answert_Question_' + countidAnswert;
                    var textBoxAnswert = $('<div>').dxTextBox({
                        inputAttr: { 'id': 'Answert_Question_' + countidAnswert },
                        labelMode: 'floating',
                        label: formatMessage('Answert_Response'),
                        name: 'Answert_Question_' + countidAnswert,
                        id: 'Answert_Question_' + countidAnswert,
                        visible: true,
                        readOnly: false,
                        placeholder: formatMessage('Enter_Question')
                    });
                    divTextBox_Answert_Question.append(textBoxAnswert[0]);
                    divList_Answert_Question.append(divTextBox_Answert_Question);
                    countidAnswert++;

                    GradingType_Question_SelectBox.after(divList_Answert_Question);
                }
            } else {
                $('#List_Answert_Question').remove();
            }
        }
    });
    divGradingType_Question.append(GradingType_Question_SelectBox[0]);
    formElement.append(divGradingType_Question);

}

function Validation_Add_Question(isSave) {
    var isbool = false;
    var ResponseVariants = [];

    var question = {};
    var $form = $('form[name="addQuestion"]');
    $form.find('input, textarea').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val().trim();;
        if (!name) {
            return;
        }
        if (name.includes("Answert_Question_")) {
            var count_answert_input = name.split("_")
            count_answert_input = count_answert_input[2];
        }
        switch (name) {
            case "Tittle_Question":
                question.Question = value;
                var Tittle_Question = $("#Tittle_Question").children();
                var Tittle_Question = $(Tittle_Question[0]).dxTextBox("instance");
                Tittle_Question.option("value", value)
                Tittle_Question.option({
                    isValid: true,
                    validationError: null,
                });
                if (value == "" && isSave) {
                    Tittle_Question.option({
                        isValid: false,
                        validationError: { message: formatMessage('Field_not_empty') }
                    });
                    isbool = true;
                }

                break;
            case "Comentary_Question":
                question.Comentary = value;

                break;
            case "GradingType_Question":

                question.GradingType = value;
                var GradingType_Question = $("#GradingType_Question").children();
                var GradingType_Question = $(GradingType_Question[0]).dxSelectBox("instance");
                GradingType_Question.option({
                    isValid: true,
                    validationError: null
                });
                if ((value == "NaN" || value == "") && isSave) {
                    GradingType_Question.option({
                        isValid: false,
                        validationError: { message: formatMessage('Field_not_empty') }
                    });
                    isbool = true;
                }
                break;
            case "Answert_Question_" + count_answert_input:
                {
                    var responseVariants = {};
                    responseVariants = value;

                    var Answert_Question_ = $("#Answert_Question_" + count_answert_input).children();
                    var Answert_Question = $(Answert_Question_[0]).dxTextBox("instance");
                    Answert_Question.option("value", value)
                    Answert_Question.option({
                        isValid: true,
                        validationError: null
                    });
                    if (value == "" && isSave) {
                        Answert_Question.option({
                            isValid: false,
                            validationError: { message: formatMessage('Field_not_empty') }
                        });
                        isbool = true;
                    }
                    ResponseVariants.push(responseVariants);
                    ++count_answert_input;
                    break;
                }
        }
    });
    if (isbool && isSave) { return false }
    question.ResponseVariants = ResponseVariants;
    return question;
}

function Validation_Edit_Question(Question_ID, question_info, curent_lang_answert, isedit) {

    var isbool = false;
    var ResponseVariants = [];

    var question = {};
    var $form = $('form[name="editQuestion_' + Question_ID + '"]');
    var count_ = 0;
    var count_temp = 0;
    temp_answert_empty[curent_lang_answert] = [];

    $form.find('input, textarea').each(function () {

        var name = $(this).attr('name');
        var value = $(this).val().trim();
        if (!name) {
            return;
        }
        if (name.includes("Answert_Question_")) {
            var count_answert_input = name.split("_")
            var count_answert = count_answert_input[2];
        }
        if (name.includes("Answert_Response_")) {

            var count_answert_input = name.split("_")
            var count_answert = count_answert_input[2];
        }
        if (count_answert != null || count_answert != undefined) {
            count_temp = count_answert;
        }
        switch (name) {
            case "Question":
                question.Question = value
                var Tittle_Question_textBox = $('#Tittle_' + Question_ID).dxTextBox("instance");
                Tittle_Question_textBox.option("value", value);
                var readOnly_answert = Tittle_Question_textBox.option("readOnly");

                var Tittle_Question = $("#Tittle_Question_" + Question_ID).empty();
                var Tittle_Question_textBox = $('<div id="Tittle_' + Question_ID + '">').dxTextBox({
                    labelMode: 'floating',
                    label: formatMessage('Question'),
                    name: 'Question',
                    id: 'Tittle_' + Question_ID,
                    visible: true,
                    readOnly: readOnly_answert,
                    value: value.trim()
                });

                Tittle_Question.append(Tittle_Question_textBox[0]);

                var Tittle_Question_textBox = $('#Tittle_' + Question_ID).dxTextBox("instance");
                Tittle_Question_textBox.option({
                    isValid: true,
                    validationError: null,
                });
                // question_info.Question[curent_lang_answert] = value.trim();
                if (value == "" && isedit) {
                    Tittle_Question_textBox.option({
                        isValid: false,
                        validationError: { message: formatMessage('Field_not_empty'), }
                    });
                    isbool = true;
                }
                if (!isbool) {
                    temp_Questiom[curent_lang_answert] = value.trim();
                }
                break;

            case "Comentary":
                question.Comentary = value.trim();
                var Comentary_ = $('#Comentary_' + Question_ID).dxTextArea("instance");
                var readOnly_answert = Comentary_.option("readOnly");
                Comentary_.option("value", value);
                var Comentory_Question_ = $("#Comentory_Question_" + Question_ID).empty();
                Comentary_ = $('<div id="Comentary_' + Question_ID + '">').dxTextArea({
                    labelMode: 'floating',
                    label: formatMessage('Comentary'),
                    name: 'Comentary',
                    id: 'Comentary_' + Question_ID,
                    visible: true,
                    readOnly: readOnly_answert,
                    value: value.trim()
                });

                Comentory_Question_.append(Comentary_[0]);
                break;
            case "GradingType":
                if (question.GradingType !== null || question.GradingType !== undefined) {
                    question.GradingType = value;
                }
                break;
            case "GradingType_Temp":
                if (question.GradingType !== null || question.GradingType !== undefined) {
                    question.GradingType = value;
                }
                break;
            case "Answert_Question_" + count_answert:
                {
                    var responseVariants = {};
                    responseVariants = value.trim();

                    var Answert_ = $("#row_" + count_answert);
                    var firstChild = Answert_.children().first();
                    firstChild.empty();

                    var Answert_Response_ = $('<div id="Answert_Question_' + count_answert + '">').dxTextBox({
                        inputAttr: { 'id': 'Answert_Question_' + count_answert },
                        labelMode: 'floating',
                        label: formatMessage('Answert_Response'),
                        name: 'Answert_Question_' + count_answert,
                        id: '#Answert_Question_' + count_answert,
                        visible: true,
                        readOnly: false,
                        value: value.trim()
                    });
                    firstChild.append(Answert_Response_[0]);

                    var Answert_Response_ = $('#Answert_Question_' + count_answert).dxTextBox("instance");
                    Answert_Response_.option({
                        isValid: true,
                        validationError: null
                    });
                    if (value == "" && isedit) {
                        Answert_Response_.option({
                            isValid: false,
                            validationError: { message: formatMessage('Field_not_empty'), }
                        });
                        isbool = true;
                    }

                    ResponseVariants.push(responseVariants);
                    break;
                }
            case "Answert_Response_" + count_temp:
                {
                    value = value.trim();
                    var Answert_Response_ = $('#Answert_Response_' + Question_ID + "_" + question_info.ResponseVariants[count_].Id).dxTextBox("instance");
                    var readonlytextbox = Answert_Response_.option("readOnly")
                    Answert_Response_.option({
                        isValid: true,
                        validationError: null
                    });
                    if (value == "" && readonlytextbox != true && isedit) {
                        Answert_Response_.option({
                            isValid: false,
                            validationError: { message: formatMessage('Field_not_empty') }
                        });
                        isbool = true;
                    }
                    temp_answert_empty[curent_lang_answert][count_] = value;
                    count_++;
                    count_temp++;
                    break;
                }
        }
    });

    if (isbool && isedit) { return false }
    question.ResponseVariants = ResponseVariants;
    ResponseVariants = [];
    return question;
}

function onEditQuestionClick(buttonId, question_info, curent_Language) {
    lang_global = curent_Language;
    var formData = {
        Command: {
            Questions: [],
            BaseQueryModel: {}
        },
    };
    var question_item = {};
    var ResponseVariants = [];
    var isbool = false;

    var textBoxElement = $("#Language_Question_" + buttonId);
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    lang = textBoxInstance.option('value');
    if (QuestionId_One == -1) {
        QuestionId_One = buttonId;
    }
    if (lang in dictionary_Question) {

        delete dictionary_Question[lang];
        delete dictionary_Comentory[lang];

        var new_dictionary_Response_list = {};

        for (var key in dictionary_Response_list) {
            if (dictionary_Response_list.hasOwnProperty(key)) {
                if (key !== lang) {
                    new_dictionary_Response_list[key] = dictionary_Response_list[key];
                }
            }
        }
        dictionary_Response_list = new_dictionary_Response_list;
    }

    var textBoxElement = $("#Language_Question_" + buttonId);
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var lang_prev = textBoxInstance.option('value');

    var field_input = Validation_Edit_Question(buttonId, question_info, lang, true);

    if (field_input !== false) {
        if (!(lang in dictionary_Question)) {
            dictionary_Question[lang] = field_input.Question;
            dictionary_Comentory[lang] = field_input.Comentary;
            dictionary_GradingType_Question = field_input.GradingType;

            if (!(lang in dictionary_Response_list)) {
                dictionary_Response_list[lang] = [];
            }
            $.each(field_input.ResponseVariants, function (index, item) {
                var dictionary_Response = {};
                dictionary_Response.Id = 0;
                dictionary_Response.questionId = 0;
                dictionary_Response = item;
                dictionary_Response_list[lang].push(dictionary_Response);
            });
        }
        else {
            delete dictionary_Question[lang];
            delete dictionary_Comentory[lang];
            delete dictionary_GradingType_Question;

            var new_dictionary_Response_list = {};

            for (var key in dictionary_Response_list) {
                if (dictionary_Response_list.hasOwnProperty(key)) {
                    if (key !== lang) {
                        new_dictionary_Response_list[key] = dictionary_Response_list[key];
                    }
                }
            }

            dictionary_Response_list = new_dictionary_Response_list;

            dictionary_Question[lang] = field_input.Question;
            dictionary_Comentory[lang] = field_input.Comentary;
            dictionary_GradingType_Question = field_input.GradingType;

            $.each(field_input.ResponseVariants, function (index, item) {
                var dictionary_Response = {};
                dictionary_Response.Id = 0;
                dictionary_Response.questionId = 0;
                dictionary_Response = item;
                dictionary_Response_list[lang].push(dictionary_Response);
            });
        }
        question_item.Id = question_info.Id;
        question_item.QuestionnaireId = question_info.QuestionnaireId;
        if (dictionary_Question.hasOwnProperty("EN")) { question_info.Question["EN"] = dictionary_Question["EN"] }
        if (dictionary_Question.hasOwnProperty("RU")) { question_info.Question["RU"] = dictionary_Question["RU"] }
        if (dictionary_Question.hasOwnProperty("RO")) { question_info.Question["RO"] = dictionary_Question["RO"] }

        var jsonQuestion = JSON.stringify(question_info.Question);
        question_item.Question = jsonQuestion;

        GradingType[dictionary_GradingType_Question];

        question_item.GradingType = GradingType[dictionary_GradingType_Question];

        if (dictionary_Comentory.hasOwnProperty("EN")) { question_info.Comentary["EN"] = dictionary_Comentory["EN"] }
        if (dictionary_Comentory.hasOwnProperty("RU")) { question_info.Comentary["RU"] = dictionary_Comentory["RU"] }
        if (dictionary_Comentory.hasOwnProperty("RO")) { question_info.Comentary["RO"] = dictionary_Comentory["RO"] }

        var jsonComentory = JSON.stringify(question_info.Comentary);
        question_item.Comentary = jsonComentory;

        var index_element = $("#Index_Question_value_" + question_info.Id);
        var Index_h3 = index_element.text().split(" ");
        if (isNaN(parseInt(Index_h3[1]))) {
            var index_element_value = parseInt(Index_h3[2]);
        } else var index_element_value = parseInt(Index_h3[1]);

        question_item.Index = index_element_value;
        question_item.СreateData = question_info.CreateData;

        if (question_info.Question[curentlang] !== "") {
            var element = $("#Language_" + curentlang + "_" + buttonId);
            var parent_Element = element.parent();
            element.remove();
            var width = $("#bodyContent")[0].offsetWidth;
            if (width <= 512) {
                var text_button = "";
            } else {
                var text_button = curentlang;
            }
            var AddLanguage_Eng_Button = $('<div id="Language_' + curentlang + "_" + buttonId + '">').dxButton({
                id: 'Language_' + curentlang + "_" + buttonId,
                text: text_button,
                icon: '/assets/images/Flag_' + curentlang + '.png',
                type: 'success',
                stylingMode: 'contained',
                onClick: function (e) {
                    onLanguage_Questions(e, curentlang, lang_prev, null);
                },
                visible: true,
                disabled: true,
            });

            parent_Element.append(AddLanguage_Eng_Button.get(0));
        }
        var ResponseVariants = [];

        if (question_info.GradingType == 3 || question_info.GradingType == 4) {

            var lengthValues = {};
            for (var key in question_info.Question) {
                if (question_info.Question[key] == "") continue;
                if (dictionary_Response_list.hasOwnProperty(key)) {
                    lengthValues[key] = dictionary_Response_list[key].length;
                }
                else {
                    if (question_info.Question[key] !== "") {
                        lengthValues[key] = 0;
                    }
                }
            }

            var maxVal = Math.max(...Object.values(lengthValues));
            var shortestArrayKeys = Object.keys(lengthValues).filter(key => lengthValues[key] < maxVal);

            if (!lengthValues.hasOwnProperty("EN") && !dictionary_Question["EN"] === "") shortestArrayKeys.push("EN");
            if (!lengthValues.hasOwnProperty("RU") && !dictionary_Question["RU"] === "") shortestArrayKeys.push("RU");
            if (!lengthValues.hasOwnProperty("RO") && !dictionary_Question["RO"] === "") shortestArrayKeys.push("RO");

            for (let i = 0; i < question_info.ResponseVariants.length; i++) {
                for (var key in question_info.ResponseVariants[i].Response) {
                    if (temp_answert_empty.hasOwnProperty(key) && temp_answert_empty[key].length !== 0) {
                        question_info.ResponseVariants[i].Response[key] = temp_answert_empty[key][i];
                    }
                }
            }

            for (var key in question_info.Question) {
                if (temp_Questiom.hasOwnProperty(key) && temp_Questiom[key] !== "") {
                    question_info.Question[key] = temp_Questiom[key];
                }
            }

            for (var key in question_info.Comentary) {
                if (temp_Comentary.hasOwnProperty(key) && temp_Comentary[key] !== "") {
                    question_info.Question[key] = temp_Comentary[key];
                }
            }

            var textBoxElement = $("#Language_Question_" + buttonId);
            var textBoxInstance = textBoxElement.dxTextBox("instance");
            var lang_prev = textBoxInstance.option('value');
            if ((shortestArrayKeys !== undefined || shortestArrayKeys !== null)) {
                if (shortestArrayKeys.length != 0) {

                    for (let i = 0; i < shortestArrayKeys.length; i++) {
                        var langCode = shortestArrayKeys[i];
                        if (width <= 512) {
                            var text_button = "";
                        } else {
                            var text_button = langCode;
                        }
                        var isValidation = langCode === "EN" || langCode === "RO" || langCode === "RU";
                        var element = $("#Language_" + langCode + "_" + buttonId);
                        var parentElement = element.parent();
                        var typeValue = element.dxButton("instance").option("type");

                        if (lang_prev !== langCode) {
                            element.remove();
                            var addButton = $('<div id="Language_' + langCode + '_' + buttonId + '">').dxButton({
                                id: 'Language_' + langCode + '_' + buttonId,
                                text: text_button,
                                icon: '/assets/images/Flag_' + langCode + '.png',
                                type: isValidation ? "danger" : typeValue,
                                stylingMode: 'contained',
                                onClick: function (e) {
                                    onLanguage_Questions(e, langCode, lang_prev, question_info, isValidation);
                                },
                                visible: true,
                            });
                            parentElement.append(addButton.get(0));
                        }
                    }
                    shortestArrayKeys = [];
                    return;
                }
            }
        }

        //const taskElements = document.querySelectorAll('.tasks__item');
        //for (const task of taskElements) {
        //    task.draggable = false;
        //    task.addEventListener('dragstart', onDragStart);
        //}

        if (curent_Language_input == undefined) {
            curent_Language_input = curent_Language;
        }
        if (question_info.GradingType == 3 || question_info.GradingType == 4) {
            if (dictionary_Response_list.hasOwnProperty(curent_Language_input) || dictionary_Response_list.length > 0) {
                for (let i = 0; i < dictionary_Response_list[curent_Language_input].length; i++) {
                    var Response = {};
                    Response.Response = {};
                    Response.Id = 0;
                    Response.QuestionId = buttonId;
                    for (var key in dictionary_Response_list) {
                        var Response_list = dictionary_Response_list[key];
                        Response.Response[key] = Response_list[i];
                    }
                    if (!Response.Response.hasOwnProperty("EN")) { Response.Response["EN"] = "" }
                    if (!Response.Response.hasOwnProperty("RU")) { Response.Response["RU"] = "" }
                    if (!Response.Response.hasOwnProperty("RO")) { Response.Response["RO"] = "" }

                    Response.Response = JSON.stringify(Response.Response);
                    ResponseVariants.push(Response);
                }
            }
            for (let i = question_info.ResponseVariants.length - 1; i >= 0; i--) {
                var Response = {};
                Response.Response = {};
                Response.Id = question_info.ResponseVariants[i].Id;
                Response.QuestionId = question_info.ResponseVariants[i].QuestionId;
                Response.Response = JSON.stringify(question_info.ResponseVariants[i].Response);
                ResponseVariants.unshift(Response);
            }
            var ButtonAdd_Answert_Question_ = document.getElementById("ButtonAdd_Answert_Question_" + buttonId);
            ButtonAdd_Answert_Question_.style.display = "none";
        }
        question_item.responseVariants = ResponseVariants;
        formData.Command.Questions.push(question_item);
        var $form = $('form[name="addQuestion"]');
        var url = $form.attr('action');
    }
    else {
        return;
    }
    var modalFooter = document.getElementById("footer_button_" + buttonId);
    modalFooter.setAttribute('hidden', 'hidden');
    modalFooter.className = "modal-footer";

    for (var key in dictionary_Question) {
        var curent_type = $('#Language_' + key + "_" + buttonId).dxButton("instance").option("type");
        var lang_id_button = 'Language_' + key + '_Question_' + buttonId;
        var Language_ = $('#' + lang_id_button).empty();
        var Language_Button = $('<div id="Language_' + key + "_" + buttonId + '">').dxButton({
            id: 'Language_' + key + "_" + buttonId,
            text: key,
            icon: '/assets/images/Flag_' + key + '.png',
            type: curent_type,
            stylingMode: 'contained',
            onClick: function (e) {
                onLanguage_Questions(e, key, lang_global, question_info);
            },
            visible: true,
            disabled: true
        });
        Language_.append(Language_Button.get(0));
    }

    var $form = $('form[name="editQuestion_' + buttonId + '"]');
    var url = $form.attr('action');


    var inputElement = $("#Question_root_" + buttonId)[0];
    var li_Element = inputElement.parentElement;
    li_Element.style.backgroundColor = "#f9f9f9";

    ajax_post_question(url, formData, true, lang)
    QuestionId_One = -1;
}

var not_empty_language = [];
function onEditQuestions(questionId, question_info) {
    prev_question_info = question_info;
    var divElement = document.getElementById("input_Question_" + questionId);
    var li_Element = divElement.parentElement.parentElement;
    var inputElementcount = document.querySelector('form');
    var inputElement = document.getElementsByName("editQuestion_" + questionId).length;
    const potentialElements = divElement.querySelectorAll('[id^="Language_"][id$="_' + questionId + '"]');
    const regex = new RegExp('^Language_[A-Z]{2}_' + questionId + '$');
    const elements = Array.from(potentialElements).filter(element => regex.test(element.id));

    not_empty_language = [];
    for (var i = 0; i < elements.length; i++) {
        if ($(elements[i]).dxButton("instance").option("type") === "success") {

            var id_parts = elements[i].id.split("_");
            if (id_parts[1]) {
                not_empty_language.push(id_parts[1]);
            }
        }
    }

    if (inputElementcount == null || inputElement != 0) {
        if (divElement != null) {
            var formElement = document.createElement("form");
            formElement.name = "editQuestion_" + questionId;
            formElement.Id = "editQuestion";
            formElement.action = "/Question/POST_Upsert_Question";
            formElement.method = "POST";
            formElement.autocomplete = "off";

            while (divElement.firstChild) {
                formElement.appendChild(divElement.firstChild);
            }
            divElement.parentNode.replaceChild(formElement, divElement);
        }
        li_Element.style.backgroundColor = "#E3F0EA";
        var textBox = $("#Tittle_" + questionId);
        textBox.dxTextBox("instance").option("readOnly", false);

        Tittle = textBox.dxTextBox("instance").option("value");

        var textArea = $("#Comentary_" + questionId);
        textArea.dxTextArea("instance").option("readOnly", false);
        Comentary = textArea.dxTextArea("instance").option("value");

        var Button = $("#Edit_Question_" + questionId);
        Button.dxButton("instance").option("visible", false);

        var GradingType_Temp_ = [];
        GradingType_Temp_ = $("#GradingType_Temp_" + questionId);
        if (Object.keys(GradingType_Temp_).length === 0) {
            GradingType_Temp_ = $("#GradingType_" + questionId);
        }
        var GradingType = GradingType_Temp_.dxTextBox("instance").option("value");
        if (GradingType == "Single answer variant" || GradingType == "Varianta cu un singur răspuns"
            || GradingType == "Вариант с одним ответом" || GradingType == "Multiple answer variant"
            || GradingType == "Varianta cu răspunsuri multiple" || GradingType == "Вариант с несколькими ответами" || GradingType == "SingleAnswerVariant" || GradingType == "MultipleAnswerVariant")
            var isAnswerVariant = true;
        if (isAnswerVariant) {
            var answertvariant = $('[id*=Answert_Response_' + questionId + ']');

            if (Tittle == "") {
                for (let i = 0; i < answertvariant.length; i++) {
                    $(answertvariant[i]).dxTextBox("instance").option("readOnly", false);
                }
            }
            var ButtonAdd_Answert_Question_ = document.getElementById("ButtonAdd_Answert_Question_" + questionId);
            ButtonAdd_Answert_Question_.style.display = "block";
        }
        var modalFooter = document.getElementById("footer_button_" + questionId);
        modalFooter.className = "modal-footer";
        modalFooter.removeAttribute('hidden');
        QuestionId_One = questionId;
    } else {
        var element = $('[name="addQuestion"]')
        if (element.length === 0) {
            var element = document.querySelector(`[name*="editQuestion_"]`);
            if (element.length !== 0 && element !== null) {
                var element_form = element.querySelector(`[id*="Index_Question_value_"]`)
                var li_form = element_form.parentElement.parentElement.parentElement.parentElement;
                Element_notify(li_form);
            }
        } else {

            Element_notify(element[0]);
        }
    }
}


function Element_notify(el) {

    var scrollY = window.scrollY;
    x = el.getBoundingClientRect().top + scrollY;

    var window_element = window.innerHeight;
    var height_element = el.offsetHeight;
    var width_element = el.innerWidth

    el.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end"
    });
    var offset = "0 -55";
    var offset_top = height_element - window_element;

    if (window_element < height_element + 110) {
        if (window_element + 190 <= x + height_element) {
            offset = '0 ' + (offset_top + 70);
            offsetY = 0;
        }
    }

    DevExpress.ui.notify({
        message: formatMessage("Save_or_Cancel"),
        width: (20 + width_element),
        position: {
            my: "top right",
            at: "top right",
            of: el,
            offset: offset,
        },
        type: "warning",
        displayTime: 2500,
        closeOnClick: true,
        hideOnOutsideClick: true,
    });


    // var scrollX = window.scrollX;
    // var scrollY = window.scrollY;
    // y = el.getBoundingClientRect().left + scrollX;
    // x = el.getBoundingClientRect().top + scrollY;

    // var window_element = window.innerHeight;
    // var height_element = el.offsetHeight;
    // var width_element = el.innerWidth


    //var element_sticky = document.getElementById('sticky-container-2');
    //var style_sticky = window.getComputedStyle(element_sticky);

    //var style = getComputedStyle(el);
    // var left_padding = parseFloat(style.paddingLeft)

    // y_sticky = element_sticky.getBoundingClientRect().left + scrollX;
    // x_sticky = element_sticky.getBoundingClientRect().top + scrollY;


    //var offset = 0, offsetY = 0;
    //
    //if (window_element > height_element + 110) {
    //    if (style_sticky.position !== 'fixed') {
    //        if (window_element + 135 >= x + height_element) {
    //            offset = '0 -55';
    //            offsetY = 0;
    //        } else if (window_element + 135 <= x + height_element && window_element + 171 > x + height_element) {
    //            offset = '0 -110';
    //            offsetY = -30;
    //        } else if (window_element + 100 <= x + height_element) {
    //            offset = '0 -110';
    //            offsetY = -56;
    //        }
    //    }
    //    else if (style_sticky.position === 'fixed') {
    //        if (window_element + 100 >= x + height_element) {
    //            offset = '0 0';
    //            offsetY = 56;
    //        } else if (window_element + 100 <= x + height_element && window_element + 136 > x + height_element) {
    //            offset = '0 -55';
    //            offsetY = 25;
    //        } else if (window_element + 100 <= x + height_element) {
    //            offset = '0 -55';
    //            offsetY = 0;
    //        }
    //    }
    //} else {
    //    var offset_top = height_element - window_element;
    //    if (style_sticky.position !== 'fixed') {
    //        if (window_element + 190 <= x + height_element) {
    //            offset = '0 ' + (offset_top + 15);
    //            offsetY = -56;
    //        } else if (window_element + 190 > x + height_element) {
    //            offset = '0 ' + (offset_top + 40);
    //            offsetY = -30;
    //        }
    //    }
    //    else if (style_sticky.position === 'fixed') {
    //        if (window_element + 190 <= x + height_element) {
    //            offset = '0 ' + (offset_top + 70);
    //            offsetY = 0;
    //        } else if (window_element + 190 > x + height_element) {
    //            offset = '0 ' + (offset_top + 100);
    //            offsetY = 25;
    //        }
    //    }
    //}

    //  window.scrollTo(0, (x + height_element - window.innerHeight + offsetY), "smooth");
}

function ajax_post_question(url, formData, isEdit, Language) {

    var Id_question = formData.Command.Questions[0].Id;
    $.ajax({
        url: url,
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
        success: function (result) {

            if (ISNPS.IsJSON(result)) {
                result = ISNPS.ParseJSON(result);
                if (result.result == 1) {

                    if (result.showToast) {
                        ShowToast('success', result.message);
                    }
                    result = result.Record[0];
                    var idanswert = result.Id;
                    var Question_ID = idanswert;
                    var inputElement = document.querySelector('form');

                    if (inputElement != null) {

                        dictionary_GradingType_Question = result.GradingType;
                        if (isEdit) {
                            var GradingType_ = $("#GradingType_" + Question_ID);
                            if (GradingType_.length == 0) {
                                var GradingType_ = $("#GradingType_Temp_" + Question_ID);
                            }
                            var textBoxInstance = $(GradingType_).dxTextBox("instance");
                            gradingType_curent = textBoxInstance.option("value");

                            var new_li = inputElement.parentElement.parentElement;
                            var drag_element = inputElement.parentElement.querySelector(':first-child');
                            var div_root = inputElement.parentElement.querySelector(':last-child').remove();
                            inputElement.remove();
                            var div_root = new_li.querySelector('div[id*="Question_root_"]');
                        }
                        else {
                            inputElement.remove();
                            var lastTaskItem = document.querySelectorAll('li.tasks__item');
                            lastTaskItem = lastTaskItem[lastTaskItem.length - 1];
                            var new_li = document.createElement('li');
                            new_li.className = 'tasks__item';
                            new_li.style = "background-color: #f9f9f9";

                            var drag_element = document.createElement('div');
                            drag_element.id = 'drag_element';
                            drag_element.className = "containerdrag drag-zone";
                            new_li.appendChild(drag_element);

                            var div_root = document.createElement('div');
                            div_root.id = 'Question_root_' + Question_ID;
                            new_li.appendChild(div_root);
                        }
                        var input_Question = document.createElement('div');
                        input_Question.id = 'input_Question_' + Question_ID;
                        div_root.appendChild(input_Question);

                        var div_row = document.createElement('div');
                        div_row.className = 'flex-container align-items-center';
                        var width = $("#bodyContent")[0].offsetWidth;
                        input_Question.append(div_row);

                        var div_Col_Index_Question_value_ = document.createElement('div');
                        div_Col_Index_Question_value_.id = "Col_Index_Question_value_" + Question_ID;
                        div_Col_Index_Question_value_.className = 'Col_Index_Question';
                        div_row.append(div_Col_Index_Question_value_);

                        var h3 = document.createElement('h3');
                        h3.id = 'Index_Question_value_' + Question_ID;
                        h3.style = "white-space: nowrap";
                        h3.textContent = formatMessage('Question') + " " + result.Index;
                        div_Col_Index_Question_value_.appendChild(h3);

                        var Col_Button_Edit_Question_ = document.createElement('div');
                        Col_Button_Edit_Question_.className = 'Col_Button_Edit_Question';
                        Col_Button_Edit_Question_.id = 'Col_Button_Edit_Question_' + Question_ID;
                        div_row.appendChild(Col_Button_Edit_Question_);

                        var Button_Edit_Question_ = document.createElement('div');
                        Button_Edit_Question_.id = 'Button_Edit_Question_' + Question_ID;
                        Col_Button_Edit_Question_.appendChild(Button_Edit_Question_);
                        var Edit_Question_ = $('<div id="Edit_Question_' + Question_ID + '">').dxButton({
                            id: 'Edit_Question_' + Question_ID,
                            icon: 'edit',
                            type: 'normal',
                            stylingMode: 'contained',
                            onClick: function () {
                                onEditQuestions(Question_ID, result);
                            },
                            visible: true,
                        });

                        Button_Edit_Question_.appendChild(Edit_Question_.get(0));
                        function createLanguageButton(langName, iconPath, Question_ID, Disabled, result) {

                            var Col_Language_Question_ = document.createElement('div');
                            Col_Language_Question_.className = 'Col_Language';
                            Col_Language_Question_.id = "Col_Language_" + langName + "_Question_" + Question_ID;
                            div_row.append(Col_Language_Question_);

                            var Language_Question_ = document.createElement('div');
                            Language_Question_.id = "Language_" + langName + "_Question_" + Question_ID;
                            Col_Language_Question_.appendChild(Language_Question_);
                            if (result.Question[langName] == "") var type = 'normal'; else var type = 'success';

                            var width = window.innerWidth <= 365 ? 30 : "";
                            var height = window.innerWidth <= 365 ? 30 : "";
                            var text_button = window.innerWidth < 884 ? "" : langName;

                            var addButton = $('<div id="Language_' + langName + "_" + Question_ID + '">').dxButton({
                                id: 'Language_' + langName + "_" + Question_ID,
                                text: text_button,
                                icon: iconPath,
                                type: type,
                                width: width,
                                height: height,
                                stylingMode: 'contained',
                                onClick: function (e) {
                                    onLanguage_Questions(e, langName, curentlang, result);
                                },
                                visible: true,
                                disabled: Disabled
                            });
                            Language_Question_.appendChild(addButton.get(0));
                        }

                        ['EN', 'RU', 'RO'].forEach(lang => {
                            var buttton_Disabled = false;
                            if (typeof Language !== "undefined") {
                                if (Language === lang) buttton_Disabled = true;
                            } else if (lang_global === lang) buttton_Disabled = true;
                            createLanguageButton(lang, '/assets/images/Flag_' + lang + '.png', Question_ID, buttton_Disabled, result)
                        });

                        var spacer_box = document.createElement('div');
                        spacer_box.className = "spacer-box item";
                        div_row.appendChild(spacer_box);

                        var Col_Button_Statistica_Question_ = document.createElement('div');
                        Col_Button_Statistica_Question_.className = 'Col_Button_Statistica';
                        Col_Button_Statistica_Question_.id = 'Col_Button_Statistica_Question_' + Question_ID;
                        div_row.appendChild(Col_Button_Statistica_Question_);
                        var width_card_body = $("#bodyContent")
                        if (width_card_body.length > 0) {
                            width_card_body = width_card_body[0].offsetWidth;
                        }
                        if (window.innerWidth < 884) {
                            var text_button = ""
                        } else {
                            var text_button = formatMessage('Statistics');
                        }
                        var Button_Statistica_Question_ = document.createElement('div');
                        Button_Statistica_Question_.id = 'Button_Statistica_Question_' + Question_ID;
                        Col_Button_Statistica_Question_.appendChild(Button_Statistica_Question_);
                        
                        var  temp_GradingType_Question = dictionary_GradingType_Question;
                        var Statistica_ = $('<div id="Statistica_' + Question_ID + '">').dxButton({
                            id: 'Statistica_' + Question_ID,
                            icon: "chart",
                            text: text_button,
                            type: 'normal',
                            stylingMode: 'contained',
                            onClick: function () {
                                onStatistica_Questions(Question_ID, lang_global, temp_GradingType_Question, result.Question);
                            },
                            visible: true,
                        });
                        Button_Statistica_Question_.appendChild(Statistica_.get(0));

                        //temp_GradingType_Question = "hgjg787678jhf";

                        var spacer_box = document.createElement('div');
                        spacer_box.className = "spacer-box item";
                        div_row.appendChild(spacer_box);

                        var Col_Button_Delet_Question_ = document.createElement('div');
                        Col_Button_Delet_Question_.className = 'Col_Button_Delet';
                        Col_Button_Delet_Question_.id = 'Col_Button_Delet_Question_' + Question_ID;
                        div_row.appendChild(Col_Button_Delet_Question_);
                        var width_card_body = $("#bodyContent")
                        if (width_card_body.length > 0) {
                            width_card_body = width_card_body[0].offsetWidth;
                        }
                        if (window.innerWidth < 884) {
                            var text_button = ""
                        } else {
                            var text_button = formatMessage('Delet');
                        }
                        var Button_Delet_Question_ = document.createElement('div');
                        Button_Delet_Question_.id = 'Button_Delet_Question_' + Question_ID;
                        Col_Button_Delet_Question_.appendChild(Button_Delet_Question_);
                        var Delet_Question_ = $('<div id="Delet_Question_' + Question_ID + '">').dxButton({
                            id: 'Delet_Question_' + Question_ID,
                            text: text_button,
                            icon: 'trash',
                            type: 'danger',
                            stylingMode: "contained",
                            onClick: function () {
                                onDeletQuestions(Question_ID, curentlang, result.Question);
                            },
                            visible: true,
                        });
                        Button_Delet_Question_.appendChild(Delet_Question_.get(0));

                        var Question_ = document.createElement('div');
                        Question_.id = 'Question_' + Question_ID;
                        Question_.className = 'Question_field';
                        input_Question.appendChild(Question_);

                        var Index_Question_ = document.createElement('div');
                        Index_Question_.id = 'Index_Question_' + Question_ID;
                        Question_.appendChild(Index_Question_);
                        var Index_Question_TextBox = $('<div id="Index_' + Question_ID + '">').dxTextBox({
                            id: 'Index_' + Question_ID,
                            value: result.Index,
                            labelMode: 'floating',
                            label: 'Index',
                            name: 'Index',
                            visible: false,
                            readOnly: true,
                        }).attr('InputAttr', result.Index);

                        Index_Question_.appendChild(Index_Question_TextBox.get(0));
                        var QuestionID_ = document.createElement('div');
                        QuestionID_.id = 'QuestionID_' + Question_ID;
                        Question_.appendChild(QuestionID_);

                        var Id_Question_TextBox = $('<div id="Id_' + Question_ID + '">').dxTextBox({
                            id: 'Id_' + Question_ID,
                            labelMode: 'floating',
                            label: 'Id',
                            name: 'Id',
                            visible: false,
                            readOnly: true,
                            value: Question_ID
                        }).attr('InputAttr', Question_ID);

                        QuestionID_.appendChild(Id_Question_TextBox.get(0));

                        var QuestionnaireId_ = document.createElement('div');
                        QuestionnaireId_.id = 'QuestionnaireId_' + result.QuestionnaireId;
                        Question_.appendChild(QuestionnaireId_);

                        var QuestionnaireId_textbox = $('<div id="QuestionnaireId_' + Question_ID + '">').dxTextBox({
                            id: 'QuestionnaireId_' + Question_ID,
                            value: result.QuestionnaireId,
                            labelMode: 'floating',
                            label: 'QuestionnaireId',
                            name: 'QuestionnaireId',
                            visible: false,
                            readOnly: true,
                        }).attr('InputAttr', result.QuestionnaireId);

                        QuestionnaireId_.appendChild(QuestionnaireId_textbox.get(0));

                        var CreateData_ = document.createElement('div');
                        CreateData_.id = 'CreateData_' + Question_ID;
                        Question_.appendChild(CreateData_);

                        var CreateData_textbox = $('<div id="CreateData_' + Question_ID + '">').dxTextBox({
                            id: 'CreateData_' + Question_ID,
                            value: null,
                            labelMode: 'floating',
                            label: 'CreateData',
                            name: 'CreateData',
                            visible: false,
                            readOnly: true,
                        }).attr('InputAttr', null);

                        CreateData_.appendChild(CreateData_textbox.get(0));
                        if (typeof Language !== "undefined") {
                            var Language_Question_value = Language;
                        } else var Language_Question_value = lang_global;

                        var Language_ = document.createElement('div');
                        Language_.id = 'Language_' + Question_ID;
                        Question_.appendChild(Language_);
                        var Language_Question_ = $('<div id="Language_Question_' + Question_ID + '">').dxTextBox({
                            id: 'Language_Question_' + Question_ID,
                            value: Language_Question_value,
                            labelMode: 'floating',
                            label: 'Language_Question',
                            name: 'Language_Question',
                            visible: false,
                            readOnly: true,
                        }).attr('InputAttr', Language_Question_value);

                        Language_.appendChild(Language_Question_.get(0));

                        if (typeof Language !== "undefined") {
                            var Question_name = result.Question[Language]
                        } else var Question_name = result.Question[lang_global]

                        var Tittle_info_ = document.createElement('div');
                        Tittle_info_.id = 'Tittle_info_' + Question_ID;
                        Tittle_info_.className = JSON.stringify(result.Question);
                        Question_.appendChild(Tittle_info_);

                        var Tittle_Question_ = document.createElement('div');
                        Tittle_Question_.id = 'Tittle_Question_' + Question_ID;
                        Question_.appendChild(Tittle_Question_);

                        var Question_textbox = $('<div id="Tittle_' + Question_ID + '">').dxTextBox({
                            id: 'Tittle_' + Question_ID,
                            value: Question_name,
                            labelMode: 'floating',
                            label: formatMessage('Question'),
                            name: 'Question',
                            visible: true,
                            readOnly: true,
                        }).attr('InputAttr', Question_ID);
                        Tittle_Question_.appendChild(Question_textbox.get(0));

                        if (typeof Language !== "undefined") {
                            var Comentory_name = result.Comentary[Language]
                        } else var Comentory_name = result.Comentary[lang_global]

                        var Comentory_info_ = document.createElement('div');
                        Comentory_info_.id = 'Comentory_info_' + Question_ID;
                        Comentory_info_.className = JSON.stringify(result.Comentary);
                        Question_.appendChild(Comentory_info_);

                        var Comentory_Question_ = document.createElement('div');
                        Comentory_Question_.id = 'Comentory_Question_' + Question_ID;
                        Question_.appendChild(Comentory_Question_);

                        var Comentary_TextArea = $('<div id="Comentary_' + Question_ID + '">').dxTextArea({
                            id: 'Comentary_' + Question_ID,
                            value: Comentory_name,
                            labelMode: 'floating',
                            label: formatMessage('Comentary'),
                            name: 'Comentary',
                            visible: true,
                            readOnly: true,
                        }).attr('InputAttr', result.Comentary[lang_global]);

                        Comentory_Question_.appendChild(Comentary_TextArea.get(0));

                        function getTranslation(key, lang) {
                            lang = lang || lang_global;
                            return translations[lang][key] || translations[lang_global][key];
                        };
                        var gradingTypeValue;
                        if (dictionary_GradingType_Question !== undefined) {
                            if (!isNaN(dictionary_GradingType_Question)) {
                                gradingTypeValue = {
                                    "1": getTranslation("YesNo", Language),
                                    "2": getTranslation("Point10Score", Language),
                                    "3": getTranslation("SingleAnswerVariant", Language),
                                    "4": getTranslation("MultipleAnswerVariant", Language),
                                    "5": getTranslation("Point5Score", Language)
                                }[dictionary_GradingType_Question];
                            } else {
                                gradingTypeValue = dictionary_GradingType_Question;
                            }
                        }
                        var GradingType_Question_ = document.createElement('div');
                        GradingType_Question_.id = 'GradingType_Question_' + Question_ID;
                        Question_.appendChild(GradingType_Question_);

                        var GradingType_textbox = $('<div id="GradingType_Temp_' + Question_ID + '">').dxTextBox({
                            id: 'GradingType_Temp_' + Question_ID,
                            value: gradingTypeValue,
                            labelMode: 'floating',
                            label: formatMessage('GradingType'),
                            name: 'GradingType_Temp',
                            visible: true,
                            readOnly: true,
                        }).attr('InputAttr', gradingTypeValue);

                        GradingType_Question_.appendChild(GradingType_textbox.get(0));
                        GradingType_Question_.appendChild(GradingType_textbox.get(0));

                        var allowedGradingTypes = ["Single answer variant", "Varianta cu un singur răspuns", "Вариант с одним ответом", "Multiple answer variant", "Varianta cu răspunsuri multiple", "Вариант с несколькими ответами", 3, 4];
                        var isAnswerVariant = allowedGradingTypes.includes(gradingTypeValue);
                        if (isAnswerVariant) {
                            var h3 = document.createElement('h3');
                            h3.textContent = formatMessage('List_Answer');
                            Question_.appendChild(h3);

                            var Button_AddQuestion_Question_ = document.createElement('div');
                            Button_AddQuestion_Question_.id = 'ButtonAdd_Answert_Question_' + Question_ID;
                            Button_AddQuestion_Question_.style.display = "none";

                            Question_.appendChild(Button_AddQuestion_Question_);

                            var AddQuestion_Button = $('<div id="AddQuestion' + Question_ID + '">').dxButton({
                                id: 'AddQuestion' + Question_ID,
                                text: formatMessage('Add_Answer'),
                                icon: 'plus',
                                type: 'normal',
                                stylingMode: 'contained',

                                onClick: function () {
                                    onAdd_Answert_Handler(Question_ID);
                                },
                                visible: true,
                            }).css({
                                'background-color': "#f9f9f9",
                            });;

                            Button_AddQuestion_Question_.appendChild(AddQuestion_Button.get(0));

                            var List_Answert_ = document.createElement('div');
                            List_Answert_.id = 'List_Answert_' + Question_ID;
                            Question_.appendChild(List_Answert_);

                            if (Language == undefined) Language = lang_global;
                            if (result.ResponseVariants !== null || result.ResponseVariants.length != 0) {

                                for (let i = 0; i < result.ResponseVariants.length; i++) {

                                    var idanswert = result.ResponseVariants[i].Id;
                                    var Answert_ = document.createElement('div');
                                    Answert_.id = 'Answert_' + idanswert + " " + Question_ID;
                                    List_Answert_.appendChild(Answert_);

                                    var Answert_Id_ = $('<div id="Answert_Id_' + Question_ID + "_" + idanswert + '">').dxTextBox({
                                        id: 'Answert_Response_' + Question_ID + '_' + idanswert,
                                        value: idanswert,
                                        labelMode: 'floating',
                                        label: 'Answert_Id',
                                        name: 'Answert_Id',
                                        visible: false,
                                        readOnly: true,
                                    }).attr('InputAttr', idanswert);;

                                    Answert_.appendChild(Answert_Id_.get(0));

                                    var Answert_Response_ = $('<div id="Answert_Response_' + Question_ID + "_" + idanswert + '">').dxTextBox({
                                        id: 'Answert_Response_' + Question_ID + '_' + idanswert,
                                        value: result.ResponseVariants[i].Response[Language],
                                        labelMode: 'floating',
                                        label: formatMessage('Answert_Response'),
                                        name: 'Answert_Response_' + idanswert,
                                        visible: true,
                                        readOnly: true,
                                    }).attr('InputAttr', idanswert);

                                    Answert_.appendChild(Answert_Response_.get(0));
                                }
                            }
                        }

                        var footer_button_ = document.createElement('div');
                        footer_button_.id = 'footer_button_' + Question_ID;
                        footer_button_.className = 'modal-footer';
                        footer_button_.setAttribute('hidden', 'hidden');
                        input_Question.appendChild(footer_button_);

                        var Esc_Question_Button = $('<div>').dxButton({
                            icon: "revert",
                            text: formatMessage('Cancel'),
                            type: 'normal',
                            onClick: function () {
                                onEscEditClick(Question_ID, Language);
                            },
                        });

                        var Save_Question_Button = $('<div>').dxButton({
                            text: formatMessage('Save'),
                            type: 'success',
                            icon: "save",
                            onClick: function () {
                                onEditQuestionClick(Question_ID, result, Language);
                            },
                        });

                        footer_button_.appendChild(Esc_Question_Button.get(0));
                        footer_button_.appendChild(Save_Question_Button.get(0));

                        if (!isEdit) {
                            if (lastTaskItem == undefined) {
                                var tasksList = document.querySelector('.tasks__list');
                                tasksList.appendChild(new_li);
                            } else {
                                lastTaskItem.parentNode.insertBefore(new_li, lastTaskItem.nextSibling);
                            }
                            
                            drag_element.draggable = true;
                            drag_element.addEventListener('dragstart', (event) => onDragStart(event, drag_element));
                        }
                    }
                    Tittle = null;
                    Comentary = null;
                    countidAnswert = 0;
                    dictionary_Response_list = {};
                    dictionary_Comentory = {};
                    dictionary_Question = {};
                    dictionary_GradingType_Question = null;
                    shortestArrayKeys = [];
                    emty_answert = {};
                    temp_answert_empty = {};
                    temp_Questiom = {};
                    temp_Comentary = {};
                    isCahnge_GradingType_Question = false;
                   
                }
                else if (result.result == 2) {// KO
                    
                    if (typeof Language !== "undefined") {
                        Data_recovery_question(Id_question, Language)
                    } else Data_recovery_question(Id_question, lang_global)
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                }
                else if (result.result == 3) {// ERROR
                    if (typeof Language !== "undefined") {
                        Data_recovery_question(Id_question, Language)
                    } else Data_recovery_question(Id_question, lang_global)
                    if (result.showToast) {
                        ShowToast('error', result.message);
                    }
                } else if (result.result == 4) {// NOTVALID
                    if (typeof Language !== "undefined") {
                        Data_recovery_question(Id_question, Language)
                    } else Data_recovery_question(Id_question, lang_global)
                    if (result.showToast) {
                        ShowToast('warning', result.message);
                    }
                } else if (result.result == 5) {// EXCEPTION
                    if (typeof Language !== "undefined") {
                        Data_recovery_question(Id_question, Language)
                    } else Data_recovery_question(Id_question, lang_global)
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
        },

        error: function (error) {
        }
    });
    QuestionId_One = -1;
}
/*jQuery.inArray(not_empty_language, lang_prev) === -1*/
function examination_file_empty(question, lang_prev, question_info) {
    if (not_empty_language.indexOf(lang_prev) !== -1) {
        return false;
    }
    if (question.Question == "" && question.Comentary == "") {
        // if (question.Question == "" && question.Comentary == "") {
        question_info.Question[lang_prev] = "";
        question_info.Comentary[lang_prev] = "";

        for (var i = 0; i < question_info.ResponseVariants.length; i++) {
            question_info.ResponseVariants[i].Response[lang_prev] = "";

            if (question_info.ResponseVariants[i].Response.hasOwnProperty(lang_prev) &&
                question_info.ResponseVariants[i].Response[lang_prev] !== "") {
                return false;
            }
        }
        if (question.ResponseVariants.length > 0) {
            for (var i = 0; i < question.ResponseVariants.length; i++) {
                if (question.ResponseVariants[i] !== "") return false
            }
        }
        if (temp_answert_empty && temp_answert_empty[lang_prev] && temp_answert_empty[lang_prev].length) {
            for (var i = 0; i < temp_answert_empty[lang_prev].length; i++) {
                if (temp_answert_empty[lang_prev][i] !== "") return false
            }
        }
    } else {
        return false
    }
    return true
}

function examination_file_empty_add(question, lang_prev) {

    if (question.Question == "" && question.Comentary == "") {
        for (var i = 0; i < question.ResponseVariants.length; i++) {
            if (question.ResponseVariants[i] !== "") return false
        }
        if (temp_answert_empty && temp_answert_empty[lang_prev] && temp_answert_empty[lang_prev].length) {
            for (var i = 0; i < temp_answert_empty[lang_prev].length; i++) {
                if (temp_answert_empty[lang_prev][i] !== "") return false
            }
        }
    } else {
        return false
    }
    return true
}

const targetSelector = '.dx-overlay-wrapper.dx-toast-wrapper';
const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && node.matches(targetSelector)) {
                    node.style.zIndex = 101;
                    node.firstChild.style.height = "52px";
                }
            }
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true, subtree: false });


function Data_recovery_question(questionId, curent_lang) {
    var inputElement = document.querySelector('form');
    // var inputElement = document.getElementsByName("editQuestion_" + questionId);
    if (inputElement != null) {
        if (questionId !== 0) {
            var li_Element = inputElement.parentElement.parentElement;
            li_Element.style.backgroundColor = "#f9f9f9";
            var newDiv = document.createElement("div");
            newDiv.id = "input_Question_" + questionId;
            while (inputElement.firstChild) {
                newDiv.appendChild(inputElement.firstChild);
            }
            inputElement.parentNode.replaceChild(newDiv, inputElement);

            var Language_ = $('#Language_' + questionId).empty();
            var Language_Question_ = $('<div id="Language_Question_' + questionId + '">').dxTextBox({
                inputAttr: { 'id': 'Language_Question_' },
                labelMode: 'floating',
                label: 'Language_Question',
                name: 'Language_Question',
                id: 'Language_Question_' + questionId,
                visible: false,
                readOnly: true,
                value: curent_lang
            });
            Language_.append(Language_Question_[0]);


            result = prev_question_info;
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
        } else {

        }
        Tittle = null;
        prev_question_info = null;
        Comentary = null;
        countidAnswert = 0;
        dictionary_Response_list = {};
        dictionary_Comentory = {};
        dictionary_Question = {};
        dictionary_GradingType_Question = null;
        shortestArrayKeys = [];
        emty_answert = {};
        temp_answert_empty = {};
        temp_Questiom = {};
        temp_Comentary = {};
        QuestionId_One = -1;
    }
}


var curent_index_prev;
var curent_index_next;
var curent_Id_prev;
var curent_Id_next;
var gradingType_curent_2;
//function onDragStart(event, element) {
//    var curent_item = event.currentTarget;
//    var curent_item = curent_item.parentElement;
//    var id_question = curent_item.querySelector('[id^="Question_root_"]').id.split("_")[2];
//    var GradingType_Question = $("#GradingType_Temp_" + id_question);

//    if (GradingType_Question[0] === undefined) {
//        var GradingType_Question = $("#GradingType_" + id_question);
//    };
//    var textBoxInstance = GradingType_Question.dxTextBox("instance");
//    gradingType_curent_2 = textBoxInstance.option("value");

//    var elementsWithIdPart = curent_item.previousElementSibling
//    if (elementsWithIdPart !== null && elementsWithIdPart.id !== "sticky-container" && elementsWithIdPart.id == null) {
//        var h3Element = elementsWithIdPart.querySelector('h3[id^="Index_Question_value_"]');
//        var Index_h3 = h3Element.innerText.split(" ");
//        if (isNaN(parseInt(Index_h3[1]))) {
//            curent_index_prev = parseInt(Index_h3[2]);
//        } else curent_index_prev = parseInt(Index_h3[1]);
//        var curent_Question_root_prev = elementsWithIdPart.querySelector('[id^="Question_root_"]');
//        curent_Id_prev = curent_Question_root_prev.id.split("_")[2];
//    }
//    var elementsWithIdPart = curent_item.nextElementSibling
//    if (elementsWithIdPart !== null && elementsWithIdPart.id !== "AddQuestion") {
//        var h3Element = elementsWithIdPart.querySelector('h3[id^="Index_Question_value_"]');
//        var Index_h3 = h3Element.innerText.split(" ");
//        if (isNaN(parseInt(Index_h3[1]))) {
//            curent_index_next = parseInt(Index_h3[2]);
//        } else curent_index_next = parseInt(Index_h3[1]);
//        var curent_Question_root_next = elementsWithIdPart.querySelector('[id^="Question_root_"]');
//        curent_Id_next = curent_Question_root_next.id.split("_")[2];
//    }
//    event.target.parentElement.classList.add('selected');
//    if (element && element.id) {
//        event.dataTransfer.setData('text/plain', element.id);
//    }
//}