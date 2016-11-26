//let currId = 0;
//let NoteListEntries = {};

const fs = require('fs');
const file = __dirname + '/notes/note.json'
let fileObj = fs.readFileSync(file);
fileObj = JSON.parse(fileObj);

let makeNote = function (title, dueDate, summary, body) {
    if (!title) throw "Must provide a Note title";
    if (!dueDate) throw "Must provide a Note Due Date";
    if (!summary) throw "Must provide a Note Summary";
    if (!body) throw "Must provide a Note Body";

    let new_id = fileObj.notes.length+1;
    let newNote = { 
        id: new_id, 
        title: title, 
        dueDate: dueDate, 
        summary: summary, 
        body: body, 
        done: false 
    };

    fileObj.notes.push(newNote);
    console.log(fileObj);
    fs.writeFile(file, JSON.stringify(fileObj, null, 4));

    //NoteListEntries[newNote.id] = newNote;

    //console.log("My new Note: " + newNote.id);
    //console.log(NoteListEntries[newNote.id]);

    return newNote;
};

let getNote = function (id) {
    //console.log(id);
    //console.log(NoteListEntries[id]);

    //if (!NoteListEntries[id]) throw "No such entry exists";
    //return NoteListEntries[id];
    let allnotes = fileObj.notes;
    let curNote = allnotes.filter(x => x.id == id).shift();
    if(!curNote) throw "No such entry exists";
    return curNote;
    
    //if(!fileObj.notes[id-1]) throw "No such entry exists";
    //return fileObj.notes[id-1];
};
/*
let finishNote = function (id) {
    let entry = getNote(id);
    entry.done = true;

    return entry;
};

let updateNote = function (id, newTitle, newDueDate, newSummary, newBody) {
    let entry = getNote(id);
    if (newTitle) entry.title = newTitle;
    if (newDueDate) entry.dueDate = newDueDate;
    if (newSummary) entry.summary = newSummary;
    if (newBody) entry.body = newBody;

    return entry;
};
*/
let getAll = function () {
    /*return Object.keys(NoteListEntries).map(function (key) {
        return NoteListEntries[key];
    });*/
    return fileObj.notes;
};
/*
let getFinished = function () {
    return getAll().filter(function (entry) {
        return entry.done;
    });
};

let getUnfinished = function () {
    return getAll().filter(function (entry) {
        return !entry.done;
    });
};*/

module.exports = {
    getNote: getNote,
    //finishNote: finishNote,
    //updateNote: updateNote,
    getAll: getAll,
    //getFinished: getFinished,
    //getUnfinished: getUnfinished,
    makeNote: makeNote
};

//module.exports.makeToDo("Finish ToDo List", "You should finish this list");