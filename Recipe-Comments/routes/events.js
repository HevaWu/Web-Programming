const express = require('express');
const router = express.Router();
const data = require("../data");
const eventData = data.events;
const locationData = data.locations;
const peopleData = data.people;

// Single Event Page
router.get("/:id", (req, res) => {
    // Find a event by the provided id, 
    // then display its information
    // As well as listing the names of all the attendees that will be at this event 
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page
    var EventInfo = {
        id: null,
        title: null,
        startTime: null,
        description: null,
        attendees: [],
        location: null,
        locationName: null
    }
    var attendPeople = [];

    eventData.getEvent(req.params.id).then((event) => {
        var peopleInfo = event.attendees.map(attendee => peopleData.getPerson(attendee));

        return Promise.all([event, locationData.getLocation(event.location)]).then((locationInfo) => {
            // console.log(locationInfo[1]);

            EventInfo.id = event.id;
            EventInfo.title = event.title;
            EventInfo.startTime = event.startTime;
            EventInfo.description = event.description;
            EventInfo.attendees = event.attendees;
            EventInfo.location = event.location;
            EventInfo.locationName = locationInfo[1].name;

            // console.log(EventInfo.locationName);

            return EventInfo.attendees;
        }).then((attendees)=>{
            attendees.forEach((person)=>{
                peopleData.getPerson(person).then((personInfo)=>{
                    attendPeople.push(personInfo);
                })
            });
            return attendPeople;
        }).then((attendPeople)=>{
            res.render('misc/eventInfo', {
                    event: EventInfo,
                    people: attendPeople
                });
        });
    }).catch((e) => {
        res.status(404).json({
            error: "Event not found " + e
        });
    });


    // If a event is not found, display the 404 error page
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Event Index Page
router.get("/", (req, res) => {
    // Display a list of all events; it can be in an unordered list, or a table
    // Each of these events need to link to the single event page
    eventData.getAllEvents().then((eventList) => {
        //res.render("misc/debug", { debug: true, modelData: { EventList: eventList } });
        res.render('misc/eventList', {
            events: eventList
        });
    }).catch((e) => {
        res.status(500).json({
            error: e
        });
    });
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;
