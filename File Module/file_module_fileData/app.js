/* * * * * * * * * * * * *
 * Student Name: He Wu   *
 * Course: CS-546-A	     *
 * Stevens ID: 10406347  *
 *         Lab 2	     *
 * * * * * * * * * * * * */

const myfile = require("./fileData");



/*------------getFileAsString(path):-----------------------*/
let readStringFile = myfile.getFileAsString("chapter1.txt");
// let readStringFile = myfile.getFileAsString();
// let readStringFile = myfile.getFileAsString("c.txt");
// let readStringFile = myfile.getFileAsString(123);

readStringFile.then((cfileStringData) => {
	console.log("Read String File success");
	console.log("cfileStringData: " + typeof cfileStringData);

	return cfileStringData;
}).catch((error) => {
	console.error("There was an error reading file");
    console.error(error);
    return {};
});



/*------------getFileAsJSON(path):-----------------------*/
let readJSONFile = myfile.getFileAsJSON("chapter2.txt");
// let readJSONFile = myfile.getFileAsJSON();
// let readJSONFile = myfile.getFileAsJSON(123);

console.log("Json file: " + typeof myfile.getFileAsJSON("chapter2.txt"));
readJSONFile.then((cfileJSONData) => {
	console.log("Read JSON File success");
	//console.log("cfileJSONData: " + typeof cfileJSONData);

	return cfileJSONData;
}).catch((error) => {
	console.error("There was an error parsing file");
    console.error(error);
    return {};
});



/*------------saveStringToFile(path,text):-----------------*/
let saveStringFile = myfile.getFileAsString("hello.txt");
// let saveStringFile = myfile.getFileAsString();
// let saveStringFile = myfile.getFileAsString(124);

saveStringFile.then((cfileStringData) => {
	console.log("Read String File success");
	let csaveStringData = myfile.saveStringToFile("save_String.txt", cfileStringData);
	console.log("Saving String file success");
	console.log("Resolve the promise: " + Promise.resolve(csaveStringData));

	return csaveStringData;
}).catch((error) => {
	console.error("There was an error saving String file");
    console.error(error);
    return {};
});



/*------------saveJSONToFile(path,text):-------------------*/
let saveJSONFile = myfile.getFileAsJSON("chapter3.txt");
// let saveJSONFile = myfile.getFileAsJSON();
// let saveJSONFile = myfile.getFileAsJSON(111);

saveJSONFile.then((cfileJSONData) => {
	console.log("Read String File success");
	let csaveJSONData = myfile.saveJSONToFile("save_JSON.txt", cfileJSONData);
	// let csaveJSONData = myfile.saveJSONToFile("save_JSON.txt", 123);
	// let csaveJSONData = myfile.saveJSONToFile("save_JSON.txt");

	console.log("Saving JSON file success");
	console.log("Resolve the promise: " + Promise.resolve(csaveJSONData));

	return csaveJSONData;
}).catch((error) => {
	console.error("There was an error saving JSON file");
	console.error(error);
	return {};
});

