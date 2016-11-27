# File Module

* Using fileData.js to export four methods, and using textMetrics.js to scan through the text for confirming the function can run, and count the text information 
* getFileAsString(path), This method will, when given a path, return a promise that resolves to a string with the contents of the files. If no path is provided, it will return a rejected promise. If there are any errors reading the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.  
* getFileAsJSON(path),This method will, when given a path, return a promise that resolves to a JavaScript object. You can use the JSON.parse function to convert a string to a JavaScript object (if it's valid!). If no path is provided, it will return a rejected promise. If there are any errors reading the file or parsing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback. Hint: this function can be accomplished in approximately 3-4 lines. Don't overcomplicate it!  
* saveStringToFile(path, text) This method will take the text supplied, and store it in the file specified by path. The function should return a promise that will resolve to true when saving is completed. If no path or text is provided, it will return a rejected promise. If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.  
* saveJSONToFile(path, obj) This method will take the obj supplied and convert it into a string so that it may stored as in a file. The function should return a promise that will resolve to true when saving is completed. If no path or obj is provided, it will return a rejected promise. If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.  
* textMetrics.js This module will export one method, createMetrics(text)which will scan through the text ignoring case and return an object with the following information:(ignore any character that is punctuation. Ignore all spaces. Ignore all commas. Ignore all question marks, exclamation marks, periods, single quotes, double quotes, etc. You will only care about letters and spaces.)  
`{
    totalLetters: total number of letters in the text,
    totalWords: total number of words in the text,
    uniqueWords: total number of unique words that appear in the text,
    longWords: number of words in the text that are 6 or more letters long,
    averageWordLength: the average number of letters in a word in the text,
    numberOfSentences: total number of sentences in the text,
    textComplexity: totalWords/numberOfSentences + (longWords x 100)/totalWords
    wordOccurrences: {
        word1: number of times that word appears in the text,
        word2: number of times that word appears in the text,
        etc... 
    }
}`  
So running:  
createMetrics("Hello, my friends! This is a great day to say hello.")  
Will return:  
`{
    totalLetters: 39,
    totalWords: 11,
    uniqueWords: 10,
    longWords: 1,
    averageWordLength: 3.55,
    textComplexity: 14.59
    wordOccurrences: {
        hello: 2,
        my: 1,
        friends: 1,
        this: 1,
        is: 1,
        a: 1,
        great: 1,
        day: 1,
        to: 1,
        say: 1
    }
}`  
