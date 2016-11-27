const express = require('express');
const router = express.Router();
const data = require("../data");
const classesData = data.classes;

router.get("/details", (req, res) => {
    classesData.getClass(req.query.code).then((classData) => {
        //using querystring for course code, show details on the course
        res.json(classData);
        res.status(200).send();
    }, (error) => {
        // Not found!
        res.status(404).json({message: "Classes not found!"});
    });
});

router.get("/", (req, res) => {
    classesData.getAllClasses().then((classList) => {
        //return a list of course code for 5+ classes
        res.json(classList);
        res.status(200).send();
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    // Not implemented
    res.status(500).send();
});

module.exports = router;