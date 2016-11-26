const express = require('express');
const router = express.Router();
const data = require("../data");
const text = data.text;

router.get("/clientform", (req, res) => {
    res.render("text/clientform", {});
});

router.get("/serverform", (req, res) => {
    res.render("text/serverform", {});
});

router.post("/serverform", (req, res) => {
    let firstString = req.body.string1;
    let secondString = req.body.string2;
    let firstNumber = parseInt(req.body.number1);
    let secondNumber = parseInt(req.body.number2);
    let result;

    try {
        result = text.addString(firstString, secondString, firstNumber, secondNumber);
    } catch (e) {
        res.render("text/serverform", { firstString: firstString, secondString: secondString, firstNumber: firstNumber, secondNumber: secondNumber, error: e });
        return;
    }

    res.render("text/serverform", { firstString: firstString, secondString: secondString, firstNumber: firstNumber, secondNumber: secondNumber, result: result });
});

module.exports = router;