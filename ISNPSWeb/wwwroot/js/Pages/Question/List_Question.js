var Tittle;
var Comentary;
var idanswert = 1;



//function onAddQuestion(questionId) {
    
//    var inputElement = document.getElementById("input_Question_" + questionId);

//    var inputform = document.querySelector('form');
//    var flag = false;

//    if (inputElement != null && inputform == null) {
//        var divElementQuestion = document.getElementById("input_Question_" + questionId);
//        var formElement = document.createElement("form");
//        formElement.name = "editQuestion_" + questionId;
//        formElement.action = "/Question/POST_Upsert_Question";
//        formElement.method = "POST";
//        formElement.autocomplete = "off";

//        while (divElementQuestion.firstChild) {
//            formElement.appendChild(divElementQuestion.firstChild);
//        }

//        divElementQuestion.parentNode.replaceChild(formElement, divElementQuestion);

//        var modalFooter = document.getElementById("footer_button_" + questionId);
//        modalFooter.style.display = "block";
//        flag = true;
//    }
//    else if (inputform.length > 0) {
//        var editQuestion = document.getElementsByName("editQuestion_" + questionId).length;

//        if (editQuestion == 1) {
//            var modalFooter = document.getElementById("footer_button_" + questionId);
//            modalFooter.style.display = "block";
//            flag = true;
//        } else {
//            flag = false;
//        }
//    }
//    if (flag) {
     
//        var idDiv = '<div id="Answert_Input' + questionId + idanswert + '">';
//        var textBox = $(idDiv)
//            .dxTextBox({
//                inputAttr: { 'id': "Answert_Response_input" },
//                labelMode: 'floating',
//                label: formatMessage('Enter_Answert'),
//                name: 'Answert_Response_input',
//                placeholder: formatMessage('Enter_Question'),
//                id: 'Answert_Response_' + questionId + '_' + idanswert,
//                visible: true,
//                readOnly: false
//            });

//        $("#input_Answert_" + questionId).replaceWith(textBox);

        
//        var count_answert_add = $('div[id^="Answert_Input"]').length;
//        var count_answert = $('div[id^="Answert_Response_"]').length;
//        if (count_answert_add + count_answert > 1) {
//            var idDiv_button = '<div id="Button_Answert_Input' + idanswert + '">';
//            var devbutton = $(idDiv_button)
//                .dxButton({
//                    label: 'Button_Answert_Response_input',
//                    name: 'Button_Answert_Response_input',
//                    text: formatMessage('Delet'),
//                    type: 'danger',
//                    id: 'Button_Answert_Response_' + questionId + '_' + idanswert,
//                    visible: true,
//                    icon: 'delet',
//                    width: '100%',
//                    onClick: function (e) {

//                        var buttonData = e.component.option();
//                        var buttonId = buttonData.id;
//                        var parts = buttonId.split('_');
//                        var parentElement = $('div[id^="Button_Answert_Input' + parts[4] + '"]').parent().parent().parent();
//                        parentElement.remove();
//                    }
//                });

//            $("#button_input_Answert_" + questionId).replaceWith(devbutton);
//            idanswert++;
//        }

//        var lastContainer = document.querySelector('.named-container_' + questionId + ':last-child');
//        var newBlockHTML =
//            '<div class="named-container_' + questionId + '">' +
//            '<div class="row" style="margin-top:; margin-right:; margin-left: 0rem; --bs-gutter-x:;">' +
//            '<div class="col-10">' +
//            '<div id="input_Answert_' + questionId + '"></div>' +
//            '</div>' +
//            '<div style="top:6px" class="col-2">' +
//            '<div id="button_input_Answert_' + questionId + '"></div>' +
//            '</div>' +
//            '</div>' +
//            '</div>';
//        lastContainer.insertAdjacentHTML('afterend', newBlockHTML);
      
//    }
//}




//function onUPQuestions(questionId) {
//    
//    var div1 = $('#Question_root_' + questionId);
//    var isinputform_div_1 = div1.children().is('form');

//    var div_next = div1.next();

//    var div2 = div1.prev();
//    var isinputform_div_2 = div2.children().is('form');

//    if (!isinputform_div_1 && !isinputform_div_2) {
//        var div3 = div2.prev();
//        var div3_Question_root_ = div3.attr('id');

//        var div1Id = div1.attr('id');
//        var div2Id = div2.attr('id');
//        var div_next_id = div_next.attr('id');

//        var parts = div2Id.split('_');
//        var QuestionIDdiv2 = parts[2];

//        var Index_h3_1 = $('#Index_Question_value_' + questionId);
//        var Index_h3_1_id = Index_h3_1.text().split(" ");
//        var Index_1 = Index_h3_1_id[1];

