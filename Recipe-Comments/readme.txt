/***********************
 * Course: CS-546-A    *
 * Student: He Wu      *
 * CWID: 10406347      *
 *       Lab 5         *
 **********************/

In this lab, it contains: 
   config folder: set Mongodb Collections, contains mongoCollections.js and mongoConnection.js

   data folder:   set events, locations and people module functions, 
                  contains index.js, events.js, locations.js and people.js
                  In data folder, we update the events.getEvent(), locations.getLocation(), and people.getPerson()
                  change "filter(x => x.id === id)" to "filter(x => x.id == id)", 
                  for this, we can use these three function successfully

   public folder: in main.css we set the webpage style

   routes folder: set server options, contains index.js, events.js, locations.js and people.js

   static folder: contains about.html, use to return the public homepage

   tasks folder:  send seed to mongodb database, contains seed.js

   views folder:  set the handlebars param

   app.js file:   start jsfile, to start npm
   
   package.json file:  set npm params

You can use Chrome Browser to GET the information in lab6 database.

For Events routes
    GET    /events        : http://localhost:3000/events/
    						get the events homepage

    GET    /events/:id    : http://localhost:3000/events/:id
			     			return all detail information for this id events
			     			list the name of all the attendee names, and suggest the location of this event
			     			for each attendee, link it to its person page
			     			for this location, link it to its location page

For Locations routes
    GET    /locations        : http://localhost:3000/locations/
    							get the locations homepage

    GET    /locations/:id    : http://localhost:3000/locations/:id
			     			return all detail information for this id locations
			     			list all events which will be hold at this location
			     			for each event, link it to its event page

For People routes
    GET    /people        : http://localhost:3000/people/
    							get the person homepage

    GET    /people/:id    : http://localhost:3000/people/:id
			     			return all detail information for this id person
			     			list all events this person will attend
			     			for each event, link it to its event page		     				
