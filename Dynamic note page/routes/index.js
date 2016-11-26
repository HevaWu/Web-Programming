const apiRoutes = require("./api");
const todoData = require("../data");

const constructorMethod = (app) => {
    app.use("/api", apiRoutes);

    app.get("/", function (request, response) {
        var allNote = todoData.getAll();
        allNote.sort(function(a, b){
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        response.render("home", {todoItems: allNote, partial: "home-scripts" });
    });

    app.get("/new", function (request, response) {
        response.render("newnote", { partial: "newnote-scripts" });
    });

    app.get("/:note", (request, response)=>{
        //console.log(request.params.note);

        Promise.resolve(todoData.getNote(request.params.note)).then((mynote)=>{
            response.render("note", {mynote:mynote, todoItems: todoData.getAll(), partial: "note-scripts" });
        }).catch((error)=>{
            response.status(404).json({error: "Note Not found " + error});
        });
    });


    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;