//        var Index_h3_2 = $('#Index_Question_value_' + QuestionIDdiv2);
//        var Index_h3_2_id = Index_h3_2.text().split(" ");
//        var Index_2 = Index_h3_2_id[1];

//        Index_h3_1.text("Вопрос " + Index_2);
//        Index_h3_2.text("Вопрос " + Index_1);

//        //POST_UP_Up_Question(questionId, Index_2);
//        //POST_UP_Up_Question(QuestionIDdiv2, Index_1);

//        var Button_Up_1 = $("#Up_Question_" + questionId).dxButton("instance");
//        var Button_Up_2 = $("#Up_Question_" + QuestionIDdiv2).dxButton("instance");

//        Button_Up_1.repaint();
//        Button_Up_2.repaint();

//        var childrenOfDiv1 = div1.children();
//        var childrenOfDiv2 = div2.children();

//        var value_div1 = getQuestionElements(questionId);
//        var value_div2 = getQuestionElements(QuestionIDdiv2);

//        div1.empty();
//        div2.empty();

//        div1.append(childrenOfDiv2);
//        div2.append(childrenOfDiv1);

//        div1.attr('id', div2Id);
//        div2.attr('id', div1Id);

//        Redrawing(questionId, value_div1.Index_Question, value_div1.QuestionnaireId, value_div1.CreateData, value_div1.Question, value_div1.Comentary, value_div1.GradingType, value_div1.ResponseVariants)
//        Redrawing(QuestionIDdiv2, value_div2.Index_Question, value_div2.QuestionnaireId, value_div2.CreateData, value_div2.Question, value_div2.Comentary, value_div2.GradingType, value_div2.ResponseVariants)
//        var Button_Up_Question_ = $('#Button_Up_Question_' + questionId);
//        Button_Up_Question_.append(Button_Up_1);

//        var Button_Up_Question_2 = $('#Button_Up_Question_' + QuestionIDdiv2);
//        Button_Up_Question_2.append(Button_Up_2);

//        var Col_Button_Up_Question_1 = $("#Col_Button_Up_Question_" + questionId).empty();
//        var Col_Button_Up_Question_2 = $("#Col_Button_Up_Question_" + QuestionIDdiv2).empty();

//        var Button_Up_Question_1 = document.createElement('div');
//        Button_Up_Question_1.id = 'Button_Up_Question_' + questionId;
//        Col_Button_Up_Question_1.append(Button_Up_Question_1);

//        var Button_Up_Question_2 = document.createElement('div');
//        Button_Up_Question_2.id = 'Button_Up_Question_' + QuestionIDdiv2;
//        Col_Button_Up_Question_2.append(Button_Up_Question_2);
//        if (div3_Question_root_ == undefined) {
//            var devbutton = $('<div id="Up_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: true,
//                width: 120,
//                onClick: function () { onUPQuestions(questionId); }
//            });

//            Button_Up_Question_1.append(devbutton.get(0));
//            var devbutton2 = $('<div id="Up_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onUPQuestions(QuestionIDdiv2); }
//            });
//            Button_Up_Question_2.append(devbutton2.get(0));
//        }
//        else {
//            var devbutton = $('<div id="Up_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onUPQuestions(questionId); }
//            });

//            Button_Up_Question_1.append(devbutton.get(0));
//            var devbutton2 = $('<div id="Up_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onUPQuestions(QuestionIDdiv2); }
//            });
//            Button_Up_Question_2.append(devbutton2.get(0));
//        }

//        var Col_Button_Down_Question_1 = $("#Col_Button_Down_Question_" + questionId).empty();
//        var Col_Button_Down_Question_2 = $("#Col_Button_Down_Question_" + QuestionIDdiv2).empty();

//        var Button_Down_Question_1 = document.createElement('div');
//        Button_Down_Question_1.id = 'Button_Down_Question_' + questionId;
//        Col_Button_Down_Question_1.append(Button_Down_Question_1);

//        var Button_Down_Question_2 = document.createElement('div');
//        Button_Down_Question_2.id = 'Button_Down_Question_' + QuestionIDdiv2;
//        Col_Button_Down_Question_2.append(Button_Down_Question_2);

//        if (div_next_id == "AddQuestion") {
//            var devbutton = $('<div id="Down_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onDownQuestions(questionId); }
//            });

//            Button_Down_Question_1.append(devbutton.get(0));

//            var devbutton2 = $('<div id="Down_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: true,
//                width: 120,
//                onClick: function () { onDownQuestions(QuestionIDdiv2); }
//            });
//            Button_Down_Question_2.append(devbutton2.get(0));
//        }
//        else {
//            var devbutton = $('<div id="Down_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onDownQuestions(questionId); }
//            });

