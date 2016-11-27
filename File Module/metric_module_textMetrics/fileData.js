const fs = require('fs');

let myFileMod = exports = module.exports;

myFileMod.getFileAsString = (path) => {
    return new Promise((fulfill, reject) => {
        if (!path) {
            reject("No file provided");
            return;
        }

        fs.readFile(path, "utf-8", (error, data) => {
            if (error) {
                console.log("Reading file error");
                reject(error);
                return;
            }

            try {
                let jsonData = data.toString();
                console.log("StringFile:" + typeof jsonData);
                fulfill(jsonData);
            } catch (pathError) {
                console.log("Reading path file error");
                reject(pathError);
            }
        });
    });
};

myFileMod.getFileAsJSON = (path) => {
    return new Promise((fulfill, reject) => {
        myFileMod.getFileAsString(path).then((StringData) => {
            // let JsonFile = JSON.parse(StringData);
            let JsonFile = JSON.parse(JSON.stringify(StringData || null));
            fulfill(JsonFile);
        }).catch((error) => {
            console.error("Parsing path file error");
            console.error(error);

            reject(error);
        });
    });
};

myFileMod.saveStringToFile = (path, text) => {
    return new Promise((fulfill, reject) => {
        if (!path) {
            reject("No file provided");
            return;
        }

        if (typeof text !== 'string') {
            reject("Text format is wrong");
            return;
        }

        fs.writeFile(path, text, (error, text) => {
            if (error) {
                console.log("Writing String File Error");
                reject(error);
                return;
            }

            fulfill(text);
            return true;
        });
    });
};

myFileMod.saveJSONToFile = (path, obj) => {
    return new Promise((fulfill, reject) => {
        if (!path) {
            reject("No file provided");
            return;
        }

        if (typeof obj === 'undefined') {
            reject("Text format is wrong");
            return;
        }

        fs.writeFile(path, JSON.stringify(obj, null, 4), (error, text) => {
            if (error) {
                console.log("Writing JSON File Error");
                reject(error);
                return;
            }

            fulfill(text);
            return true;
        });
    });
};