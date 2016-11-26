# Simple Browser APIs and jQuery

Make a simple server that renders a single page

This page will keep track of several values using client side JavaScript; Detail the keys you use and their respective values on this single page in a table with 2 columns.

The columns are:  
* The key name you used  
* The value you are storing  
* You will have a form with a single input on the page. It can take a number, select, textarea, whatever you desire.

The data you will detail in the table:  
* How many times a 1.5 second interval has occurred since the page has loaded; this will be cumulative across all the times the page has loaded. This means that if you load the page and stay on it 5 seconds before refreshing, you will have gone through 3 intervals. This should be stored in localStorage each update, as well as updated on the table. After refreshing, the timer will restart but you will keep accumulating onto that same total.  
* You will record how many times the form has been submitted. You will use `jQuery` for the event handling.  
* You will record what the last inputed value was. You will use `jQuery` for the event handling.  
* You will keep track of the location hash (Links to an external site.) and update a table column when the document is loaded or the hash changes. The page should not have to be reloaded to trigger the update on the table  
* You will use `jQuery` to do all the `DO`M Manipulation.
