let exportedMethods = {
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
}

module.exports = exportedMethods;