//            Button_Down_Question_1.append(devbutton.get(0));

//            var devbutton2 = $('<div id="Down_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onDownQuestions(QuestionIDdiv2); }
//            });
//            Button_Down_Question_2.append(devbutton2.get(0));
//        }
//    }
//}
//function onDownQuestions(questionId) {
//    var div1 = $('#Question_root_' + questionId);
//    var isinputform_div_1 = div1.children().is('form');
//    var div2 = div1.next();
//    var isinputform_div_2 = div2.children().is('form');
//    if (!isinputform_div_1 && !isinputform_div_2)
//    {
//        var div3 = div2.next();
//        var divprev = div1.prev();
//        var div3_Question_root_ = div3.attr('id');


//        var div1Id = div1.attr('id');
//        var div2Id = div2.attr('id');
//        var div_prev_Id = divprev.attr('id');

//        var parts = div2Id.split('_');
//        var QuestionIDdiv2 = parts[2];

//        var Index_h3_1 = $('#Index_Question_value_' + questionId);
//        var Index_h3_1_id = Index_h3_1.text().split(" ");
//        var Index_1 = Index_h3_1_id[1];

//        var Index_h3_2 = $('#Index_Question_value_' + QuestionIDdiv2);
//        var Index_h3_2_id = Index_h3_2.text().split(" ");
//        var Index_2 = Index_h3_2_id[1];

//        Index_h3_1.text("Вопрос " + Index_2);
//        Index_h3_2.text("Вопрос " + Index_1);

//        //POST_UP_Down_Question(questionId, Index_2);
//        //POST_UP_Down_Question(QuestionIDdiv2, Index_1);

//        var Button_Down_1 = $("#Down_Question_" + questionId).dxButton("instance");
//        var Button_Down_2 = $("#Down_Question_" + QuestionIDdiv2).dxButton("instance");

//        var childrenOfDiv1 = div1.children();
//        var childrenOfDiv2 = div2.children();

//        var value_div1 = getQuestionElements(questionId);
//        var value_div2 = getQuestionElements(QuestionIDdiv2);

//        div1.empty();
//        div2.empty();

//        div1.append(childrenOfDiv2);
//        div2.append(childrenOfDiv1);

//        div1.attr('id', div2Id);
//        div2.attr('id', div1Id);

//        Redrawing(questionId, value_div1.Index_Question, value_div1.QuestionnaireId, value_div1.CreateData, value_div1.Question, value_div1.Comentary, value_div1.GradingType, value_div1.ResponseVariants)
//        Redrawing(QuestionIDdiv2, value_div2.Index_Question, value_div2.QuestionnaireId, value_div2.CreateData, value_div2.Question, value_div2.Comentary, value_div2.GradingType, value_div2.ResponseVariants)

//        //var Button_Down_Question_ = $('#Button_Down_Question_' + questionId);
//        //Button_Down_Question_.append(Button_Down_1);

//        //var Button_Down_Question_2 = $('#Button_Down_Question_' + questionId);
//        //Button_Down_Question_2.append(Button_Down_2);

//        var Col_Button_Down_Question_1 = $("#Col_Button_Down_Question_" + questionId).empty();
//        var Col_Button_Down_Question_2 = $("#Col_Button_Down_Question_" + QuestionIDdiv2).empty();

//        var Button_Down_Question_1 = document.createElement('div');
//        Button_Down_Question_1.id = 'Button_Down_Question_' + questionId;
//        Col_Button_Down_Question_1.append(Button_Down_Question_1);

//        var Button_Down_Question_2 = document.createElement('div');
//        Button_Down_Question_2.id = 'Button_Down_Question_' + QuestionIDdiv2;
//        Col_Button_Down_Question_2.append(Button_Down_Question_2);

//        if (div3_Question_root_ == "AddQuestion") {

//            var devbutton = $('<div id="Down_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: true,
//                width: 120,
//                onClick: function () { onDownQuestions(questionId); }
//            });

//            Button_Down_Question_1.append(devbutton.get(0));

//            var devbutton2 = $('<div id="Down_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onDownQuestions(QuestionIDdiv2); }
//            });
//            Button_Down_Question_2.append(devbutton2.get(0));
//        }
//        else {
//            var devbutton = $('<div id="Down_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onDownQuestions(questionId); }
//            });

//            Button_Down_Question_1.append(devbutton.get(0));

//            var devbutton2 = $('<div id="Down_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-down',
//                text: 'Down',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onDownQuestions(QuestionIDdiv2); }
//            });
//            Button_Down_Question_2.append(devbutton2.get(0));
//        }
//        var Col_Button_Up_Question_1 = $("#Col_Button_Up_Question_" + questionId).empty();
//        var Col_Button_Up_Question_2 = $("#Col_Button_Up_Question_" + QuestionIDdiv2).empty();

