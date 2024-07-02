var formData =
{
    Command:
    {
        Questions: [],
        BaseQueryModel: {}
    },
};

function Question__Info(Question_id, index, formData) {
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
    questions.createData = new Date();
    questions.responseVariants = [];
    formData.Command.Questions.push(questions);
}

function onDeletQuestionClick(ID, name) {
    var textBox = $("#Tittle_Question_Delet");
    var Tittle = textBox.dxTextBox("instance").option("value");
    var modal = '#lgModalBody';
    if (Tittle.trim() == name.trim()) {
        ISNPS.ajaxGET("/Question_API/Delet_Question/" + ID + "/" + name.trim(), modal, null);
        var divElement = document.querySelector('#Question_root_' + ID);      
        if (divElement != null) {
            var curent_question = divElement.parentElement;
            while (true)
            {
                var elementsInHierarchy = curent_question.nextElementSibling;
                if (elementsInHierarchy === null) break;
                if (elementsInHierarchy.tagName.toLowerCase() === 'li' && elementsInHierarchy.classList.contains('tasks__item')) {
                    var Question_root_ = elementsInHierarchy.children;
                    var id_question = Question_root_[1].getAttribute("id").split("_");
                    id_question = id_question[2];

                    var h3Element = document.getElementById("Index_Question_value_" + id_question);
                    var value_index = h3Element.innerText.split(" ");
                    h3Element.innerText = value_index[0] + " " + (value_index[1] - 1);
                    value_index = value_index[1];
                    var indextextbox = $("#Index_Question_" + id_question).empty()
                    var Index_ = $('<div id="Index_' + id_question + '">').dxTextBox({
                        inputAttr: { 'id': 'Comentary' },
                        labelMode: 'floating',
                        label: 'Index',
                        name: 'Index',
                        id: 'Index_' + id_question,
                        visible: false,
                        readOnly: true,
                        value: value_index - 1
                    });
                    indextextbox.append(Index_[0]);
                    Question__Info(id_question, value_index - 1, formData)
                    curent_question = elementsInHierarchy;
                   
                } else break;
            }
            divElement.parentElement.remove();
            if (formData.Command.Questions.length > 0)
            {    
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
                    success: function (response)
                    {                                           
                        divElement.parentElement.remove();
                        var inputform = $("#addQuestion")[0];
                        if (inputform != null) {
                            var inputh3_index = inputform.querySelectorAll('[id^="Index_Question_value_"]');
                            var lastElement = inputh3_index[inputh3_index.length - 1];
                            var content = lastElement.textContent;
                            var index = content.split(" ");
                            if (index[1] == "") index = index[2]; else index = index[1]
                            lastElement.textContent = formatMessage('Question') + " " + (index - 1);

                            var textBox = $("#Index_Question");
                            textBox.remove();

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
                                value: (index - 1),
                            });
                            divIndex_Question.append(Index_Question_textBox[0]);
                            inputform.append(divIndex_Question);
                        }
                        var formData =
                        {
                            Command:
                            {
                                Questions: [],
                                BaseQueryModel: {}
                            },
                        };
                    },
                    error: function (xhr, status, error) {
                        var formData =
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
    }
    else {
        var textBox = $("#Tittle_Question_Delet").dxTextBox("instance");
        textBox.option({
            isValid: false,
            validationError: { message: formatMessage('Does_not_match') }
        });
    }
}