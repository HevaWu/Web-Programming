(function () {
    let textMethods = {
        addString(str1, str2, num1, num2) {
            if (typeof str1 !== "string" || str1 == null || str1 == "") throw "Must provide a string text";
            if (typeof str2 !== "string" || str2 == null || str2 == "") throw "Must provide a string text";
            if (typeof num1 !== "number") throw "Must provide a number";
            if (isNaN(num1)) throw "Must provide a number";
            if (num1 < 1 || num1 > 25) throw "Must provide a number >= 1 and <= 25";
            if (typeof num2 !== "number") throw "Must provide a number";
            if (isNaN(num2)) throw "Must provide a number";
            if (num2 < 1 || num2 > 25) throw "Must provide a number >= 1 and <= 25";
            if (str1.length < num1 * num2) throw "The insert string cannot repeat so many times, \nOr cannot repeat in such long interval";

            let start = 0;
            let ret = "";
            let repeat = 0;
            while (start <= str1.length && repeat < num1) {
                ret += start == str1.length ? str2 : str1.substring(start, start + num2) + str2;
                start = start + num2;
                repeat++;
            }
            if (start < str1.length) {
                ret += str1.substring(start);
            }

            return ret;
        }
    };

    let clientForm = document.getElementById("client-form");

    if (clientForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        let firstStringElement = document.getElementById("string1");
        let secondStringElement = document.getElementById("string2");
        let firstNumberElement = document.getElementById("number1");
        let secondNumberElement = document.getElementById("number2");

        let errorContainer = document.getElementById("error-container");
        let errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        let resultContainer = document.getElementById("result-container");
        let resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these letiables are accessible in our callback
        clientForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                // Values come from inputs as strings, no matter what :(
                let firstStringValue = firstStringElement.value;
                let secondStringValue = secondStringElement.value;
                let firstNumberValue = firstNumberElement.value;
                let secondNumberValue = secondNumberElement.value;

                let parsedFirstNumberValue = parseInt(firstNumberValue);
                let parsedSecondNumberValue = parseInt(secondNumberValue);

                let result = textMethods.addString(firstStringValue, secondStringValue, parsedFirstNumberValue, parsedSecondNumberValue);

                resultTextElement.textContent = "The result is: " + result;
                resultContainer.classList.remove("hidden");
            } catch (e) {
                let message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();