const express = require('express');
const router = express.Router();
const data = require("../data");
const locationData = data.locations;
const eventData = data.events;

// Single Location Page
router.get("/:id", (req, res) => {
	// Find a location by the provided id, 
	// then display its information
	// As well as listing all events that will be at this location
	// Each of these events need to link to the event page and show the event name
	// If a location is not found, display the 404 error page
	var localInfo = {
		id: null,
		name: null,
		location: null,
		events: []
	}

	locationData.getLocation(req.params.id).then((location) => {
		return eventData.getAllEvents().then((eventList) => {
			if (location.id === undefined) return Promise.reject("No Location id");

			return Promise.resolve(eventList.filter(x => x.location === location.id));
		}).then((locationDetail) => {
			//console.log(locationDetail);

			Promise.all([location, locationDetail]).then((eventInfo) => {
				localInfo.id = location.id;
				localInfo.name = location.name;
				localInfo.location = location.location;
				localInfo.events = eventInfo[1];

				res.render('misc/locationInfo', {
					location: localInfo
				});
			})
		});
	}).catch((e) => {
		res.status(404).json({
			error: "Location not found " + e
		});
	});
});

// Location Index Page
router.get("/", (req, res) => {
	// Display a list of all locations; it can be in an unordered list, or a table
	// Each of these locations need to link to the single location page
	locationData.getAllLocations().then((locationList) => {
		//res.render("misc/debug", { debug: true, modelData: { LocationList: locationList } });
		res.render('misc/locationList', {
			locations: locationList
		});
	}).catch((e) => {
		res.status(500).json({
			error: e
		});
	});
});

module.exports = router;
