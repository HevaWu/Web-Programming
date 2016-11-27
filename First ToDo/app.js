const connection = require("./mongoConnection");
const todoItems = require("./todo");

/*1. createponder dinosaurs task*/
let createPonder = todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?").catch((error) => {
    console.log("Create the Ponder task error");
    console.log(error);
    return Promise.reject(error);
});;

/*2. log the task, and then create a new Pokemon task*/
let logPonder = createPonder.then((PonderTask) => {
    console.log("---------------The first task is: ----------------------");
    console.log(PonderTask);
    return PonderTask;
}).catch((error) => {
    console.log("Log the Ponder task error");
    console.log(error);
    return Promise.reject(error);
});;

let createPokemon = logPonder.then(() => {
    return todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
}).catch((error) => {
    console.log("Create the Pokemon task error");
    console.log(error);
    return Promise.reject(error);
});;

/*3. query all tasks and log them*/
let allTwoTask = createPokemon.then(() => {
    return todoItems.getAllTasks();
}).catch((error) => {
    console.log("Get all of tasks error");
    console.log(error);
    return Promise.reject(error);
});;

let logAllTwoTask = allTwoTask.then((tasks) => {
    console.log("---------------Here is all current tasks: ---------------");
    console.log(tasks);
    return tasks;
}).catch((error) => {
    console.log("Log all of tasks error");
    console.log(error);
    return Promise.reject(error);
});;

/*4. remove the first task*/
let removeFirstTask = logAllTwoTask.then(() => {
    taskIDlist = todoItems.taskID();

    console.log("---------------Now, the first task is: ------------------");
    return firstTask = todoItems.getTask(taskIDlist[0]).then((firstData) => {
        console.log(firstData);
        console.log("---------------Now, remove it! --------------------------");
        return firstData;
    });
}).then((firstData) => {
    return todoItems.removeTask(firstData._id);
}).catch((error) => {
    console.log("Remove the first task error");
    console.log(error);
    return Promise.reject(error);
});

/*5. query all tasks and log them*/
let allTaskAfterRemove = removeFirstTask.then(() => {
    return todoItems.getAllTasks();
}).catch((error) => {
    console.log("Get all tasks after removing the first task error");
    console.log(error);
    return Promise.reject(error);
});

let logAllTaskAfterRemove = allTaskAfterRemove.then((tasks) => {
    console.log("---------------Here is all current tasks: ---------------");
    console.log(tasks);
    return tasks;
}).catch((error) => {
    console.log("Log all tasks after removing the first task error");
    console.log(error);
    return Promise.reject(error);
});

/*6. complete the remaining task*/
let completeRemainTask = logAllTaskAfterRemove.then(() => {
    // console.log("Current task Array id is: ");
    // console.log(todoItems.taskID());
    taskIDlist = todoItems.taskID();

    return taskIDlist.map(todoItems.completeTask);
}).then((completeArray) => {
    return Promise.all(completeArray).then((completeData) => {
        console.log("---------------Complete Task Now! ------------------------");
        // console.log(completeData);
        return Promise.resolve(completeData);
    });
}).catch((error) => {
    console.log("Complete the remaining task error");
    console.log(error);
    return Promise.reject(error);
});

/*7. query and log the remaining task*/
let remainTaskAfterComplete = completeRemainTask.then(()=>{
    return todoItems.getAllTasks();
}).catch((error) => {
    console.log("Get remain tasks after completing them error");
    console.log(error);
    return Promise.reject(error);
});

let logRemainTaskAfterComplete = remainTaskAfterComplete.then((tasks) => {
    console.log("---------------Here is all current tasks: ---------------");
    console.log(tasks);
    return tasks;
}).catch((error) => {
    console.log("Log remain tasks after completing them error");
    console.log(error);
    return Promise.reject(error);
});

logRemainTaskAfterComplete.catch().then(() => {
    return connection();
}).then((db) => {
    return db.close(); //close the connection to mongodb, close database connection
});

// test createTask(title, description)
// let createdTask = todoItems.createTask("My First Task", "This is the first thing I need to do today");
