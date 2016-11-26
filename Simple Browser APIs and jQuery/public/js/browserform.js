(function ($, localStorage, location) {
    //check how many times a 1.5 second interval has occurred since this page has loaded
    var currentIterations = 0;
    var intervalResult = $("#the-interval .result");

    var intervalId = window.setInterval(function () {
        var iteration = ++currentIterations;
        var message = iteration === 1 ? iteration + " interval has now occurred" : iteration + " intervals have occurred";

        intervalResult.text(message);
    }, 1500);

    //record how many times the form has been submitted
    if (!localStorage["my_first_object"]) {
        localStorage["my_first_object"] = JSON.stringify({message: "Hello, world!"});
    }

    if (!localStorage["my_first_boolean"]) {
        localStorage["my_first_boolean"] = JSON.stringify(true);
    }

    var browserFormTableBody = $("#browserform-data tbody");
    var clearStorage = $("#clear-storage");

    var keyNameInput = $("#browserform-key");
    var keyValueInput = $("#browserform-value");
    var kvpForm = $("#browserform-form");
    var formAlert = $("#form-alert");

    var submitTime = $("#show-submit-time");
    var countSubmitTime = 0;
    var lastInput = $("#show-last-input");
    var lastInputMessage = '';

    var locationTableBody = $("#location-data tbody");

    var newRow = document.createElement("tr");
    var propertyNameColumn = document.createElement("td");
    propertyNameColumn.textContent = document.createTextNode("hash").textContent;

    var propertyTypeColumn = document.createElement("td");
    propertyTypeColumn.textContent = document.createTextNode(typeof location.hash).textContent;

    var propertyValueColumn = document.createElement("td");
    propertyValueColumn.textContent = document.createTextNode(location.hash).textContent;

    newRow.appendChild(propertyNameColumn);
    newRow.appendChild(propertyTypeColumn);
    newRow.appendChild(propertyValueColumn);

    locationTableBody.append(newRow);

    $("#change-hash").click(function() {
        alert("Click hash should not trigger a reload, we reload to show hash field update");

        window.setTimeout(function() {
            location.reload();
        }, 500);
    });

    function resetTable() {
        browserFormTableBody.empty();

        for (var i = 0; i < localStorage.length; i++) {
            var currentKey = localStorage.key(i);
            var curentValue = localStorage[currentKey];

            var newHtmlString = "<tr><td>" + currentKey + "</td><td>" + curentValue + "</td></tr>";
            browserFormTableBody.append(newHtmlString);
        }
    }

    clearStorage.click(function () {
        localStorage.clear();
        resetTable();
    });

    kvpForm.submit(function (event) {
        event.preventDefault();

        // record submit times
        // record what last inputed value was
        //submitTime.addClass('hidden');
        submitTime.text('');
        //lastInput.addClass('hidden');
        lastInput.text('');
        
        var countSubmitTimeTemp = ++countSubmitTime;
        var submitTimeMessage = "Submit form " + countSubmitTimeTemp + " times";

        submitTime.text(submitTimeMessage);
        //submitTime.removeClass('hidden');

        // reset the form
        formAlert.addClass('hidden');
        formAlert.text('');

        var keyStr = keyNameInput.val();
        var valStr = keyValueInput.val();

        // check if input a key or value
        if (!keyStr) {
            formAlert.text('You must provide a key name');
            formAlert.removeClass('hidden');
            lastInput.text(lastInputMessage);
            return;
        }

        if (!keyValueInput) {
            formAlert.text('You must provide a key value');
            formAlert.removeClass('hidden');
            lastInput.text(lastInputMessage);
            return;
        }

        // check if it's in the format of an object
        var jsonString = valStr;

        try {
            // this will throw when given a non JSON string
            JSON.parse(valStr);
        } catch (e) {
            // this did not succeed, which means that the user passed us some sort of string
            jsonString = JSON.stringify(valStr);
        }

        localStorage[keyStr] = jsonString;

        lastInputMessage = "Last Input --- Key: " + keyStr + ", Value: " + jsonString;

        lastInput.text(lastInputMessage);
        //lastInput.removeClass('hidden');
        
        keyNameInput.val('');
        keyValueInput.val('');

        resetTable();
    });

    resetTable();
})(jQuery, window.localStorage, window.location);