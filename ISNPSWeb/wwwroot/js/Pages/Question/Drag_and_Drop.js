
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

const tasksListElement = document.querySelector('.tasks__list');
const taskElements = tasksListElement.querySelectorAll('.tasks__item');

var formData =
{
    Command:
    {
        Questions: [],
        BaseQueryModel: {}
    },
};

// Добавляем обработчик событий перетаскивания ко всем элементам списка
for (const task of taskElements) {
    const dragElement = task.querySelector('#drag_element');
    dragElement.draggable = true;
    dragElement.addEventListener('dragstart', (event) => onDragStart(event, dragElement));

    //dragElement.addEventListener('dragstart', onDragStart);
}

var isMoveObject = false;
const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 17;
    // Если курсор выше центра элемента, возвращаем текущий элемент
    // В ином случае — следующий DOM-элемент
    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement : currentElement.nextElementSibling;
    return nextElement;
};

const topOffset = 150;
const bottomOffset = 100;
tasksListElement.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
    const y = evt.clientY;
    const windowHeight = window.innerHeight;
    const scrollOffset = 75;

    if (y < topOffset) {
        window.scrollBy(0, -scrollOffset);
    } else if (y > windowHeight - bottomOffset) {
        window.scrollBy(0, scrollOffset);
    }

    const activeElement = tasksListElement.querySelector(`.selected`);
    const currentElement = evt.target.parentElement;
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`tasks__item`);

    if (!isMoveable) {
        return;
    }
    const nextElement = getNextElement(evt.clientY, currentElement);
    if (nextElement && (activeElement === nextElement.previousElementSibling || activeElement === nextElement)) {
        return;
    } else {
        
    }
    if (activeElement instanceof Node) {
        
       tasksListElement.insertBefore(activeElement, nextElement);
    }
});

var firstsElement = "";
// Функция для установки данных перетаскиваемого элемента
var curent_index_prev;
var curent_index_next;
var curent_Id_prev;
var curent_Id_next;
var gradingType_curent_2;
function onDragStart(event, element) {
    var curent_item = event.currentTarget;
    var curent_item = curent_item.parentElement;
    var id_question = curent_item.querySelector('[id^="Question_root_"]').id.split("_")[2];
    var GradingType_Question = $("#GradingType_Temp_" + id_question);

    if (GradingType_Question[0] === undefined) {
        var GradingType_Question = $("#GradingType_" + id_question);
    };
    var textBoxInstance = GradingType_Question.dxTextBox("instance");
    gradingType_curent_2 = textBoxInstance.option("value");
    var elementsWithIdPart = curent_item.previousElementSibling
    if (elementsWithIdPart !== null && elementsWithIdPart.id !== "sticky-container" && elementsWithIdPart.id == "") {
        var h3Element = elementsWithIdPart.querySelector('h3[id^="Index_Question_value_"]');
        var Index_h3 = h3Element.innerText.split(" ");
        if (isNaN(parseInt(Index_h3[1]))) {
            curent_index_prev = parseInt(Index_h3[2]);
        } else curent_index_prev = parseInt(Index_h3[1]);
        var curent_Question_root_prev = elementsWithIdPart.querySelector('[id^="Question_root_"]');
        curent_Id_prev = curent_Question_root_prev.id.split("_")[2];
    }
    var elementsWithIdPart = curent_item.nextElementSibling
    if (elementsWithIdPart !== null && elementsWithIdPart.id !== "AddQuestion") {
        var h3Element = elementsWithIdPart.querySelector('h3[id^="Index_Question_value_"]');
        var Index_h3 = h3Element.innerText.split(" ");
        if (isNaN(parseInt(Index_h3[1]))) {
            curent_index_next = parseInt(Index_h3[2]);
        } else curent_index_next = parseInt(Index_h3[1]);
        var curent_Question_root_next = elementsWithIdPart.querySelector('[id^="Question_root_"]');
        curent_Id_next = curent_Question_root_next.id.split("_")[2];
    }
    event.target.parentElement.classList.add('selected');
    if (element && element.id) {
        event.dataTransfer.setData('text/plain', element.id);
    }
}

function Question_Info(Question_id, index, formData) {
    var questions = {};
    var GradingType_Question = $("#GradingType_Temp_" + Question_id);

    if (GradingType_Question[0] === undefined) {
        var GradingType_Question = $("#GradingType_" + Question_id);
    };
    var textBoxInstance = GradingType_Question.dxTextBox("instance");
    var gradingType = textBoxInstance.option("value");
    questions.id = Question_id;

    var Question_ = $("#Question_" + Question_id);
    var QuestionnaireId_ = Question_.find("[id^='QuestionnaireId_']");
    questions.questionnaireId = $(QuestionnaireId_[0]).attr("id").split("_")[1];
    questions.question = $("#Tittle_info_" + Question_id).attr("class");

    questions.gradingType = GradingType[gradingType];
    questions.comentary = $("#Comentory_info_" + Question_id).attr("class");
    questions.index = index;
    var currentDate = "2024-06-13T14:57:10.062617";
    questions.createData = currentDate;
    questions.responseVariants = [];
    formData.Command.Questions.push(questions);
}

