
var DataSource;
var isReadyContent = false;
var questionId;
$(function () {
    total = 0;

    questionId = $("#QuestionId")[0].textContent
    $("#Char_div").dxChart({
        series: [{
            type: "bar"
        }],
        legend: {
            visible: false
        },
        argumentAxis: {
            title: formatMessage("ArgumentAxis_List_answers"),
            label: {
                format: 'largeNumber',
                visible: true,
                overlappingBehavior: "stagger",
                wordWrap: "breakWord",
                textOverflow: "ellipsis",
                font: {
                    size: 10
                },
                customizeText: function () {
                    return this.valueText;
                },
            },
        },
        valueAxis: {
            title: formatMessage("ValueAxis_Number_responses"),
            label: { format: 'largeNumber' },
        },
        title: {
            text: formatMessage("Total_number_responses") + total
        },
        commonSeriesSettings: {
            label: {
                visible: true,
                format: 'largeNumber',
                backgroundColor: 'white',
                font: {
                    size: 15,
                    color: 'black'
                }
            },
            endOnTick: true,
        },
        loadingIndicator: {
            enabled: true,
            text: formatMessage('Loading'),
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            font: {
                size: 24,
                color: '#333'
            }
        },
        onInitialized: function () { Data_Statistica(); isReadyContent = true },
    });
});