//        var Button_Up_Question_1 = document.createElement('div');
//        Button_Up_Question_1.id = 'Button_Up_Question_' + questionId;
//        Col_Button_Up_Question_1.append(Button_Up_Question_1);

//        var Button_Up_Question_2 = document.createElement('div');
//        Button_Up_Question_2.id = 'Button_Up_Question_' + QuestionIDdiv2;
//        Col_Button_Up_Question_2.append(Button_Up_Question_2);

//        if (div_prev_Id == undefined) {
//            var devbutton = $('<div id="Up_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onUPQuestions(questionId); }
//            });

//            Button_Up_Question_1.append(devbutton.get(0));

//            var devbutton2 = $('<div id="Up_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: true,
//                width: 120,
//                onClick: function () { onUPQuestions(QuestionIDdiv2); }
//            });
//            Button_Up_Question_2.append(devbutton2.get(0));
//        } else {
//            var devbutton = $('<div id="Up_Question_' + questionId + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onUPQuestions(questionId); }
//            });

//            Button_Up_Question_1.append(devbutton.get(0));

//            var devbutton2 = $('<div id="Up_Question_' + QuestionIDdiv2 + '">').dxButton({
//                icon: 'fas fa-arrow-up',
//                text: 'Up',
//                type: 'normal',
//                visible: true,
//                disabled: false,
//                width: 120,
//                onClick: function () { onUPQuestions(QuestionIDdiv2); }
//            });
//            Button_Up_Question_2.append(devbutton2.get(0));
//        }
//    }
//}

//function POST_UP_Down_Question(questionId, valueOfTextBoxInDiv) {
//    
//    var url = "/Question_API/Question/" + questionId;
//    ISNPS.ajaxGET_Question(url, valueOfTextBoxInDiv) 
//}

//function getQuestionElements(questionId) {
//    
//    var Index_ = $("#Index_" + questionId).dxTextBox("instance");
//    var Index_Question = Index_.option("value");

//    var QuestionnaireId_ = $("#QuestionnaireId_" + questionId).dxTextBox("instance");
//    var QuestionnaireId = QuestionnaireId_.option("value");

//    var CreateData_ = $("#CreateData_" + questionId).dxTextBox("instance");
//    var CreateData = CreateData_.option("value");

//    var Tittle_ = $("#Tittle_" + questionId).dxTextBox("instance");
//    var Question = Tittle_.option("value");

//    var Comentary_ = $("#Comentary_" + questionId).dxTextArea("instance");
//    var Comentary = Comentary_.option("value");

//    var GradingType_Temp_ = $("#GradingType_Temp_" + questionId).dxTextBox("instance");
//    var GradingType = GradingType_Temp_.option("value");

//    var ResponseVariants = [];

//    if (GradingType == "SingleAnswerVariant" || GradingType == "MultipleAnswerVariant") {
//        var Answert_Response_ = document.querySelectorAll('[id^="Answert_Response_' + questionId + '"]')
//        for (let i = 0; i < Answert_Response_.length - 1; i++)
//        {
//            var element = $(Answert_Response_[i]).dxTextBox("instance");
//            if (element) {
//                var responseVariants = {};
//                var Answert_Response_value = element.option("value");
//                responseVariants.Id = 0;
//                responseVariants.QuestionId = questionId;
//                responseVariants.Response = Answert_Response_value;
//                ResponseVariants.push(responseVariants);
//            }
//        }

//        var named_container_ = document.querySelectorAll('[class^="named-container_' + questionId + '"]')
//        for (let i = 0; i < named_container_.length - 1; i++) {
//            var responseVariants = {};
//            var $named_container = $(named_container_[i]);
//            var Answert_Response = $named_container.children().children().children().dxTextBox("instance");
//            var Answert_Response_value = Answert_Response.option("value");
//            responseVariants.Id = 0;
//            responseVariants.QuestionId = questionId;
//            responseVariants.Response = Answert_Response_value;
//            ResponseVariants.push(responseVariants);
//        }
//    }
//    var elements = {
//        Index_Question: Index_Question ,
//        QuestionnaireId: QuestionnaireId,
//        CreateData: CreateData,
//        Question: Question,
//        Comentary: Comentary,
//        GradingType: GradingType,
//        ResponseVariants: ResponseVariants
//    };
//    return elements;
//}
//
//var div1 = $('#Question_root_' + questionId);
//var div2 = div1.next();
//var div3 = div2.next();
//var div3_Question_root_ = div3.attr('id');

//var div1Id = div1.attr('id');
//var div2Id = div2.attr('id');

