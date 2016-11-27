
In this lab, it contains:
   public folder: in main.css we set the webpage style
                  in browserform.js we set our form page

   routes folder: set server options, contains index.js, examples.js
                  through example.js, we render our page and send it to web side

   views folder:  set the main.handlebars param, and the browserform.handlebars, browserform-script.handlebars
                  browserform-script.handlebars set the script text
                  browserform.handlebars set the form of our web page

   app.js file:   start jsfile, to start npm

   package.json file:  set npm params

You can use Chrome Browser to check the browserform form

For get our webpage, in routes/examples.js:
    GET    /browserform    : http://localhost:3000/examples/browserform/
    						            get the browserform homepage
                            In this page, you can count the intervals, each interval means 1.5 seconds
                            The Location Table shows if you want to add hash, you can click the Add Hash, and the table will show the adding hash value, if you don't want to add hash, you can click the "Nothing Added" button to cancel the hash value
                            The Key-Value Set shows the key-value pair in our local storage, you can add the key-value, you mush provide a key. You can clear the key-value form and reset the table. After each insert, the page will show you the submit times, and which you input last time.

