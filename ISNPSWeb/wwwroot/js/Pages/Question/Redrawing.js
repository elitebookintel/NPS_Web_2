//function Redrawing(Question_ID, Index_Question, QuestionnaireId, CreateData, Question, Comentary, GradingType, ResponseVariants) {

    //

    //var Button_Edit_Question_ = $("#Button_Edit_Question_" + Question_ID).empty();
    //var Edit_Question_ = $('<div id="Edit_Question_' + Question_ID + '">').dxButton({
    //    id: 'Edit_Question_' + Question_ID,
    //    text: 'Edit',
    //    icon: 'edit',
    //    type: 'normal',
    //    stylingMode: 'outlined',
    //    width: 120,
    //    onClick: function () {
    //        onEditQuestions(Question_ID);
    //    },
    //    visible: true,
    //});

    //Button_Edit_Question_.append(Edit_Question_.get(0));

    //var Button_Up_Question_ = $("#Button_Edit_Question_" + Question_ID).empty();
    //if (Up)
    //{
    //    var Up_Question_ = $('<div id="Up_Question_' + Question_ID + '">').dxButton({
    //        id: 'Up_Question_' + Question_ID,
    //        text: 'Up',
    //        icon: 'fas fa-arrow-up',
    //        type: 'normal',
    //        stylingMode: 'outlined',
    //        width: 120,
    //        onClick: function () {
    //            onUPQuestions(Question_ID);
    //        },
    //        visible: true,
    //        disabled: true,
    //    });
    //} else
    //{
    //    var Up_Question_ = $('<div id="Up_Question_' + Question_ID + '">').dxButton({
    //        id: 'Up_Question_' + Question_ID,
    //        text: 'Up',
    //        icon: 'fas fa-arrow-up',
    //        type: 'normal',
    //        stylingMode: 'outlined',
    //        width: 120,
    //        onClick: function () {
    //            onUPQuestions(Question_ID);
    //        },
    //        visible: true,
    //        disabled: false,
    //    });
    //}
    //Button_Up_Question_.append(Up_Question_.get(0));


    //var Button_Down_Question_ = $("#Button_Down_Question_" + Question_ID).empty();
    //if (Down) {
    //    var Down_Question_ = $('<div id="Down_Question_' + Question_ID + '">').dxButton({
    //        id: 'Down_Question_' + Question_ID,
    //        text: 'Down',
    //        icon: 'fas fa-arrow-down',
    //        type: 'normal',
    //        stylingMode: 'outlined',
    //        width: 120,
    //        onClick: function () {
    //            onDownQuestions(Question_ID);
    //        },
    //        visible: true,
    //        disabled: true,
    //    });
    //} else {
    //    var Down_Question_ = $('<div id="Down_Question_' + Question_ID + '">').dxButton({
    //        id: 'Down_Question_' + Question_ID,
    //        text: 'Down',
    //        icon: 'fas fa-arrow-down',
    //        type: 'normal',
    //        stylingMode: 'outlined',
    //        width: 120,
    //        onClick: function () {
    //            onDownQuestions(Question_ID);
    //        },
    //        visible: true,
    //        disabled: false,
    //    });
    //}
    //Button_Down_Question_.append(Down_Question_.get(0));


    //var Button_Delet_Question_ = $("#Button_Delet_Question_" + Question_ID).empty();
    //var Delet_Question_ = $('<div id="Delet_Question_' + Question_ID + '">').dxButton({
    //    id: 'Delet_Question_' + Question_ID,
    //    text: 'Delet',
    //    icon: 'trash',
    //    type: 'danger',
    //    stylingMode: 'outlined',
    //    width: 120,
    //    onClick: function () {
    //        onDeletQuestions(Question_ID, Question);
    //    },
    //    visible: true,
    //});
    //Button_Delet_Question_.append(Delet_Question_.get(0));

    //var Index_Question_ = $("#Index_Question_" + Question_ID).empty();
    //var Index_Question_TextBox = $('<div id="Index_' + Question_ID + '">').dxTextBox({
    //    id: 'Index_' + Question_ID,
    //    value: Index_Question,
    //    labelMode: 'floating',
    //    label: 'Index',
    //    name: 'Index',
    //    visible: false,
    //    readOnly: true,
    //}).attr('InputAttr', Index_Question);
    //Index_Question_.append(Index_Question_TextBox.get(0));


    //var QuestionID_ = $("#QuestionID_" + Question_ID).empty();
    //var Id_Question_TextBox = $('<div id="Id_' + Question_ID + '">').dxTextBox({
    //    id: 'Id_' + Question_ID,
    //    value: Question_ID,
    //    labelMode: 'floating',
    //    label: 'Id',
    //    name: 'Id',
    //    visible: false,
    //    readOnly: true,
    //}).attr('InputAttr', Question_ID);
    //QuestionID_.append(Id_Question_TextBox.get(0));

    //var QuestionnaireId_ = $("#QuestionnaireId_" + Question_ID).empty();
    //var QuestionnaireId_textbox = $('<div id="QuestionnaireId_' + Question_ID + '">').dxTextBox({
    //    id: 'QuestionnaireId_' + Question_ID,
    //    value: QuestionnaireId,
    //    labelMode: 'floating',
    //    label: 'QuestionnaireId',
    //    name: 'QuestionnaireId',
    //    visible: false,
    //    readOnly: true,
    //}).attr('InputAttr', QuestionnaireId);
    //QuestionnaireId_.append(QuestionnaireId_textbox.get(0));

    //var CreateData_ = $("#CreateData_" + Question_ID).empty();
    //var CreateData_textbox = $('<div id="CreateData_' + Question_ID + '">').dxTextBox({
    //    id: 'CreateData_' + Question_ID,
    //    value: CreateData,
    //    labelMode: 'floating',
    //    label: 'CreateData',
    //    name: 'CreateData',
    //    visible: false,
    //    readOnly: true,
    //}).attr('InputAttr', CreateData);
    //CreateData_.append(CreateData_textbox.get(0));
    //$("#Index_Question_value_" + Question_ID).remove();
    //$('<h3 id="Index_Question_value_' + Question_ID + '">').text('Вопрос ' + Index_Question).insertAfter(CreateData_);

    //var Tittle_Question_ = $("#Tittle_Question_" + Question_ID).empty();
    //var Question_textbox = $('<div id="Tittle_' + Question_ID + '">').dxTextBox({
    //    id: 'Tittle_' + Question_ID,
    //    value: Question,
    //    labelMode: 'floating',
    //    label: 'Question',
    //    name: 'Question',
    //    visible: true,
    //    readOnly: true,
    //}).attr('InputAttr', Question);
    //Tittle_Question_.append(Question_textbox.get(0));


    //var Comentory_Question_ = $("#Comentory_Question_" + Question_ID).empty();
    //var Comentary_TextArea = $('<div id="Comentary_' + Question_ID + '">').dxTextArea({
    //    id: 'Comentary_' + Question_ID,
    //    value: Comentary,
    //    labelMode: 'floating',
    //    label: 'Comentary',
    //    name: 'Comentary',
    //    visible: true,
    //    readOnly: true,
    //}).attr('InputAttr', Comentary);
    //Comentory_Question_.append(Comentary_TextArea.get(0));

    //var gradingTypeValue = GradingType == "1" ? "YesNo" :
    //    GradingType == "2" ? "Point10Score" :
    //        GradingType == "3" ? "SingleAnswerVariant" :
    //            GradingType == "4" ? "MultipleAnswerVariant" :
    //                "Point5Score";

    //var GradingType_Question_ = $("#GradingType_Question_" + Question_ID).empty();
    //var GradingType_textbox = $('<div id="GradingType_Temp_' + Question_ID + '">').dxTextBox({
    //    id: 'GradingType_Temp_' + Question_ID,
    //    value: gradingTypeValue,
    //    labelMode: 'floating',
    //    label: 'GradingType_Temp',
    //    name: 'GradingType_Temp',
    //    visible: true,
    //    readOnly: true,
    //}).attr('InputAttr', gradingTypeValue);
    //GradingType_Question_.append(GradingType_textbox.get(0));

    //if (GradingType == "3" || GradingType == "4")
    //{
    //    var Button_AddQuestion_Question_ = $("#Button_AddQuestion_Question_" + Question_ID).empty();
    //    var AddQuestion_Button = $('<div id="AddQuestion' + Question_ID + '">').dxButton({
    //        id: 'AddQuestion' + Question_ID,
    //        text: 'Add',
    //        icon: 'Add',
    //        type: 'normal',
    //        stylingMode: 'outlined',
    //        width: 120,
    //        onClick: function () {
    //            onAddQuestion(Question_ID);
    //        },
    //        visible: true,
    //    });
    //    Button_AddQuestion_Question_.append(AddQuestion_Button.get(0));

    //    

    //    var named_container_ = document.querySelectorAll('[id^="named-container_' + Question_ID + '"]')

    //    for (let i = 0; i < named_container_.length-1; i++)
    //    {
    //        var named_container_empty = named_container_[i].children().children().empty()

    //        var idanswert = Math.floor(Math.random() * 100000);
    //        var Answert_Response = $('<div id="Answert_Response' + Question_ID + "_" + idanswert + '">').dxTextBox({
    //            id: 'Answert_Response_' + Question_ID + '_' + idanswert,
    //            value: ResponseVariants[i].Response,
    //            labelMode: 'floating',
    //            label: 'Answert_Response_',
    //            name: 'Answert_Response_',
    //            visible: false,
    //            readOnly: true,
    //        }).attr('InputAttr', ResponseVariants[i].Response);

    //        named_container_empty.append(Answert_Response.get(0));

    //    }

        //if (ResponseVariants !== null || ResponseVariants.length != 0) {
        //    for (let i = 0; i < ResponseVariants.length; i++)
        //    {
        //        var idanswert = Math.floor(Math.random() * 100000);

        //        var Answert_ = $("#Answert_" + Question_ID).empty();

        //        var Answert_Id_ = $('<div id="Answert_Id_' + Question_ID + "_" + idanswert + '">').dxTextBox({
        //            id: 'Answert_Response_' + Question_ID + '_' + idanswert,
        //            value: 0,
        //            labelMode: 'floating',
        //            label: 'Answert_Id',
        //            name: 'Answert_Id',
        //            visible: false,
        //            readOnly: true,
        //        }).attr('InputAttr', ResponseVariants[i].Response);
        //        Answert_.append(Answert_Id_.get(0));

        //        var Answert_Response_ = $('<div id="Answert_Response_' + Question_ID + "_" + idanswert + '">').dxTextBox({
        //            id: 'Answert_Response_' + Question_ID + '_' + idanswert,
        //            value: ResponseVariants[i].Response,
        //            labelMode: 'floating',
        //            label: 'Answert_Response',
        //            name: 'Answert_Response',
        //            visible: true,
        //            readOnly: true,
        //        }).attr('InputAttr', ResponseVariants[i].Response);
        //        Answert_.append(Answert_Response_.get(0));


        //var Answert_Response_ = $('<div id="Answert_Response_' + Question_ID + "_" + idanswert + '">').dxTextBox({
        //    id: 'Answert_Response_' + Question_ID + '_' + idanswert,
        //    value: ResponseVariants[i].Response,
        //    labelMode: 'floating',
        //    label: 'Answert_Response',
        //    name: 'Answert_Response',
        //    visible: true,
        //    readOnly: true,
        //}).attr('InputAttr', ResponseVariants[i].Response);
        //Answert_.append(Answert_Response_.get(0));


                //var footer_button_ = $("#footer_button_" + Question_ID).empty();
                //var Esc_Question_Button = $('<div>').dxButton({
                //    text: 'Cancel',
                //    type: 'normal',
                //    onClick: function () {
                //        onEscEditClick(Question_ID);
                //    },
                //});

                //var Save_Question_Button = $('<div>').dxButton({
                //    text: 'Save',
                //    type: 'success',
                //    onClick: function () {
                //        onEditQuestionClick(Question_ID);
                //    },
                //});

                //footer_button_.appendChild(Esc_Question_Button.get(0));
                //footer_button_.appendChild(Save_Question_Button.get(0));

          //  }
        //}