//var parts = div2Id.split('_');
//var QuestionIDdiv2 = parts[2];

//var div1_header = div1.find("#Index_Question_value_" + questionId);
//var nextButtonInDiv1 = div1.find('#Button_Down_Question_' + questionId);
//var downQuestionElements1 = div1.find("#Down_Question_" + questionId).dxButton('instance');

//if (div3_Question_root_ == "AddQuestion") {
    //nextButtonInDiv1.empty();
    //var devbutton = $('<div id="Down_Question_' + questionId + '">').dxButton({
    //    icon: 'fas fa-arrow-down',
    //    text: 'Down',
    //    type: 'normal',
    //    visible: true,
    //    disabled: true,
    //    width: 120,
    //    onClick: function () { onDownQuestions(questionId); }
    //}).attr('aria-disabled', 'false');;
    //nextButtonInDiv1.append(devbutton);
//}

//var valueOfheaderDiv1 = div1_header.text().split(" ");

//var div2_header = div2.find("#Index_Question_value_" + QuestionIDdiv2);
//var nextButtonInDiv2 = div2.find('#Button_Down_Question_' + QuestionIDdiv2);
//var downQuestionElements2 = div2.find("#Down_Question_" + QuestionIDdiv2).dxButton('instance');

//if (div3_Question_root_ == "AddQuestion") {
//    //nextButtonInDiv2.empty();
//    //var devbutton2 = $('<div id="Down_Question_' + QuestionIDdiv2 + '">').dxButton({
//    //    icon: 'fas fa-arrow-down',
//    //    text: 'Down',
//    //    type: 'normal',
//    //    visible: true,
//    //    disabled: false,
//    //    width: 120,
//    //    onClick: function () { onDownQuestions(QuestionIDdiv2); }
//    //}).attr('aria-disabled', 'false');;
//    //nextButtonInDiv2.append(devbutton2);

//}

//var valueOfheaderDiv2 = div2_header.text().split(" ");
//div1_header.text("Вопрос " + valueOfheaderDiv2[1]);
//div2_header.text("Вопрос " + valueOfheaderDiv1[1]);


////$('Index_' + QuestionIDdiv2).val(valueOfTextBoxInDiv1);
////$('Index_' + questionId).val(valueOfTextBoxInDiv2);

////var textBox = document.getElementById('Index_' + questionId);
////textBox.value = valueOfTextBoxInDiv2;
////var textBox2 = document.getElementById('Index_' + QuestionIDdiv2);
////textBox2.value = valueOfTextBoxInDiv1;


////POST_UP_Down_Question(questionId, valueOfTextBoxInDiv2);

////POST_UP_Down_Question(QuestionIDdiv2, valueOfTextBoxInDiv1);
//if (div3_Question_root_ !== "AddQuestion") {
//    downQuestionElements1.repaint();
//    downQuestionElements2.repaint();
//}
////var div1Content = div1.html();
////var div2Content = div2.html();

////div1.empty();
////div2.empty();

////div1.attr('id', div2Id).html(div2Content);
////div2.attr('id', div1Id).html(div1Content);


//var childrenOfDiv1 = div1.children();
//var childrenOfDiv2 = div2.children();

//div1.empty();
//div2.empty();

//div1.append(childrenOfDiv2);
//div2.append(childrenOfDiv1);


//div1.attr('id', div2Id);
//div2.attr('id', div1Id);

//if (div3_Question_root_.length == 0) {
//    //var nextButtonInDiv1 = $('#Button_Down_Question_' + questionId);
//    //var downQuestionElements1 = $("#Down_Question_" + questionId).dxButton('instance');

//    //var nextButtonInDiv2 = $('#Button_Down_Question_' + QuestionIDdiv2);
//    //var downQuestionElements2 = $("#Down_Question_" + QuestionIDdiv2).dxButton('instance');


//    nextButtonInDiv1.remove();
//    //var devbutton = $('<div id="Down_Question_' + questionId + '">').dxButton({
//    //    icon: 'fas fa-arrow-down',
//    //    text: 'Down',
//    //    type: 'normal',
//    // //   visible: true,
//    //  //  disabled: true,
//    //    width: 120,
//    //    onClick: function () { onDownQuestions(questionId); }
//    //}).attr('aria-disabled', 'false').repaint();
//    nextButtonInDiv1.append(devbutton);


