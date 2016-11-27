const mongoCollections = require("../config/mongoCollections");
const classes = mongoCollections.classes;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllClasses() {
        return classes().then((classesCollection) => {
            return classesCollection.find({
                classtype: "class", classIndex: "5"
            }, {code: 1, _id: 0}).toArray();
        }).catch((error) => {
            console.error(error);
            return Promise.reject("Get All Classes Error");
        });
    },

    getClass(code) {
        //get the details for a hobby according to their hobby name
        if (!code || typeof code !== 'string') return Promise.reject("You should provide a correct class code");

        return classes().then((classesCollection) => {
            return classesCollection.find({
                code: code
            },{_id:0, name:1, classMajor:1,code:1,professor:1,description:1}).toArray();          
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Get ${code} Class Error`);
        });
    },

    getClassById(id) {
        if (!id) return Promise.reject("You should provide a id of class");

        return classes().then((classesCollection) => {
            return classesCollection.findOne({
                _id: id
            }).then((classItem) => {
                if (!classItem) return Promise.reject(`Cannot Find ID: ${id} Class`);
                return classItem;
            });
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Get ID: ${id} Class Error`);
        });
    },

    addClass(name, classMajor, code, professor, description) {
        if (!name || typeof name !== 'string') return Promise.reject("You should provide a correct class name");
        if (!classMajor || typeof classMajor !== 'string') return Promise.reject("You should provide a correct class major");
        if (!code || typeof code !== 'string') return Promise.reject("You should provide a correct class code");
        if (!professor || typeof professor !== 'string') return Promise.reject("You should provide a correct class professor name");
        if (!description || typeof description !== 'string') return Promise.reject("You should provide a correct class description");
        
        return classes().then((classesCollection) => {
            let index0 = code.charAt(0);
            let newClass = {
                _id: uuid.v4(),
                classtype: "class",
                name: name,
                classMajor: classMajor,
                classIndex: index0,
                code: code,
                professor: professor,
                description: description
            };

            return classesCollection.insertOne(newClass).then((newClassInfo) => {
                return newClassInfo.insertedId;
            }).then((newClassId) => {
                return this.getClassById(newClassId);
            });
        }).catch((error) => {
            return Promise.reject(`Add ${name} Class Error`);
        });
    },

    removeClass(id) {
        if (!id) return Promise.reject("You should provide a id of class");

        return classes().then((classesCollection) => {
            return classesCollection.removeOne({
                _id: id
            }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    return Promise.reject(`Could not delete class with id of ${id}`)
                }
            });
        }).catch((error) => {
            return Promise.reject(`Remove ID: ${id} Class Error`);
        });
    },

    updateClass(id, name, classMajor, code, professor, description) {
        if (!id) return Promise.reject("You should provide a id of hobby");
        if (!name || typeof name !== 'string') return Promise.reject("You should provide a correct class name");
        if (!classMajor || typeof classMajor !== 'string') return Promise.reject("You should provide a correct class major");
        if (!code || typeof code !== 'string') return Promise.reject("You should provide a correct class code");
        if (!professor || typeof professor !== 'string') return Promise.reject("You should provide a correct class professor name");
        if (!description || typeof description !== 'string') return Promise.reject("You should provide a correct class description");
        
        return classes().then((classesCollection) => {
            return classesCollection.update({
                _id: id
            }, {$set: {name: name, classMajor: classMajor, code: code, professor: professor, description: description}}).then(() => {
                return this.getClassById(id);
            });
        }).catch((error) => {
            return Promise.reject(`Update ID: ${id} Class Error`);
        });
    },
}

module.exports = exportedMethods;