//    }
//}


//function Redrawing(Question_ID, Index_Question, QuestionnaireId, CreateData, Question, Comentary, GradingType, ResponseVariants) {

//
//    /*  var inputElement = document.querySelector('form');*/
//    var div_root = $("#Question_root_" + Question_ID);

//    if (div_root != null) {

//        //divhtml_AddQuestion = ' <div id="AddQuestion"></div>';
//        //inputElement.insertAdjacentHTML('afterend', divhtml_AddQuestion);

//        //var idanswert = Math.floor(Math.random() * 100000);
//        //var Question_ID = idanswert;
//        //var set_CreateData;
//        //var set_QuestionnaireId = QuestionnaireId;

//        //var div_root = document.createElement('div');
//        //div_root.id = 'Question_root_' + Question_ID;
//        //div_root.className = 'card card-body';

//        var input_Question = document.createElement('div');
//        input_Question.id = 'input_Question_' + Question_ID;
//        div_root.appendChild(input_Question);


//        //Container
//        //#region container
//        var container_button = document.createElement('div');
//        container_button.className = 'container';
//        input_Question.appendChild(container_button);

//        var row_button = document.createElement('div');
//        row_button.className = 'row';
//        container_button.appendChild(row_button);
//        //ROW
//        //#region ROW
//        var count_Question = $('[id^="Question_root_"]').length;