//    nextButtonInDiv2.remove();
//    //var devbutton2 = $('<div id="Down_Question_' + QuestionIDdiv2 + '">').dxButton({
//    //    icon: 'fas fa-arrow-down',
//    //    text: 'Down',
//    //    type: 'normal',
//    //  //  visible: true,
//    //  //  disabled: false,
//    //    width: 120,
//    //    onClick: function () { onDownQuestions(QuestionIDdiv2); }
//    //}).attr('aria-disabled', 'false').repaint();
//    nextButtonInDiv2.append(devbutton2);
//    //var DisabledButtonDiv1 = div1.find('#Down_Question_' + QuestionIDdiv2).dxButton('instance');
//    //DisabledButtonDiv1.option('disabled', true);

//    //var ButtonDiv1 = $('#Down_Question_' + QuestionIDdiv2);
//    //ButtonDiv1.removeClass(function (index, className) {
//    //    return (className.match(/(^|\s)dx-state-disabled($|\s)/g) || []).join(' ');
//    //});
//    //ButtonDiv1.attr('tabindex', '0');
//    //var classdiv2 = ButtonDiv1.attr("class");

//    //var DisabledButtonDiv1 = div1.find('#Down_Question_' + QuestionIDdiv2).dxButton('instance');


//    //var DisabledButtonDiv1 = div1.find('#Down_Question_' + QuestionIDdiv2).dxButton('instance');
//    //DisabledButtonDiv1.option('disabled', false);

//    //var divElement = div1.find('#Button_Down_Question_' + QuestionIDdiv2);

//    //divElement.empty();

//    //var devbutton = $('<div>').attr('id', 'Down_Question_' + QuestionIDdiv2).dxButton({
//    //    icon: 'fas fa-arrow-down',
//    //    text: 'Down',
//    //    type: 'normal',
//    //    visible: true,
//    //    width: 120,
//    //    onClick: function () { onDownQuestions(QuestionIDdiv2); }
//    //});
//    //divElement.append(devbutton);
//}



//function Redrawing(Question_ID, Index_Question, QuestionnaireId, CreateData, Question, Comentary, GradingType, ResponseVariants) {
//    
//    var div_root = $("#Question_root_" + Question_ID).empty();
//    if (div_root != null) {
//        var input_Question = document.createElement('div');
//        input_Question.id = 'input_Question_' + Question_ID;
//        div_root.append(input_Question);


//        //Container
//        //#region container
//        var container_button = document.createElement('div');
//        container_button.className = 'container';
//        input_Question.append(container_button);

//        var row_button = document.createElement('div');
//        row_button.className = 'row';
//        container_button.append(row_button);
//        //ROW
//        //#region ROW
//        var count_Question = $('[id^="Question_root_"]').length;

//        var Col_Button_Edit_Question_ = document.createElement('div');
//        Col_Button_Edit_Question_.className = 'col';
//        Col_Button_Edit_Question_.id = 'Col_Button_Edit_Question_' + Question_ID;
//        row_button.append(Col_Button_Edit_Question_);

//        var Button_Edit_Question_ = document.createElement('div');
//        Button_Edit_Question_.id = 'Button_Edit_Question_' + Question_ID;
//        Col_Button_Edit_Question_.append(Button_Edit_Question_);
//        var Edit_Question_ = $('<div id="Edit_Question_' + Question_ID + '">').dxButton({
//            id: 'Edit_Question_' + Question_ID,
//            text: 'Edit',
//            icon: 'edit',
//            type: 'normal',
//            stylingMode: 'outlined',
//            width: 120,
//            onClick: function () {
//                onEditQuestions(Question_ID);
//            },
//            visible: true,
//        });

//        Button_Edit_Question_.append(Edit_Question_.get(0));

//        var Col_Button_Up_Question_ = document.createElement('div');
//        Col_Button_Up_Question_.className = 'col';
//        Col_Button_Up_Question_.id = 'Col_Button_Up_Question_' + Question_ID;
//        row_button.appendChild(Col_Button_Up_Question_);

//        var Col_Button_Down_Question_ = document.createElement('div');
//        Col_Button_Down_Question_.className = 'col';
//        Col_Button_Down_Question_.id = 'Col_Button_Down_Question_' + Question_ID;
//        row_button.appendChild(Col_Button_Down_Question_);

//        var Col_Button_Delet_Question_ = document.createElement('div');
//        Col_Button_Delet_Question_.className = 'col';
//        Col_Button_Delet_Question_.id = 'Col_Button_Delet_Question_' + Question_ID;
//        row_button.append(Col_Button_Delet_Question_);

//        var Button_Delet_Question_ = document.createElement('div');
//        Button_Delet_Question_.id = 'Button_Down_Question_' + Question_ID;
//        Col_Button_Delet_Question_.append(Button_Delet_Question_);
//        var Delet_Question_ = $('<div id="Delet_Question_' + Question_ID + '">').dxButton({
//            id: 'Delet_Question_' + Question_ID,
//            text: 'Delet',
//            icon: 'trash',
//            type: 'danger',
//            stylingMode: 'outlined',
//            width: 120,
//            onClick: function () {
//                onDeletQuestions(Question_ID, Question);
//            },
//            visible: true,
//        });
//        Button_Delet_Question_.append(Delet_Question_.get(0));
//        // #endregion
//        // #endregion

