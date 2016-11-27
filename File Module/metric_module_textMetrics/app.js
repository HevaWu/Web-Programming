/* * * * * * * * * * * * *
 * Student Name: He Wu   *
 * Course: CS-546-A	     *
 * Stevens ID: 10406347  *
 *         Lab 2	     *
 * * * * * * * * * * * * */

const mymetrix = require("./textMetrics");
const myfile = require("./fileData");


//test the string

mymetrix.createMetrics("Hello, my friends! This is a great day to say hello.");
// mymetrix.createMetrics();
// mymetrix.createMetrics(123);


//test the txt file
//-------------Chapter1--------------------;
let C1StringFile = myfile.getFileAsString("chapter1.txt");
C1StringFile.then((stringText) => {
	mymetrix.createMetrics(stringText);
}).catch((error) => {
	console.error("Parse file fail");
	console.error(error);
	return {};
});

//-------------Chapter2--------------------
let C2StringFile = myfile.getFileAsString("chapter2.txt");
C2StringFile.then((stringText) => {
	mymetrix.createMetrics(stringText);
}).catch((error) => {
	console.error("Parse file fail");
	console.error(error); 
	return {};
});

//-------------Chapter3--------------------;
let C3StringFile = myfile.getFileAsString("chapter3.txt");
C3StringFile.then((stringText) => {
	mymetrix.createMetrics(stringText);
}).catch((error) => {
	console.error("Parse file fail");
	console.error(error);
	return {};
});