tasksListElement.addEventListener('dragend', (evt) => {
    evt.preventDefault();
    debugger
    var element = $(evt.target.parentElement);
    var index_element = element.find('h3[id^="Index_Question_value_"]');
    evt.target.parentElement.classList.remove('selected');
    if (index_element.length > 0) {
        var id_question = $(index_element[0]).attr("id").split("_");
        var id_question = id_question[3];
        var Index_h3 = index_element.text().split(" ");
        if (isNaN(parseInt(Index_h3[1]))) {
            var index_element_value = parseInt(Index_h3[2]);
        } else var index_element_value = parseInt(Index_h3[1]);

        var prevElement = element.prev();
        var isDown = false;
        var index_element_drag_drop;
        
        if (prevElement.length > 0 && !prevElement.is('#AddQuestion')) {
            var prevElement_index = prevElement.find('h3[id^="Index_Question_value_"]');
            if (prevElement_index.length > 0) {
                var id_question_prev = $(prevElement_index[0]).attr("id").split("_");
                var id_question_prev = id_question_prev[3];

                var Index_h3_prev = prevElement_index.text().split(" ");

                if (isNaN(parseInt(Index_h3_prev[1]))) {
                    var index_element_value_prev = parseInt(Index_h3_prev[2]);
                } else var index_element_value_prev = parseInt(Index_h3_prev[1]);
                if (index_element_value_prev !== curent_index_prev) {
                    if (index_element_value < index_element_value_prev) {
                        //down
                        isDown = true;
                        Question_Info(id_question, index_element_value_prev, formData)
                        index_element_drag_drop = index_element_value_prev;
                        // POST_UP_Down_Question(id_question, index_element_value_prev);
                        Set_new_Index(element, id_question, index_element_value, index_element_value_prev, true);
                    } else {
                        Question_Info(id_question, index_element_value_prev + 1, formData)
                        index_element_drag_drop = index_element_value_prev + 1;
                        //  POST_UP_Down_Question(id_question, index_element_value_prev + 1);
                        Set_new_Index(element, id_question, index_element_value, index_element_value_prev + 1, false);
                    }
                }
            }
        } else {
            var nextElement = element.next();
            if (nextElement.length > 0) {
                var nextElement = nextElement.find('h3[id^="Index_Question_value_"]');
                if (nextElement.length > 0) {
                    var id_question_next = $(nextElement[0]).attr("id").split("_");
                    var id_question_next = id_question_next[3];

                    var Index_h3_next = nextElement.text().split(" ");

                    if (isNaN(parseInt(Index_h3_next[1]))) {
                        var index_element_value_next = parseInt(Index_h3_next[2]);
                    } else var index_element_value_next = parseInt(Index_h3_next[1]);
                    if (index_element_value_next !== curent_index_next) {
                        if (parseInt(index_element_value) < index_element_value_next) {
                            isDown = true;
                            Question_Info(id_question, index_element_value_next - 1, formData)
                            index_element_drag_drop = index_element_value_next - 1;
                            // POST_UP_Down_Question(id_question, index_element_value_next - 1)
                            Set_new_Index(element, id_question, index_element_value, index_element_value_next - 1, true);
                        } else {
                            Question_Info(id_question, index_element_value_next, formData)
                            index_element_drag_drop = index_element_value_next;
                            //  POST_UP_Down_Question(id_question, index_element_value_next)
                            Set_new_Index(element, id_question, index_element_value, index_element_value_next, false);
                        }
                    }
                }
            }
        }
        formData.isGet_Response = false;
        if (formData.Command.Questions.length > 1) {
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
                success: function (result) {

                    if (ISNPS.IsJSON(result)) {
                        result = ISNPS.ParseJSON(result);
                        if (result.result == 1) {
                            if (result.showToast) {
                                ShowToast('success', result.message);
                            }
                        } else if (result.result == 2) {// KO
                            if (result.showToast) {
                                ShowToast('warning', result.message);
                            }
                        } else if (result.result == 3) {// ERROR
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
                        
                        if (result.result !== 1) {
                            Recovery_element_Drag_and_Drop(id_question, isDown, index_element_drag_drop, id_question_prev, id_question_next)
                        }
                        //curent_index_prev = -1;
                        //curent_index_next = -3;
                        formData =
                        {
                            Command:
                            {
                                Questions: [],
                                BaseQueryModel: {}
                            },
                        };
                    }
                },
                error: function (xhr, status, error) {
                    Recovery_element_Drag_and_Drop(id_question, isDown, index_element_drag_drop, id_question_prev, id_question_next)
                    //curent_index_prev = -1;
                    //curent_index_next = -3;
                    formData =
                    {
                        Command:
                        {
                            Questions: [],
                            BaseQueryModel: {}
                        },
                    };
                }
            });
        }
    }
    curent_index_prev = -1;
    curent_index_next = -3;
});