//        var Question_ = document.createElement('div');
//        Question_.id = 'Question_' + Question_ID;
//        input_Question.append(Question_);

//        var Index_Question_ = document.createElement('div');
//        Index_Question_.id = 'Index_Question_' + Question_ID;
//        Question_.append(Index_Question_);
//        var Index_Question_TextBox = $('<div id="Index_' + Question_ID + '">').dxTextBox({
//            id: 'Index_' + Question_ID,
//            value: Index_Question,
//            labelMode: 'floating',
//            label: 'Index',
//            name: 'Index',
//            visible: false,
//            readOnly: true,
//        }).attr('InputAttr', Index_Question);

//        Index_Question_.append(Index_Question_TextBox.get(0));


//        var QuestionID_ = document.createElement('div');
//        QuestionID_.id = 'QuestionID_' + Question_ID;
//        Question_.append(QuestionID_);

//        var Id_Question_TextBox = $('<div id="Id_' + Question_ID + '">').dxTextBox({
//            id: 'Id_' + Question_ID,
//            value: Question_ID,
//            labelMode: 'floating',
//            label: 'Id',
//            name: 'Id',
//            visible: false,
//            readOnly: true,
//        }).attr('InputAttr', Question_ID);

//        QuestionID_.append(Id_Question_TextBox.get(0));

//        var QuestionnaireId_ = document.createElement('div');
//        QuestionnaireId_.id = 'QuestionnaireId_' + QuestionnaireId;
//        Question_.append(QuestionnaireId_);

//        var QuestionnaireId_textbox = $('<div id="QuestionnaireId_' + Question_ID + '">').dxTextBox({
//            id: 'QuestionnaireId_' + Question_ID,
//            value: QuestionnaireId,
//            labelMode: 'floating',
//            label: 'QuestionnaireId',
//            name: 'QuestionnaireId',
//            visible: false,
//            readOnly: true,
//        }).attr('InputAttr', QuestionnaireId);

//        QuestionnaireId_.append(QuestionnaireId_textbox.get(0));


//        var CreateData_ = document.createElement('div');
//        CreateData_.id = 'CreateData_' + CreateData;
//        Question_.append(CreateData_);

//        var CreateData_textbox = $('<div id="CreateData_' + Question_ID + '">').dxTextBox({
//            id: 'CreateData_' + Question_ID,
//            value: CreateData,
//            labelMode: 'floating',
//            label: 'CreateData',
//            name: 'CreateData',
//            visible: false,
//            readOnly: true,
//        }).attr('InputAttr', CreateData);

//        CreateData_.append(CreateData_textbox.get(0));


//        var h3_Index_Question = document.createElement('h3');
//        h3_Index_Question.id = 'Index_Question_value_' + Index_Question;
//        h3_Index_Question.textContent = 'Вопрос ' + Index_Question;
//        Question_.append(h3_Index_Question);

//        var Tittle_Question_ = document.createElement('div');
//        Tittle_Question_.id = 'Tittle_Question_' + Question_ID;
//        Question_.append(Tittle_Question_);

//        var Question_textbox = $('<div id="Tittle_' + Question_ID + '">').dxTextBox({
//            id: 'Tittle_' + Question_ID,
//            value: Question,
//            labelMode: 'floating',
//            label: 'Question',
//            name: 'Question',
//            visible: true,
//            readOnly: true,
//        }).attr('InputAttr', Question);

//        Tittle_Question_.append(Question_textbox.get(0));


//        var Comentory_Question_ = document.createElement('div');
//        Comentory_Question_.id = 'Comentory_Question_' + Question_ID;
//        Question_.append(Comentory_Question_);

//        var Comentary_TextArea = $('<div id="Comentary_' + Question_ID + '">').dxTextArea({
//            id: 'Comentary_' + Question_ID,
//            value: Comentary,
//            labelMode: 'floating',
//            label: 'Comentary',
//            name: 'Comentary',
//            visible: true,
//            readOnly: true,
//        }).attr('InputAttr', Comentary);

//        Comentory_Question_.append(Comentary_TextArea.get(0));


//        var GradingType_Question_ = document.createElement('div');
//        GradingType_Question_.id = 'GradingType_Question_' + Question_ID;
//        Question_.append(GradingType_Question_);

