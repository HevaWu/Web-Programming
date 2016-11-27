
In this lab, it contains:
   data folder: set this module functions
                store our json format data in note.json

   public folder: in main.css we set the webpage style
                  in home.js, set the home page scripts
                  in newnote.js, set the create new note page scripts
                  in note.js, set the display note page scripts

   routes folder: set server options, contains index.js, api.js
                  through example.js, we set the POST method for AJAX

   views folder:  set the main.handlebars param, and the
                  home-scripts.handlebars,
                  newnote-scripts.handlebars,
                  note-scripts.handlebars,
                  todo_item.handlebars,
                  home.handlebars set the home page of this module
                  newnote.handlebars set the create new note page
                  note.handlebars set the display note page

   app.js file:   start jsfile, to start npm

   package.json file:  set npm params

You can use Chrome Browser to check the home page and note page

For get our webpage, in routes/examples.js:
    GET    /                : http://localhost:3000/
                            the home page, this will show the not lists, if no note, it will show nothing
                            it there are some lists, it will list out them, display their summary with a link to each note
                            and sort according to their due date
    GET    /new             : http://localhost:3000/new/
                            you can create a new note page in this web page
                            you need to provide the title, due date, summary and body of the new note
                            this page also provide a link to the note-lists
                            after click "add new note" button, it will redirect to the detail note page
                            which is http://localhost:3000/note/:note
    GET    /note/:note      : http://localhost:3000/note/:note
                            this page show the detail information of the "note" id
                            it also contains the note-lists button, which you can click and redirect to the home page
                            it contains the "new note" button, after you click
                            it will show the next page which due date is after current note
                            if there is a note, redirect to the note page
                            if not, this page will do nothing, no changing