function Set_new_Index(elementcurent, QuestionIdcurent, Question_Index_curent, Question_Index, is_Down) {
    Question_Index_curent = parseInt(Question_Index_curent);
    var Index_h3_1 = $('#Index_Question_value_' + QuestionIdcurent);
    Index_h3_1.text(formatMessage('Question') + " " + Question_Index);
    var textbox_curent_index = $("#Index_" + QuestionIdcurent).dxTextBox("instance");
    textbox_curent_index.option("value", Question_Index);
    if (is_Down) {
        var bool = true;
        while (bool) {
            var element_ = elementcurent.prev();
            var element = element_.find('h3[id^="Index_Question_value_"]');
            if (element.length == 0) { break; }
            var id_question_ = $(element[0]).attr("id").split("_");
            var id_question_ = id_question_[3];

            var Index_h3_ = element.text().split(" ");
            if (isNaN(parseInt(Index_h3_[1]))) {
                var index_element_value_ = parseInt(Index_h3_[2]);
            } else var index_element_value_ = parseInt(Index_h3_[1]);

            if (Question_Index_curent >= index_element_value_) { break; }
            --index_element_value_;
            var Index_h3_1 = $('#Index_Question_value_' + id_question_);
            Index_h3_1.text(formatMessage('Question') + " " + index_element_value_);

            Question_Info(id_question_, index_element_value_, formData)   
            elementcurent = element_;
        }
    }
    else {
        var bool = true;
        while (bool) {
            var element_ = element_ = elementcurent.next();
            var element = element_.find('h3[id^="Index_Question_value_"]');
            if (element.length == 0) { break; }
            var id_question_ = $(element[0]).attr("id").split("_");
            var id_question_ = id_question_[3];

            var Index_h3_ = element.text().split(" ");
            if (isNaN(parseInt(Index_h3_[1]))) {
                var index_element_value_ = parseInt(Index_h3_[2]);
            } else var index_element_value_ = parseInt(Index_h3_[1]);

            if (Question_Index_curent <= index_element_value_) { break; }
            ++index_element_value_;
            var Index_h3_1 = $('#Index_Question_value_' + id_question_);
            Index_h3_1.text(formatMessage('Question') + " " + index_element_value_);

            Question_Info(id_question_, index_element_value_, formData)      
            elementcurent = element_;
        }
    }
}

function Recovery_element_Drag_and_Drop(id_question, isDown, index_element_drag_drop, id_question_prev, id_question_next) {
    formData =
    {
        Command:
        {
            Questions: [],
            BaseQueryModel: {}
        },
    };
    var Language = $("#Cookie_lang")[0].innerText;

    let originalElement = document.getElementById("Question_root_" + id_question).parentElement;

    var index_element_value;
    
    if (curent_index_prev !== undefined && curent_index_prev > 0) {
        Question_Info(id_question, curent_index_prev + 1, formData);
        index_element_value = curent_index_prev + 1
    }
    else {
        Question_Info(id_question, curent_index_next - 1, formData);
        index_element_value = curent_index_next - 1
    }
    originalElement.remove();
    temp_Question = formData.Command.Questions[0];

    var url = "/Question_API/Question/" + id_question;
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
                if (result.result == 1) { // OK
                    result = result.Record[0];
                    var idanswert = result.Id;
                    var Question_ID = idanswert;

                    dictionary_GradingType_Question = result.GradingType;

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
                    var Statistica_ = $('<div id="Statistica_' + Question_ID + '">').dxButton({
                        id: 'Statistica_' + Question_ID,
                        icon: "chart",
                        text: text_button,
                        type: 'normal',
                        stylingMode: 'contained',
                        onClick: function () {
                            onStatistica_Questions(Question_ID, lang_global, dictionary_GradingType_Question, result.Question);
                        },
                        visible: true,
                    });
                    Button_Statistica_Question_.appendChild(Statistica_.get(0));

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
                                }).attr('InputAttr', idanswert);

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

                    
                    if (curent_Id_prev !== undefined && curent_Id_prev !== null) {
                        let lastTaskItem = document.getElementById("Question_root_" + curent_Id_prev).parentElement;
                        lastTaskItem.after(new_li);
                    } else {
                        let nextTaskItem = document.getElementById("Question_root_" + curent_Id_next).parentElement;
                        nextTaskItem.before(new_li);
                    }

                    drag_element.draggable = true;
                    drag_element.addEventListener('dragstart', onDragStart);

                    originalElement = document.getElementById("Question_root_" + id_question).parentElement;

                    if (isDown === true) {
                        Set_new_Index($(originalElement), id_question, index_element_drag_drop, index_element_value, false);
                    } else {
                        Set_new_Index($(originalElement), id_question, index_element_drag_drop, index_element_value, true);
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
                    curent_Id_prev = null;
                    curent_Id_next = null;
                    curent_index_prev = null;
                    curent_index_next = null;
                    id_question_prev = null;
                } else if (result.result == 2) {// KO
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
        }
    });
    formData =
    {
        Command:
        {
            Questions: [],
            BaseQueryModel: {}
        },
    };
}