//        var GradingType_textbox = $('<div id="GradingType_Temp_' + Question_ID + '">').dxTextBox({
//            id: 'GradingType_Temp_' + Question_ID,
//            value: GradingType,
//            labelMode: 'floating',
//            label: 'GradingType_Temp',
//            name: 'GradingType_Temp',
//            visible: true,
//            readOnly: true,
//        }).attr('InputAttr', GradingType);

//        GradingType_Question_.append(GradingType_textbox.get(0));

//        if (GradingType == "SingleAnswerVariant" || GradingType == "MultipleAnswerVariant") {

//            var Button_AddQuestion_Question_ = document.createElement('div');
//            Button_AddQuestion_Question_.id = 'ButtonAdd_Answert_Question_' + Question_ID;
//            Question_.append(Button_AddQuestion_Question_);


//            var AddQuestion_Button = $('<div id="AddQuestion' + Question_ID + '">').dxButton({
//                id: 'AddQuestion' + Question_ID,
//                text: 'Add',
//                icon: 'Add',
//                type: 'normal',
//                stylingMode: 'outlined',
//                width: 120,
//                onClick: function () {
//                    onAddQuestion(Question_ID);
//                },
//                visible: true,
//            });

//            Button_AddQuestion_Question_.append(AddQuestion_Button.get(0));

//            var h3 = document.createElement('h3');
//            h3.textContent = 'Список Вариантов ответов';
//            Question_.append(h3);

//            if (ResponseVariants !== null || ResponseVariants.length != 0) {
//                for (let i = 0; i < ResponseVariants.length; i++) {

//                    var Answert_ = document.createElement('div');
//                    Answert_.id = 'Answert_' + Question_ID;
//                    Question_.append(Answert_);

//                    var idanswert = Math.floor(Math.random() * 100000);
//                    var Answert_Id_ = $('<div id="Answert_Id_' + Question_ID + "_" + idanswert + '">').dxTextBox({
//                        id: 'Answert_Response_' + Question_ID + '_' + idanswert,
//                        value: 0,
//                        labelMode: 'floating',
//                        label: 'Answert_Id',
//                        name: 'Answert_Id',
//                        visible: false,
//                        readOnly: true,
//                    }).attr('InputAttr', ResponseVariants[i].Response);

//                    Answert_.append(Answert_Id_.get(0));

//                    var Answert_Response_ = $('<div id="Answert_Response_' + Question_ID + "_" + idanswert + '">').dxTextBox({
//                        id: 'Answert_Response_' + Question_ID + '_' + idanswert,
//                        value: ResponseVariants[i].Response,
//                        labelMode: 'floating',
//                        label: 'Answert_Response',
//                        name: 'Answert_Response',
//                        visible: true,
//                        readOnly: true,
//                    }).attr('InputAttr', ResponseVariants[i].Response);

//                    Answert_.append(Answert_Response_.get(0));
//                }

//                var named_container_ = document.createElement('div');
//                named_container_.className = 'named-container_' + Question_ID;
//                Question_.append(named_container_);

//                var row_named_container_ = document.createElement('div');
//                row_named_container_.className = 'row';
//                row_named_container_.style = 'margin-top:""; margin-right:""; margin-left: 0rem; --bs-gutter-x:""';
//                named_container_.append(row_named_container_);

//                var col_10_named_container_ = document.createElement('div');
//                col_10_named_container_.className = 'col-10';
//                row_named_container_.append(col_10_named_container_);

//                var input_Answert_ = document.createElement('div');
//                input_Answert_.id = 'input_Answert_' + Question_ID;
//                col_10_named_container_.append(input_Answert_);

//                var col_2_named_container_ = document.createElement('div');
//                col_2_named_container_.className = 'col-2';
//                col_2_named_container_.style = 'top:6px';
//                row_named_container_.append(col_2_named_container_);

//                var button_input_Answert_ = document.createElement('div');
//                button_input_Answert_.id = 'button_input_Answert_' + Question_ID;
//                col_2_named_container_.append(button_input_Answert_);
//            }
//        }

//        var footer_button_ = document.createElement('div');
//        footer_button_.id = 'footer_button_' + Question_ID;
//        footer_button_.className = 'modal-footer';
//        footer_button_.style = 'display: none;';
//        input_Question.append(footer_button_);


//        var Esc_Question_Button = $('<div>').dxButton({        
//            text: 'Cancel',
//            type: 'normal',
//            onClick: function () {
//                onEscEditClick(Question_ID);
//            },
//        });

//        var Save_Question_Button = $('<div>').dxButton({
//            text: 'Save',
//            type: 'success',
//            onClick: function () {
//                onEditQuestionClick(Question_ID);
//            },
//        });

//        footer_button_.append(Esc_Question_Button.get(0));
//        footer_button_.append(Save_Question_Button.get(0));
//        
//    }
//}