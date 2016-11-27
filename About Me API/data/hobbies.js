const mongoCollections = require("../config/mongoCollections");
const hobbies = mongoCollections.hobbies;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllHobbies() {
        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.find({
                hobbytype: "hobby"
            }, {hobby: 1, _id: 0}).toArray();
        }).catch((error) => {
            console.error(error);
            return Promise.reject("Get All Hobbies Error");
        });
    },

    getHobby(hobby) {
        //get the details for a hobby according to their hobby name
        if (!hobby || typeof hobby !== 'string') return Promise.reject("You should provide a correct hobby name");

        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.findOne({
                hobby: hobby
            },{_id:0, hobby:1, hobbyDetails:1}).then((hobbyItem) => {
                if (!hobbyItem) return Promise.reject(`Cannot Find ${hobby} Hobby`);
                return hobbyItem;
            })
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Get ${hobby} Hobby Error`);
        });
    },

    getHobbyById(id) {
        if (!id) return Promise.reject("You should provide a id of hobby");

        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.findOne({
                _id: id
            }).then((hobbyItem) => {
                if (!hobbyItem) return Promise.reject(`Cannot Find ID: ${id} Hobby`);
                return hobbyItem;
            });
        }).catch((error) => {
            console.error(error);
            return Promise.reject(`Get ID: ${id} Hobby Error`);
        });
    },

    addHobby(hobby, hobbyDetails) {
        if (!hobby || typeof hobby !== 'string') return Promise.reject("You should provide a correct hobby name");
        if (!hobbyDetails || typeof hobbyDetails !== 'string') return Promise.reject("You should provide a correct hobby details");

        return hobbies().then((hobbiesCollection) => {
            let newHobby = {
                _id: uuid.v4(),
                hobbytype: "hobby",
                hobby: hobby,
                hobbyDetails: hobbyDetails
            };

            return hobbiesCollection.insertOne(newHobby).then((newHobbyInfo) => {
                return newHobbyInfo.insertedId;
            }).then((newHobbyId) => {
                return this.getHobbyById(newHobbyId);
            });
        }).catch((error) => {
            return Promise.reject(`Add ${hobby} Hobby Error`);
        });
    },

    removeHobby(id) {
        if (!id) return Promise.reject("You should provide a id of hobby");

        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.removeOne({
                _id: id
            }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    return Promise.reject(`Could not delete hobby with id of ${id}`)
                }
            });
        }).catch((error) => {
            return Promise.reject(`Remove ID: ${id} Hobby Error`);
        });
    },

    updateHobby(id, hobby, hobbyDetails) {
        if (!id) return Promise.reject("You should provide a id of hobby");
        if (!hobby || typeof hobby !== 'string') return Promise.reject("You should provide a correct hobby name");
        if (!hobbyDetails || typeof hobbyDetails !== 'string') return Promise.reject("You should provide a correct hobby details");

        return hobbies().then((hobbiesCollection) => {
            return educationCollection.update({
                _id: id
            }, {$set: {hobby: hobby , hobbyDetails: hobbyDetails}}).then(() => {
                return this.getHobbyById(id);
            });
        }).catch((error) => {
            return Promise.reject(`Update ID: ${id} Hobby Error`);
        });
    },
}

module.exports = exportedMethods;