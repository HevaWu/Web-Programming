const express = require('express');
const router = express.Router();
const xss = require('xss');
const todoData = require("../data");

router.post("/todo", function (request, response) {
    console.log(request.body);
    Promise.resolve(todoData.makeNote(xss(request.body.title), xss(request.body.dueDate), xss(request.body.summary), xss(request.body.body) )) .then((mynewNote)=>{
        response.json({ 
            success: true,
            pageurl: '/'+mynewNote.id
            });
    }) ;
});

router.post("/next", function (request, response) {
    //console.log(request.body);

    var allNote = todoData.getAll();
    allNote.sort(function(a, b){
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    var nextNote = allNote.filter(function(entry){
        return new Date(entry.dueDate) > new Date(request.body.curDueDate);
    });

    //console.log(nextNote);
    Promise.resolve(nextNote[0]).then((theNextNote)=>{
        if(theNextNote == undefined){
            pageURL = '/'+request.body.curId;
        } else{
            pageURL = '/'+theNextNote.id;
        }
        response.json({
            success: true,
            pageurl: pageURL
        });
    });

});

module.exports = router;