const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllRecipes() {
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({}, {
                _id: 1,
                title: 1
            }).toArray();
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Get All Recipes Error");
        });
    },
    getRecipeById(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({
                _id: id
            }).then((recipe) => {
                if (!recipe) throw "Recipe not found";
                return recipe;
            });
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Get Recipe By Id Error");
        });
    },
    addRecipe(title, ingredients, steps, comments) {
        if (typeof title !== "string") return Promise.reject("No Recipe title provided");
        if (!Array.isArray(ingredients)) ingredients = [];
        if (!Array.isArray(steps)) steps = [];
        if (!Array.isArray(comments)) comments = [];

        return recipes().then((recipeCollection) => {
            let newRecipe = {
                _id: uuid.v4(),
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: comments
            };

            return recipeCollection.insertOne(newRecipe).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getRecipeById(newId);
            });
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Add Recipe Error");
        });
    },
    removeRecipeById(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.removeOne({
                _id: id
            }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete recipe with id of ${id}`)
                }
            });
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Remove Recipe By Id Error");
        });
    },
    updateRecipe(id, updatedRecipeInfo) {
        return recipes().then((recipeCollection) => {
            let updatedRecipeData = {};

            if (updatedRecipeInfo.title) {
                updatedRecipeData.title = updatedRecipeInfo.title;
            }

            if (updatedRecipeInfo.ingredients) {
                updatedRecipeData.ingredients = updatedRecipeInfo.ingredients;
            }

            if (updatedRecipeInfo.steps) {
                updatedRecipeData.steps = updatedRecipeInfo.steps;
            }

            let updateCommand = {
                $set: updatedRecipeData
            };

            return recipeCollection.updateOne({
                _id: id
            }, updateCommand).then((result) => {
                return this.getRecipeById(id);
            });
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Update Recipe Error");
        });
    },

    addCommentToRecipe(poster, comment, commentId, recipeId) {
        return this.getRecipeById(recipeId).then((currentRecipe) => {
            return recipes().then((recipeCollection) => {
                return recipeCollection.updateOne({
                    _id: recipeId
                }, {
                    $addToSet: {
                        comments: {
                            _id: commentId,
                            poster: poster,
                            comment: comment
                        }
                    }
                });
            });
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Add Comment To Recipe Error");
        });
    },
    updateCommentToRecipe(recipeId, commentId, updatedComment) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({
                    _id: recipeId,
                    "comments._id": commentId
                }, {
                    "comments.$": 1
                })
                .toArray().then((currentComment) => {

                    let updateCommentData = currentComment[0].comments[0];
                    if (updatedComment.poster) {
                        updateCommentData.poster = updatedComment.poster;
                    }
                    if (updatedComment.name) {
                        updateCommentData.comment = updatedComment.name;
                    }

                    return recipes().then((recipeCollection) => {
                        return recipeCollection.update({
                            _id: recipeId,
                            "comments._id": commentId
                        }, {
                            $set: {
                                "comments.$": updateCommentData
                            }
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                });
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Update Comment To Recipe Error");
        });
    },
    removeCommentFromRecipe(recipeId, commentId) {
        return recipes().then((recipeCollection) => {
            return this.getRecipeById(recipeId).then((currentRecipe) => {
                return recipeCollection.updateOne({
                    _id: recipeId
                }, {
                    $pull: {
                        comments: {
                            _id: commentId
                        }
                    }
                });
            });
        }).catch((error)=>{
            return Promise.reject("Recipe Collection: Remove Comment From Recipe Error");
        });
    }
}

module.exports = exportedMethods;