const express = require("express"); //a server
let app = express(); // run express function, web application
//generate express application
let configRoutes = require("./routes"); //set routes

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