var total;
var interval;
var GradingType_question;
var Question_info;
var responseRecord;
var id_question;
function Data_Statistica() {

    var textBoxInstance = $("#Id_").dxTextBox("instance");
    id_question = textBoxInstance.option("value");

    var Lang_textBoxInstance = $("#Language_Question_div").dxTextBox("instance");
    var Lang_textBoxInstance = Lang_textBoxInstance.option("value");
    
    var GradingType_textBoxInstance = $("#GradingType_").dxTextBox("instance");
    GradingType_question = GradingType_textBoxInstance.option("value");

    var Data_Start_BoxInstance = $("#Data_start").dxDateBox("instance");
    var data_start_question = Data_Start_BoxInstance.option("value");
    if (data_start_question !== null) {
        var dataStart = data_start_question.toLocaleString();
    }
    var Data_End_BoxInstance = $("#Data_end").dxDateBox("instance");
    var data_end_question = Data_End_BoxInstance.option("value");
    if (data_end_question !== null) {
        var dataEnd = data_end_question.toLocaleString();
    }
    
    var Name_Question = $("#name_question")[0].textContent;
    var lang_Question = $("#language")[0].textContent;
    const json_name = JSON.parse(Name_Question);
    var name;
    if (json_name[lang_Question] !== 0) name = json_name[lang_Question]
    else {
        ['EN', 'RU', 'RO'].forEach(lang_ => {
            
            if (json_name[lang_Question] !== "") {
                name = json_name[lang_Question];
            }
        });
    }

    if (id_question !== null && id_question !== undefined && id_question !== "") {
        var url = "/Question/Statistica_info/" + id_question + "/" + encodeURIComponent(dataStart) + "/" + encodeURIComponent(dataEnd) + "/" + GradingType_question + "/" + encodeURIComponent(name);
        $.ajax({
            url: url,
            cache: false,
            type: "GET",
            dataType: "json",
            statusCode: {
                302: function (data) {
                    window.location.href = '/Account/Logout/';
                },
                401: function (data) {
                    window.location.href = '/Account/Logout/';
                },
            },
            success: function (response) {
                var flag_empty = false;
                
                if (response.Record === null) {
                    flag_empty = true;
                }
                if (response.result === 1 || flag_empty) {
                    responseRecord = response.Record;
                    if (GradingType_question == "SingleAnswerVariant" || GradingType_question == "MultipleAnswerVariant") {
                        url = "/Question_API/Question/" + id_question;
                        $.ajax({
                            url: url,
                            cache: false,
                            type: "GET",
                            dataType: "json",
                            statusCode: {
                                302: function (data) {
                                    window.location.href = '/Account/Logout/';
                                },
                                401: function (data) {
                                    window.location.href = '/Account/Logout/';
                                },
                            },
                            success: function (response_question) {
                                
                                if (response_question.result === 1) {
                                    
                                    Question_info = response_question.Record[0].ResponseVariants;
                                    Chart_Value(response.Record, Lang_textBoxInstance, GradingType_question, Question_info);
                                } else if (response_question.result == 2) {
                                    if (response_question.showToast) {
                                        ShowToast('warning', response_question.message);
                                    }
                                } else if (response_question.result == 3) {
                                    if (response_question.showToast) {
                                        ShowToast('info', response_question.message);
                                    }
                                } else if (response_question.result == 4) {
                                    if (response_question.showToast) {
                                        ShowToast('warning', response_question.message);
                                    }
                                }
                            },
                            error: function (error) {
                            }
                        });
                    } else {
                        
                        Chart_Value(response.Record, Lang_textBoxInstance, GradingType_question, null);
                    }
                } else if (response.result == 2) {
                    if (response.showToast) {
                        ShowToast('warning', response.message);
                    }
                } else if (response.result == 3) {
                    if (response.showToast) {
                        ShowToast('info', response.message);
                    }
                } else if (response.result == 4) {
                    if (response.showToast) {
                        ShowToast('warning', response.message);
                    }
                }
            },
            error: function (error) {
            }
        });
    }
}
var Lang_curent;
function onLanguage_Statistica_Question(e, lang_button, lang_prev, name_button_lang) {
    observer_2.disconnect();
    var flag = false;
    var textBoxElement = $("#Language_Question_div");
    var textBoxInstance = textBoxElement.dxTextBox("instance");
    var lang = textBoxInstance.option('value');
    Lang_curent = lang_button;

    var Name_Oprostnik = $("#Name_Oprostnik").empty();
    if (name_button_lang != null)
        var name_Oprostnik_textbox = $('<div id="Name">').dxTextBox({
            id: "Name",
            value: name_button_lang,
            labelMode: 'floating',
            label: 'Name',
            name: "Name",
            visible: false,
            readOnly: true,
        });
    Name_Oprostnik.append(name_Oprostnik_textbox[0]);

    var Language_prev_Button = $("#Language_" + lang).dxButton("instance");
    Language_prev_Button.option("disabled", false);

    var Language_curent_Button = $("#Language_" + lang_button).dxButton("instance");
    Language_curent_Button.option("disabled", true);

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
    
    if (responseRecord !== undefined && responseRecord !== null) {
        
        Chart_Value(responseRecord, lang_button, GradingType_question, Question_info)
    }

    var headingElement = document.getElementById("h3_question_name");
    if (name_button_lang == "") {
        if (lang_button == "RU") headingElement.textContent = "На текущем языке вопрос не создан";
        if (lang_button == "RO") headingElement.textContent = "Întrebarea nu a fost creată în limba actuală";
        if (lang_button == "EN") headingElement.textContent = "The question has not been created in the current language";
    } else headingElement.textContent = name_button_lang;

    var headingElement = document.getElementById("text_statistika_form");
    if (lang_button == "RU") headingElement.textContent = "Заполните форму для определения за какой период нужна статистика";
    if (lang_button == "RO") headingElement.textContent = "Completați formularul pentru a determina pentru ce perioadă aveți nevoie de statistici";
    if (lang_button == "EN") headingElement.textContent = "Fill out the form to determine for what period you need statistics";

    var headingElement = document.getElementById("text_statistika");
    if (lang_button == "RU") headingElement.textContent = "Статистика для вопроса:";
    if (lang_button == "RO") headingElement.textContent = "Statistici pentru întrebare:";
    if (lang_button == "EN") headingElement.textContent = "Statistics for the question:";

    var ButtonElement = $("#Button_form");
    var ButtonInstance = ButtonElement.dxButton("instance");
    if (lang_button == "RU") ButtonInstance.option("text", "Применить данные");
    if (lang_button == "RO") ButtonInstance.option("text", "Aplicați datele");
    if (lang_button == "EN") ButtonInstance.option("text", "Apply data");

    var Chart = $("#Char_div");
    var ChartInstance = Chart.dxChart("instance");
    if (total == undefined) total = 0;

    if (lang_button === undefined) Lang_curent = Lang_textBoxInstance;
    if (lang_button === "RU") {
        var ArgumentAxis_List_answers = "Список ответов";
        var ValueAxis_Number_responses = "Количество ответов";
        var Total_number_responses = "Общее количество ответов " + total;
    }
    if (lang_button === "RO") {
        var ArgumentAxis_List_answers = "Enumeră răspunsurile";
        var ValueAxis_Number_responses = "Numărul de răspunsuri";
        var Total_number_responses = "Numărul total de răspunsuri " + total;
    }
    if (lang_button === "EN") {
        var ArgumentAxis_List_answers = "List answers";
        var ValueAxis_Number_responses = "Number of responses";
        var Total_number_responses = "Total number responses " + total;
    }
    var ChartInstance = $("#Char_div").dxChart("instance");
    ChartInstance.option({
        argumentAxis: {
            title: ArgumentAxis_List_answers,
        },
        valueAxis: {
            title: ValueAxis_Number_responses,
            multipleAxesSpacing: 1,
        },
        title: Total_number_responses,
    });
    Chart_content();
}

