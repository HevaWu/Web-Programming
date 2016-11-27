const express = require('express');
const router = express.Router();
const data = require("../data");
const hobbiesData = data.hobbies;

router.get("/:hobby", (req, res) => {
    hobbiesData.getHobby(req.params.hobby).then((hobby) => {
        //return additional info about the hobby 
        res.json(hobby);
        res.status(200).send();
    }, (error) => {
        // Not found!
        res.status(404).json({message: "Hobbies not found!"});
    });
});

router.get("/", (req, res) => {
    hobbiesData.getAllHobbies().then((hobbyList) => {
        //return a list of hobbies, only return their names
        res.json(hobbyList);
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