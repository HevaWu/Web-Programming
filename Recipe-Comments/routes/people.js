const express = require('express');
const router = express.Router();
const data = require("../data");
const peopleData = data.people;
const eventData = data.events;

// Single Person Page
router.get("/:id", (req, res) => {
	// Find a person by the provided id, 
	// then display their information
	// As well as listing all events that they will be attending
	// Each of these events need to link to the event page, and show the event name
	// If a person is not found, display the 404 error page
	var personInfo = {
		id: null,
		name: null,
		events: []
	}

	peopleData.getPerson(req.params.id).then((person) => {
		Promise.all([person, eventData.getEventsForAttendee(person.id)]).then((eventInfo) => {
			personInfo.id = person.id;
			personInfo.name = person.name;
			personInfo.events = eventInfo[1];

			res.render('misc/peopleInfo', {
				person: personInfo
			});
		});
	}).catch((e) => {
		res.status(404).json({
			error: "Person not found " + e
		});
	});
});

// People Index Page
router.get("/", (req, res) => {
	// Display a list of all people; it can be in an unordered list, or a table
	// Each of these people need to link to the single person page
	peopleData.getAllPeople().then((peopleList) => {
		res.render('misc/peopleList', {
			people: peopleList
		});
	}).catch((e) => {
		res.status(500).json({
			error: e
		});
	});
});

module.exports = router;
