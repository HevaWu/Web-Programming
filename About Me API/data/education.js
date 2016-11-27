const mongoCollections = require("../config/mongoCollections");
const education = mongoCollections.education;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllSchools() {
        return education().then((educationCollection) => {
            return educationCollection.find({},{_id:0}).toArray();
        }).catch((error) => {
            console.error(error);
            return Promise.reject("Get All Schools Error");
        });
    },

    getSchool(schoolType) {
        //get high school or undergrad school
        if (!schoolType || typeof schoolType !== 'string') return Promise.reject("You should provide a correct school type");

        return education().then((educationCollection) => {
            return educationCollection.findOne({
                schoolType: schoolType
            },{_id:0}).then((school) => {
                if (!school) return Promise.reject(`Cannot Find ${schoolType} School`);
                return school;
            })
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Get ${schoolType} School Error`);
        });
    },

    getSchoolById(id) {
        if (!id) return Promise.reject("You should provide a id of school");

        return education().then((educationCollection) => {
            return educationCollection.findOne({
                _id: id
            }).then((school) => {
                if (!school) return Promise.reject(`Cannot Find ID: ${id} School`);
                return school;
            });
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Get ID: ${id} School Error`);
        });
    },

    addSchool(schoolName, schoolType, degree) {
        if (!schoolName || typeof schoolName !== 'string') return Promise.reject("You should provide a correct school name");
        if (!schoolType || typeof schoolType !== 'string') return Promise.reject("You should provide a correct school type");

        return education().then((educationCollection) => {
            let newSchool = {};
            if (new String(schoolType).valueOf() == new String("highschool").valueOf()) {
                newSchool = {
                    _id: uuid.v4(),
                    schoolName: schoolName,
                    schoolType: schoolType
                };
            }

            if(new String(schoolType).valueOf() == new String("undergrad").valueOf()){
                newSchool = {
                    _id: uuid.v4(),
                    schoolName: schoolName,
                    schoolType: schoolType,
                    degree: degree
                };
            }

            return educationCollection.insertOne(newSchool).then((newSchoolInfo) => {
                return newSchoolInfo.insertedId;
            }).then((newSchoolId) => {
                return this.getSchoolById(newSchoolId);
            });
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Add ${schoolName} School Error`);
        });
    },

    removeSchool(id) {
        if (!id) return Promise.reject("You should provide a id of school");

        return education().then((educationCollection) => {
            return educationCollection.removeOne({
                _id: id
            }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    return Promise.reject(`Could not delete school with id of ${id}`)
                }
            });
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Remove ID: ${id} School Error`);
        });
    },

    updateSchool(id, schoolName, schoolType) {
        if (!id) return Promise.reject("You should provide a id of school");
        if (!schoolName || typeof schoolName !== 'string') return Promise.reject("You should provide a correct school name");
        if (!schoolType || typeof schoolType !== 'string') return Promise.reject("You should provide a correct school type");

        return education().then((educationCollection) => {
            let updatedSchool = {
                schoolName: schoolName,
                schoolType: schoolType
            };

            return educationCollection.updateOne({
                _id: id
            }, updatedSchool).then(() => {
                return this.getSchoolById(id);
            });
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Update ID: ${id} School Error`);
        });
    },
}

module.exports = exportedMethods;