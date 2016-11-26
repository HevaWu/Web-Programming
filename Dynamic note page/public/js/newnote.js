//const todoData = require(".../data");

(function($, location) {
    // Let's start writing AJAX calls!

    var myNewTaskForm = $("#new-item-form"),
        newNameInput = $("#new-note-name"),
        newDueDateInput = $("#new-note-due-date"),
        newSummaryArea = $("#new-note-summary"),
        newBodyArea = $("#new-note-body");
    
    var formAlert = $("#form-alert");

    myNewTaskForm.submit(function(event) {
        event.preventDefault();

        formAlert.addClass('hidden');
        formAlert.text('');

        var newName = newNameInput.val();
        var newDueDate = newDueDateInput.val();
        var newSummary = newSummaryArea.val();
        var newBody = newBodyArea.val();

        if(!newName){
            formAlert.text('You must provide a Note Title');
            formAlert.removeClass('hidden');
            return;
        }

        if(!newDueDate){
            formAlert.text('You must provide a Note Due Date');
            formAlert.removeClass('hidden');
            return;
        }

        if(!newSummary){
            formAlert.text('You must provide a Note Summary');
            formAlert.removeClass('hidden');
            return;
        }

        if(!newBody){
            formAlert.text('You must provide a Note Body');
            formAlert.removeClass('hidden');
            return;
        }

        if (newName && newDueDate && newSummary && newBody) {
            var requestConfig = {
                method: "POST",
                url: '/api/todo',
                contentType: 'application/json',
                data: JSON.stringify({
                    title: newName,
                    dueDate: newDueDate,
                    summary: newSummary,
                    body: newBody,
                    testField: 12,
                    testBool: true
                })
            };

            $.ajax(requestConfig).then(function(responseMessage) {
                console.log(responseMessage);
                location.href = responseMessage.pageurl;
            });
        }
    });
})(window.jQuery, window.location);
