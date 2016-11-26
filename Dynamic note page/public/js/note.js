(function ($) {
    // Let's start writing AJAX calls!

    var nextNote = $("#open-next-note");

    nextNote.click(function(){
        console.log("Click the Next Note Button");

        var currentNodeId = $("#new-note-id").text();
        console.log("current note id: " + currentNodeId);

        var currentNodeDueDate = $("#new-note-due-date").text();
        console.log("current note due date: " + currentNodeDueDate);

        if(currentNodeId){
            var requestConfig = {
                method: "POST",
                url: "/api/next",
                contentType: 'application/json',
                data: JSON.stringify({
                    curId: currentNodeId,
                    curDueDate: currentNodeDueDate,
                    testField: 12,
                    testBool: true
                })
            };

             $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
                location.href = responseMessage.pageurl;
            });
        }
    });

})(window.jQuery);