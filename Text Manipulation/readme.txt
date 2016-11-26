/***********************
 * Course: CS-546-A    *
 * Student: He Wu      *
 * CWID: 10406347      *
 *       Lab 5         *
 **********************/

In this lab, it contains: 
   data folder:   set text module functions, 
                  contains index.js, text.js
                  
   public folder: in main.css we set the webpage style
                  in form.js we set the client form

   routes folder: set server options, contains index.js, text.js

   views folder:  set the main.handlebars param, and the clientform.handlebars, serverform.handlebars

   app.js file:   start jsfile, to start npm
   
   package.json file:  set npm params

You can use Chrome Browser to check the server form and client form.

For text routes
    GET    /clientform    : http://localhost:3000/clientform/
    						get the clientform homepage

    GET    /serverform    : http://localhost:3000/serverform/
    						get the serverform homepage

    POST   /serverform    : http://localhost:3000/serverform/
                            post the input serverform