//        var Col_Button_Edit_Question_ = document.createElement('div');
//        Col_Button_Edit_Question_.className = 'col';
//        Col_Button_Edit_Question_.id = 'Col_Button_Edit_Question_' + Question_ID;
//        row_button.appendChild(Col_Button_Edit_Question_);

//        var Button_Edit_Question_ = document.createElement('div');
//        Button_Edit_Question_.id = 'Button_Edit_Question_' + Question_ID;
//        Col_Button_Edit_Question_.appendChild(Button_Edit_Question_);
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

//        Button_Edit_Question_.appendChild(Edit_Question_.get(0));

        //var Col_Button_Up_Question_ = document.createElement('div');
        //Col_Button_Up_Question_.className = 'col';
        //Col_Button_Up_Question_.id = 'Col_Button_Up_Question_' + Question_ID;
        //row_button.appendChild(Col_Button_Up_Question_);


        //var Button_Up_Question_ = document.createElement('div');
        //Button_Up_Question_.id = 'Button_Up_Question_' + Question_ID;
        //Col_Button_Up_Question_.appendChild(Button_Up_Question_);

        //if (count_Question == 0) {
        //    var Up_Question_ = $('<div id="Up_Question_' + Question_ID + '">').dxButton({
        //        id: 'Up_Question_' + Question_ID,
        //        text: 'Up',
        //        icon: 'fas fa-arrow-up',
        //        type: 'normal',
        //        stylingMode: 'outlined',
        //        width: 120,
        //        onClick: function () {
        //            onUPQuestions(Question_ID);
        //        },
        //        visible: true,
        //        disabled: true,
        //    });
        //} else {
        //    var Up_Question_ = $('<div id="Up_Question_' + Question_ID + '">').dxButton({
        //        id: 'Up_Question_' + Question_ID,
        //        text: 'Up',
        //        icon: 'fas fa-arrow-up',
        //        type: 'normal',
        //        stylingMode: 'outlined',
        //        width: 120,
        //        onClick: function () {
        //            onUPQuestions(Question_ID);
        //        },
        //        visible: true,
        //        disabled: false,
        //    });
        //}
        //Button_Up_Question_.appendChild(Up_Question_.get(0));


        //var Col_Button_Down_Question_ = document.createElement('div');
        //Col_Button_Down_Question_.className = 'col';
        //Col_Button_Down_Question_.id = 'Col_Button_Down_Question_' + Question_ID;
        //row_button.appendChild(Col_Button_Down_Question_);

        //var Button_Down_Question_ = document.createElement('div');
        //Button_Down_Question_.id = 'Button_Down_Question_' + Question_ID;
        //Col_Button_Down_Question_.appendChild(Button_Down_Question_);

        //var Down_Question_ = $('<div id="Down_Question_' + Question_ID + '">').dxButton({
        //    id: 'Down_Question_' + Question_ID,
        //    text: 'Down',
        //    icon: 'fas fa-arrow-down',
        //    type: 'normal',
        //    stylingMode: 'outlined',
        //    width: 120,
        //    onClick: function () {
        //        onDownQuestions(Question_ID);
        //    },
        //    visible: true,
        //    disabled: true,
        //});

        //Button_Down_Question_.appendChild(Down_Question_.get(0));


        //var Col_Button_Delet_Question_ = document.createElement('div');
        //Col_Button_Delet_Question_.className = 'col';
        //Col_Button_Delet_Question_.id = 'Col_Button_Delet_Question_' + Question_ID;
        //row_button.appendChild(Col_Button_Delet_Question_);

        //var Button_Delet_Question_ = document.createElement('div');
        //Button_Delet_Question_.id = 'Button_Down_Question_' + Question_ID;
        //Col_Button_Delet_Question_.appendChild(Button_Delet_Question_);
        //var Delet_Question_ = $('<div id="Delet_Question_' + Question_ID + '">').dxButton({
        //    id: 'Delet_Question_' + Question_ID,
        //    text: 'Delet',
        //    icon: 'trash',
        //    type: 'danger',
        //    stylingMode: 'outlined',
        //    width: 120,
        //    onClick: function () {
        //        onDeletQuestions(Question_ID, Question);
        //    },
        //    visible: true,
        //});
        //Button_Delet_Question_.appendChild(Delet_Question_.get(0));
        //// #endregion
        //// #endregion

        //var Question_ = document.createElement('div');
        //Question_.id = 'Question_' + Question_ID;
        //input_Question.appendChild(Question_);

        //var Index_Question_ = document.createElement('div');
        //Index_Question_.id = 'Index_Question_' + Question_ID;
        //Question_.appendChild(Index_Question_);
        //var Index_Question_TextBox = $('<div id="Index_' + Question_ID + '">').dxTextBox({
        //    id: 'Index_' + Question_ID,
        //    value: Index_Question,
        //    labelMode: 'floating',
        //    label: 'Index',
        //    name: 'Index',
        //    visible: false,
        //    readOnly: true,
        //}).attr('InputAttr', Index_Question);

        //Index_Question_.appendChild(Index_Question_TextBox.get(0));


        //var QuestionID_ = document.createElement('div');
        //QuestionID_.id = 'QuestionID_' + Question_ID;
        //Question_.appendChild(QuestionID_);

        //var Id_Question_TextBox = $('<div id="Id_' + Question_ID + '">').dxTextBox({
        //    id: 'Id_' + Question_ID,
        //    value: Question_ID,
        //    labelMode: 'floating',
        //    label: 'Id',
        //    name: 'Id',
        //    visible: false,
        //    readOnly: true,
        //}).attr('InputAttr', Question_ID);

        //QuestionID_.appendChild(Id_Question_TextBox.get(0));

        //var QuestionnaireId_ = document.createElement('div');
        //QuestionnaireId_.id = 'QuestionnaireId_' + Question_ID;
        //Question_.appendChild(QuestionnaireId_);

        //var QuestionnaireId_textbox = $('<div id="QuestionnaireId_' + Question_ID + '">').dxTextBox({
        //    id: 'QuestionnaireId_' + Question_ID,
        //    value: QuestionnaireId,
        //    labelMode: 'floating',
        //    label: 'QuestionnaireId',
        //    name: 'QuestionnaireId',
        //    visible: false,
        //    readOnly: true,
        //}).attr('InputAttr', QuestionnaireId);

        //QuestionnaireId_.appendChild(QuestionnaireId_textbox.get(0));


        //var CreateData_ = document.createElement('div');
        //CreateData_.id = 'CreateData_' + Question_ID;
        //Question_.appendChild(CreateData_);

        //var CreateData_textbox = $('<div id="CreateData_' + Question_ID + '">').dxTextBox({
        //    id: 'CreateData_' + Question_ID,
        //    value: CreateData,
        //    labelMode: 'floating',
        //    label: 'CreateData',
        //    name: 'CreateData',
        //    visible: false,
        //    readOnly: true,
        //}).attr('InputAttr', CreateData);

        //CreateData_.appendChild(CreateData_textbox.get(0));


        //var h3_Index_Question = document.createElement('h3');
        //h3_Index_Question.id = 'Index_Question_value_' + Index_Question;
        //h3_Index_Question.textContent = 'Вопрос ' + Index_Question;
        //Question_.appendChild(h3_Index_Question);

        //var Tittle_Question_ = document.createElement('div');
        //Tittle_Question_.id = 'CreateData_' + Question_ID;
        //Question_.appendChild(Tittle_Question_);

        //var Question_textbox = $('<div id="Tittle_' + Question_ID + '">').dxTextBox({
        //    id: 'Tittle_' + Question_ID,
        //    value: Question,
        //    labelMode: 'floating',
        //    label: 'Question',
        //    name: 'Question',
        //    visible: true,
        //    readOnly: true,
        //}).attr('InputAttr', Question);

        //Tittle_Question_.appendChild(Question_textbox.get(0));


        //var Comentory_Question_ = document.createElement('div');
        //Comentory_Question_.id = 'Comentory_Question_' + Question_ID;
        //Question_.appendChild(Comentory_Question_);

        //var Comentary_TextArea = $('<div id="Comentary_' + Question_ID + '">').dxTextArea({
        //    id: 'Comentary_' + Question_ID,
        //    value: Comentary,
        //    labelMode: 'floating',
        //    label: 'Comentary',
        //    name: 'Comentary',
        //    visible: true,
        //    readOnly: true,
        //}).attr('InputAttr', Comentary);

        //Comentory_Question_.appendChild(Comentary_TextArea.get(0));

        //var gradingTypeValue = set_GradingType == "1" ? "YesNo" :
        //    set_GradingType == "2" ? "Point10Score" :
        //        set_GradingType == "3" ? "SingleAnswerVariant" :
        //            set_GradingType == "4" ? "MultipleAnswerVariant" :
        //                "Point5Score";

        //var GradingType_Question_ = document.createElement('div');
        //GradingType_Question_.id = 'GradingType_Question_' + Question_ID;
        //Question_.appendChild(GradingType_Question_);

        //var GradingType_textbox = $('<div id="GradingType_Temp_' + Question_ID + '">').dxTextBox({
        //    id: 'GradingType_Temp_' + Question_ID,
        //    value: GradingType,
        //    labelMode: 'floating',
        //    label: 'GradingType_Temp',
        //    name: 'GradingType_Temp',
        //    visible: true,
        //    readOnly: true,
        //}).attr('InputAttr', GradingType);

        //GradingType_Question_.appendChild(GradingType_textbox.get(0));

        //var GradingType_Temp_textbox = $('<div id="GradingType_Temp_' + Question_ID + '">').dxTextBox({
        //    id: 'GradingType_Temp_' + Question_ID,
        //    value: set_GradingType,
        //    labelMode: 'floating',
        //    label: 'GradingType_Temp',
        //    name: 'GradingType_Temp',
        //    visible: true,
        //    readOnly: true,
        //}).attr('InputAttr', set_GradingType);

        //GradingType_Question_.appendChild(GradingType_Temp_textbox.get(0));

