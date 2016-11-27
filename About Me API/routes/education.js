const express = require('express');
const router = express.Router(); //give response
const data = require("../data");
const educationData = data.education;

router.get("/:schoolType", (req, res) => {
    educationData.getSchool(req.params.schoolType).then((school) => {
        //return the name of different type of school
        res.json(school);
        res.status(200).send();
    }, (error) => {
        // Not found!
        res.status(404).json({
            message: "Schools not found"
        });
    });
});

router.get("/", (req, res) => {
    educationData.getAllSchools().then((schoolList) => {
        //return a list of all the schools 
        res.json(schoolList);
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