function Chart_content() {
    if (maxVal <= 3) {
        var Chart_div = $("#Char_div").children()[0];
        var val_elements = $(Chart_div.querySelector(".dxc-elements-axes-group")).children()[0].children;
        var val_grid = $(Chart_div.querySelector(".dxc-grids-group")).children()[0].children;
        var val_line = $(Chart_div.querySelector(".dxc-axes-group")).children()[0].children[0].children;
        temp_val_elements = val_elements[0];
        temp_val_grid = val_grid[0];
        temp_val_line = val_line[1];

        for (let i = 1; i < val_elements.length; i++) {
            if (val_elements[i].textContent === "0") {
                if (val_elements[i].textContent === temp_val_elements.textContent && i !== 0) {
                    val_elements[i].remove();
                    val_grid[i].remove();
                    val_line[i + 1].remove();
                    i--;
                }
            } else if (temp_val_elements.textContent !== "0") {
                if (val_elements[i].textContent === temp_val_elements.textContent && i !== 0) {
                    temp_val_elements.remove();
                    temp_val_grid.remove();
                    temp_val_line.remove();
                    i--;
                }
            }
            temp_val_elements = val_elements[i];
            temp_val_grid = val_grid[i];
            temp_val_line = val_line[i + 1];
        }
    }
}

var prev_data_start = null;
var prev_data_end = null;

function onStartDateChanged(e) {

    var startDateBox = $("#Data_start").dxDateBox("instance");
    var endDateBox = $("#Data_end").dxDateBox("instance");

    var startDateString = e.value;
    startDateString.setHours(0, 0, 0, 0);

    var endDateString = endDateBox.option("value");

    var startDate = new Date(startDateString);
    var endDate = new Date(endDateString);
    endDate.setHours(23, 59, 59, 999);

    if (endDate <= startDate) {
        startDateBox.option("value", prev_data_start);
        startDateBox.option({
            isValid: false,
            validationError: { message: formatMessage('Сomparing_date_start_end') }
        });
    } else {
        startDateBox.option("isValid", true);
        prev_data_start = startDate;
    }

    var today = new Date();
    today.setHours(23, 59, 59, 999);
    if (today <= startDate) {
        startDateBox.option("value", prev_data_start);
        startDateBox.option({
            isValid: false,
            validationError: { message: formatMessage('Сomparing_date_start_curent') }
        });
    }
}
function onEndDateChanged(e) {
    var startDateBox = $("#Data_start").dxDateBox("instance");
    var endDateBox = $("#Data_end").dxDateBox("instance");

    var startDateString = startDateBox.option("value");
    var endDateString = e.value;

    var startDate = new Date(startDateString);
    var endDate = new Date(endDateString);

    if (endDate <= startDate) {
        endDateBox.option("value", prev_data_end);
        endDateBox.option({
            isValid: false,
            validationError: { message: formatMessage('Сomparing_date_end_start') }
        });
    } else {
        endDateBox.option("isValid", true);
        prev_data_end = endDate;
    }
}
function onEndDateInitialized() {
    var data_end = $("#Data_end").dxDateBox("instance");
    prev_data_end = data_end.option("value");
}