//        if (set_GradingType == "3" || set_GradingType == "4") {

//            var Button_AddQuestion_Question_ = document.createElement('div');
//            Button_AddQuestion_Question_.id = 'ButtonAdd_Answert_Question_' + Question_ID;
//            Question_.appendChild(Button_AddQuestion_Question_);


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

//            Button_AddQuestion_Question_.appendChild(AddQuestion_Button.get(0));

//            var h3 = document.createElement('h3');
//            h3.textContent = 'Список Вариантов ответов';
//            Question_.appendChild(h3);

//            if (ResponseVariants !== null || ResponseVariants.length != 0) {
//                for (let i = 0; i < ResponseVariants.length; i++) {

//                    var Answert_ = document.createElement('div');
//                    Answert_.id = 'Answert_' + Question_ID;
//                    Question_.appendChild(Answert_);

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

//                    Answert_.appendChild(Answert_Id_.get(0));

//                    var Answert_Response_ = $('<div id="Answert_Response_' + Question_ID + "_" + idanswert + '">').dxTextBox({
//                        id: 'Answert_Response_' + Question_ID + '_' + idanswert,
//                        value: ResponseVariants[i].Response,
//                        labelMode: 'floating',
//                        label: 'Answert_Response',
//                        name: 'Answert_Response',
//                        visible: true,
//                        readOnly: true,
//                    }).attr('InputAttr', ResponseVariants[i].Response);

