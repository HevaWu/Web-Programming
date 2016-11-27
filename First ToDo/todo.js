const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
var uuid = require('node-uuid');

// let taskID = new Set();
let taskID = [];
var taskArray = [];

Array.prototype.remove = function() {
	//remove a given value in an array
	var what, a = arguments,
		L = a.length,
		ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

let exportedMethods = {
	taskID() {
		return taskID;
	},

	taskArray() {
		return taskArray;
	},

	createTask(title, description) {
		if (!title) return Promise.reject("You should provide a title");
		if (!description) return Promise.reject("You should provide a description");

		return todoItems().then((todoCollection) => {
			let newItem = {
				_id: uuid.v1(), //an unique identifier for the task
				title: title, //the title of the task
				description: description, //a descriptive bio of the task
				completed: false,
				completedAt: null
			}

			return todoCollection.insertOne(newItem).then((newInsertItem) => {
				return newInsertItem.insertedId;
			}).then((newId) => {
				taskID.push(newId);
				return this.getTask(newId);
			}).catch((error) => {
				console.log("Insert Task Fail");
				return Promise.reject(error);
			});
		}).catch((error)=>{
			console.log("Create Task Fail");
			return Promise.reject(error);
		});
	},

	getAllTasks() {
		return todoItems().then(() => {
			taskArray = [];
			// console.log("Current taskid ");
			// console.log(taskID);
			taskArray = taskID.map(exportedMethods.getTask);
		}).then(() => {
			return Promise.all(taskArray).then((taskData) => {
				// console.log("Task Array: ");
				// console.log(taskData);
				return Promise.resolve(taskData);
			});
		}).catch((error) => {
			console.log("Get All Tasks Error");
			console.log(error);
			return Promise.reject(error);
		});
	},

	getTask(id) {
		if (!id) return Promise.reject("You should provide a id");

		return todoItems().then((todoCollection) => {
			return todoCollection.findOne({
				_id: id
			});
		}).catch((error) => {
			console.log("This task does not exist");
			return Promise.reject(error);
		});
	},

	completeTask(taskId) {
		if (!taskId) return Promise.reject("You should provide a task id");

		return todoItems().then((todoCollection) => {
			let updateTask = {
				completed: true,
				completedAt: new Date()
			}

			return todoCollection.update({
				_id: taskId
			}, {$set: {completed: true, completedAt: new Date()}}).then(() => {
				return exportedMethods.getTask(taskId);
			}).catch((error) => {
				console.log(`Task ${taskId} could not be completed`);
				return Promise.reject(error);
			});
		}).catch((error)=>{
			console.log("Complete Task Fail");
			return Promise.reject(error);
		});
	},

	removeTask(id) {
		if (!id) return Promise.reject("You should provide a id");

		return todoItems().then((todoCollection) => {
			return todoCollection.removeOne({
				_id: id
			}).then((deletionInfo) => {
				taskID.remove(id);
				// console.log(taskID);
				if (deletionInfo.deletedCount === 0) {
					return Promise.reject(`Could not delete task with id of ${id}`);
				}
			});
		}).catch((error) => {
			console.log(`Task ${taskId} remove fail`);
			return Promise.reject(error);
		});
	}
}

module.exports = exportedMethods;