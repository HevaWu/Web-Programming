# Text Manipulation, Two ways

* Sending a form to the server to render the result on a new page
* Intercepting a form on the client to render the result without leaving the page

Implement the same algorithm on the server in a module, and on the client in a script file

The form contains four inputs:  
* A textarea that you will put a moderate amount of text in.  
* An input that will take a string; this string will be inserted into the text from the textarea.  
* An input that will take a number; this will be the number of times the string will be inserted  
* A second input that take a number; this will be the number of characters between each insert.  

For example, with the following input:  
1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus augue urna. Nam in turpis sapien. Pellentesque vehicula augue quis vehicula egestas. Phasellus non iaculis justo, eget cursus purus. Ut id ante vel elit maximus ullamcorper a pretium erat. Nullam pharetra rutrum velit, quis commodo felis gravida a. Aliquam justo dolor, blandit sed turpis ultrices, tempus aliquam eros. Nulla sollicitudin, lorem a mattis tincidunt, ligula mi cursus nisi, a laoreet metus erat non libero.  
2. HELLOHELLO  
3. 5  
4. 7  

You will get the output:  

`Lorem iHELLOHELLOpsum doHELLOHELLOlor sitHELLOHELLO amet, HELLOHELLOconsectHELLOHELLOetur adipiscing elit. In luctus augue urna. Nam in turpis sapien. Pellentesque vehicula augue quis vehicula egestas. Phasellus non iaculis justo, eget cursus purus. Ut id ante vel elit maximus ullamcorper a pretium erat. Nullam pharetra rutrum velit, quis commodo felis gravida a. Aliquam justo dolor, blandit sed turpis ultrices, tempus aliquam eros. Nulla sollicitudin, lorem a mattis tincidunt, ligula mi cursus nisi, a laoreet metus erat non libero.`  