//                    Answert_.appendChild(Answert_Response_.get(0));
//                }

//                var named_container_ = document.createElement('div');
//                named_container_.className = 'named-container_' + Question_ID;
//                Question_.appendChild(named_container_);

//                var row_named_container_ = document.createElement('div');
//                row_named_container_.className = 'row';
//                row_named_container_.style = 'margin-top:""; margin-right:""; margin-left: -0.7rem; --bs-gutter-x:""';
//                named_container_.appendChild(row_named_container_);

//                var col_10_named_container_ = document.createElement('div');
//                col_10_named_container_.className = 'col-10';
//                row_named_container_.appendChild(col_10_named_container_);

//                var input_Answert_ = document.createElement('div');
//                input_Answert_.id = 'input_Answert_' + Question_ID;
//                col_10_named_container_.appendChild(input_Answert_);

//                var col_2_named_container_ = document.createElement('div');
//                col_2_named_container_.className = 'col-2';
//                col_2_named_container_.style = 'top:6px';
//                row_named_container_.appendChild(col_2_named_container_);

//                var button_input_Answert_ = document.createElement('div');
//                button_input_Answert_.id = 'button_input_Answert_' + Question_ID;
//                col_2_named_container_.appendChild(button_input_Answert_);
//            }
//        }

//        var footer_button_ = document.createElement('div');
//        footer_button_.id = 'footer_button_' + Question_ID;
//        footer_button_.className = 'modal-footer';
//        footer_button_.style = 'display: none;';
//        input_Question.appendChild(footer_button_);


//        var Esc_Question_Button = $('<div>').dxButton({
//            /*   id: 'AddQuestion' + Question_ID,*/
//            text: 'Cancel',
//            type: 'normal',
//            onClick: function () {
//                onEscEditClick(Question_ID);
//            },
//        });

//        var Save_Question_Button = $('<div>').dxButton({
//            /*   id: 'AddQuestion' + Question_ID,*/
//            text: 'Save',
//            type: 'success',
//            onClick: function () {
//                onEditQuestionClick(Question_ID);
//            },
//        });

//        footer_button_.appendChild(Esc_Question_Button.get(0));
//        footer_button_.appendChild(Save_Question_Button.get(0));

//    }
//}