function onStartDateInitialized() {
    var data_end = $("#Data_start").dxDateBox("instance");
    prev_data_start = data_end.option("value");
}

function date_box_content() {
    // var widgets = $('.dx-texteditor-buttons-container').remove();
}
var maxVal;
var result;
function Chart_Value(response, Lang_textBoxInstance, GradingType_question, Question_info) {
    
    total = 0;
    if (GradingType_question == "YesNo") {
        var Yes;
        var No;
        if (Lang_textBoxInstance === "RU") {
            Yes = "Да";
            No = "Нет";
        }
        if (Lang_textBoxInstance == "RO") {
            Yes = "Da";
            No = "Nu";
        }
        if (Lang_textBoxInstance === "EN") {
            Yes = "Yes";
            No = "No";
        }
        var totalYes = 0;
        var totalNo = 0;
        if (response !== null) {
            total = response["yesNoStatistic"]["totalResponses"]
            totalYes = response["yesNoStatistic"]["totalYes"]
            totalNo = response["yesNoStatistic"]["totalNo"]
        }
        result = [
            {
                arg: Yes,
                val: totalYes
            },
            {
                arg: No,
                val: totalNo
            }];
    } else if (GradingType_question == "Point10Score") {
        var Grade_Lower;
        if (Lang_textBoxInstance === "RU") Grade_Lower = "Оценка ниже или равна 6";
        if (Lang_textBoxInstance === "RO") Grade_Lower = "Nota mai mică sau egală de 6";
        if (Lang_textBoxInstance === "EN") Grade_Lower = "Grade Lower Or Equal Than 6";

        var totalGradeLowerOrEqualThan6 = 0;
        var totalGrade7 = 0;
        var totalGrade8 = 0;
        var totalGrade9 = 0;
        var totalGrade10 = 0;
        if (response !== null) {
            total = response["point10ScoreStatistic"]["totalResponses"]
            var totalGradeLowerOrEqualThan6 = response["point10ScoreStatistic"]["totalGradeLowerOrEqualThan6"];
            var totalGrade7 = response["point10ScoreStatistic"]["totalGrade7"];
            var totalGrade8 = response["point10ScoreStatistic"]["totalGrade8"];
            var totalGrade9 = response["point10ScoreStatistic"]["totalGrade9"];
            var totalGrade10 = response["point10ScoreStatistic"]["totalGrade10"];
        }
        result = [
            {
                arg: Grade_Lower,
                val: totalGradeLowerOrEqualThan6
            },
            {
                arg: "7",
                val: totalGrade7
            },
            {
                arg: "8",
                val: totalGrade8
            },
            {
                arg: "9",
                val: totalGrade9
            },
            {
                arg: "10",
                val: totalGrade10
            }
        ];
    } else if (GradingType_question == "SingleAnswerVariant" || GradingType_question == "MultipleAnswerVariant") {   
        variantAnswers = null;
        if (GradingType_question == "SingleAnswerVariant") {
            if (response !== null) {
                total = response["singleAnswerVariantStatistic"]["totalResponses"]
                var variantAnswers = response["singleAnswerVariantStatistic"].variantAnswers;
            }
        }
        else {
            if (response !== null) {
                total = response["multipleAnswerVariantStatistic"]["totalResponses"]
                var variantAnswers = response["multipleAnswerVariantStatistic"].variantAnswers;
            }
        }
        result = [];
        if (variantAnswers !== null) {
            var variantAnswersMap = variantAnswers.reduce((map, answer) => {
                map[answer.responseVariantId] = answer;
                return map;
            }, {});
        }
        
        for (var j = 0; j < Question_info.length; j++) {
            var questionId = Question_info[j].Id;
            var result_item = {};

            if (variantAnswers !== null && variantAnswersMap.hasOwnProperty(questionId)) {
                var responseObject = JSON.parse(variantAnswersMap[questionId].responseValue);
                if (responseObject[Lang_textBoxInstance] !== "") {
                    result_item["arg"] = responseObject[Lang_textBoxInstance];
                } else {
                    var found = false;
                    ["EN", "RU", "RO"].forEach(lang => {
                        if (!found && responseObject[lang] !== "") {
                            result_item["arg"] = responseObject[lang];
                            found = true;
                        }
                    });
                }
                result_item["val"] = variantAnswersMap[questionId].responseCount;
            } else {
                if (Question_info[j].Response[Lang_textBoxInstance] !== "") {
                    result_item["arg"] = Question_info[j].Response[Lang_textBoxInstance];
                } else {
                    var found = false;
                    ["EN", "RU", "RO"].forEach(lang => {
                        if (!found && Question_info[j].Response[lang] !== "") {
                            result_item["arg"] = Question_info[j].Response[lang];
                            found = true; 
                        }
                    });
                }
                result_item["val"] = 0;
            }
            result.push(result_item);
        }
    } else if (GradingType_question == "Point5Score") {
        var totalGrade1 = 0;
        var totalGrade2 = 0;
        var totalGrade3 = 0;
        var totalGrade4 = 0;
        var totalGrade5 = 0;
        if (response !== null) {
            total = response["point5ScoreStatistic"]["totalResponses"]
            totalGrade1 = response["point5ScoreStatistic"]["totalGrade1"];
            totalGrade2 = response["point5ScoreStatistic"]["totalGrade2"];
            totalGrade3 = response["point5ScoreStatistic"]["totalGrade3"];
            totalGrade4 = response["point5ScoreStatistic"]["totalGrade4"];
            totalGrade5 = response["point5ScoreStatistic"]["totalGrade5"];
        }
        result = [
            {
                arg: "1",
                val: totalGrade1
            },
            {
                arg: "2",
                val: totalGrade2
            },
            {
                arg: "3",
                val: totalGrade3
            },
            {
                arg: "4",
                val: totalGrade4
            },
            {
                arg: "5",
                val: totalGrade5
            }
        ];
    }
    
    if (result !== undefined) {
        maxVal = result.reduce(function (max, item) {
            return Math.max(max, item.val);
        }, -Infinity);
    }

    if (result !== undefined) {
        total = result.reduce(function (total_value, item) {
            return total_value + item.val;
        }, 0);
    } else total = 0;
    var ChartInstance = $("#Char_div").dxChart("instance");
    ChartInstance.option("dataSource", result);

    var tittle = "";
    if (Lang_textBoxInstance == "RO") tittle = "Numărul total de răspunsuri ";
    if (Lang_textBoxInstance == "RU") tittle = "Общее количество ответов ";
    if (Lang_textBoxInstance == "EN") tittle = "Total number responses ";
    if (total == undefined || total == null) total = 0;
    ChartInstance.option("title", tittle + total);
    $(".dxc-arg-elements").attr("transform", "translate(-10, 0)");
    flag = true;
}
var flag = false;
var observer_2 = new MutationObserver(function (mutationsList, observer) {
    for (var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (var i = mutation.addedNodes.length - 1; i >= 0; i--) {
                var addedNode = mutation.addedNodes[i];
                if (flag = true && result !== undefined && isReadyContent === true && addedNode.nodeType === Node.ELEMENT_NODE && addedNode.matches('.dxc-labels')) {

                    Chart_content();
                }
            }
        }
    }
});

observer_2.observe(document.body, { childList: true, subtree: true });


//window.addEventListener('load', (event) => {
//
//    Chart_content();
//});

//if (document.readyState == 'complete') {
//
//    Chart_content();
//}


//function someFunction() {
//    for (let i = 0; i < 1000000; i++) {
//        Math.sqrt(i);
//    }
//}


//const measureButton = document.getElementById('measureButton');

//measureButton.addEventListener('click', () => {

//    performance.mark('start-someFunction');

//    someFunction();

//    performance.mark('end-someFunction');


//    performance.measure('someFunction', 'start-someFunction', 'end-someFunction');
//    const measure = performance.getEntriesByName('someFunction')[0];


//    console.log(`someFunction took ${measure.duration}ms`);

//    performance.clearMarks('start-someFunction');
//    performance.clearMarks('end-someFunction');
//    performance.clearMeasures('someFunction');
//});


