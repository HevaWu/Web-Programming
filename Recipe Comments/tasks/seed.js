const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const recipes = data.recipes;
const comments = data.comments;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
            return dbConnection;
        }).then((db) => {
            //addRecipe(title, ingredients, steps, comments)
            let ingredients = [{
                name: "Egg",
                amount: "2 eggs"
            }];

            let steps = [
                "First, heat a non-stick pan on medium-high until hot",
                "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
                "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
                "Gently pour the egg from the bowl onto the oil",
                "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
                "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
                "Remove from oil and plate"
            ];

            return recipes.addRecipe("Fried Eggs", ingredients, steps).then((recipeData) => {
                const recipeDataId = recipeData._id;

                //addCommentToRecipe(poster, comment, recipeId) 
                let poster = "Gordan Ramsay";
                let comment = "These eggs are delicious!";

                return comments.addCommentToRecipe(poster, comment, recipeDataId);
            });
        })
        .then(() => {
            console.log("Done seeding database");
            db.close();
        }).catch((error) => {
            console.log(error);
        });
}, (error) => {
    console.error(error);
});