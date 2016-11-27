let myTextMod = exports = module.exports;

let totalLetters = 0,
	totalWords = 0,
	uniqueWords = 0,
	longWords = 0,
	averageWordLength = 0,
	numberOfSentences = 0,
	textComplexity = 0;

let wordOccurrences = {};

const endMark = [".", "?", "!"];
const prefix = ["mr", "mrs", "miss", "ms"];
const ignoreMark = " ";

String.prototype.replaceAt = function(index, character) {
	//define this function to replace a character at a particular index
	return this.substr(0, index) + character + this.substr(index + character.length);
}

let parseText = (text) => { //transfer the text only contains letters and space
	let mytext = text.toLowerCase(); //transfer to lowercase

	for (var i = 0; i < mytext.length; i++) {
		if (mytext[i] >= 'a' && mytext[i] <= 'z') {
			//this character is letter
			totalLetters++;
		} else if (endMark.indexOf(mytext[i]) >= 0) {
			if (mytext[i] == '.') { //if this mark is represent prefix mr mrs miss ms
				if ((i >= 2 && prefix.indexOf(mytext.substring(i - 2, i)) >= 0) ||
					(i >= 3 && prefix.indexOf(mytext.substring(i - 3, i)) >= 0) ||
					(i >= 4 && prefix.indexOf(mytext.substring(i - 4, i)) >= 0)) {
					mytext = mytext.replaceAt(i, " "); //change it into ' 'space for avoiding count this mark twice
					continue;
				}
			}
			numberOfSentences++; //this is a sentence end mark
			mytext = mytext.replaceAt(i, " "); //change it into ' 'space
			//console.log(mytext + " -------------------------------------------------------------------------------------------------- " +numberOfSentences);
		} else if (mytext[i] == '\'') {
			mytext = mytext.substr(0, i) + mytext.substr(i + 1); //change don't to dont
		} else if (mytext[i] == ' ') {
			continue;
		}
	}

	mytext = mytext.replace(/[^a-z]/g, ' '); //replace all no letters into space

	let words = mytext.split(' '); //split into words

	for (var i = 0; i < words.length; i++) {
		if (words[i] == '') continue;
		totalWords++;

		if (words[i].length >= 6) { //is longWords
			longWords++;
		}

		if (words[i] in wordOccurrences) { //not unique
			wordOccurrences[words[i]]++;
		} else { //is unique
			uniqueWords++;
			wordOccurrences[words[i]] = 1;
		}
	}

	return mytext;
};

myTextMod.createMetrics = (text) => {
	return new Promise((fulfill, reject) => {
		if (!text) reject("This text is not exist");
		if (typeof text !== 'string') reject("You should input a string text");

		console.log("Read text successful");
		fulfill(text);
	}).then((StringFile) => {
		totalLetters = 0;
		totalWords = 0;
		uniqueWords = 0;
		longWords = 0;
		averageWordLength = 0;
		numberOfSentences = 0;
		textComplexity = 0;
		wordOccurrences = {};

		console.log("Start parsing text ");
		return parseText(StringFile);
	}).then((textData) => {
		averageWordLength = totalLetters / totalWords;
		averageWordLength = parseFloat(averageWordLength.toFixed(2));// keep 2 digits
		textComplexity = totalWords / numberOfSentences + (longWords * 100) / totalWords;
		textComplexity = parseFloat(textComplexity.toFixed(2)); //keep 2 digits

		return textData;
	}).then((textData) => {
		var obj = {
			totalLetters: totalLetters,
			totalWords: totalWords,
			uniqueWords: uniqueWords,
			longWords: longWords,
			averageWordLength: averageWordLength,
			numberOfSentences: numberOfSentences,
			textComplexity: textComplexity,
			wordOccurrences: wordOccurrences,
		}
		console.log(obj);

		return obj;
	}).catch((error) => {
		console.log("Count the metrics fail");
		console.error(error);
		return {};
	});
};

console.log("End the Text");