const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const recipes = require("./recipes");
const uuid = require('node-uuid');

let exportedMethods = {
    getAllComments() {
        return comments().then((commentCollection) => {
            return commentCollection.find({}).toArray();
        }).catch((error)=>{
            return Promise.reject("Comment Collection: Get All Comments Error");
        });
    },
    getCommentsByRecipeId(recipeId) {
        if (!recipeId) return Promise.reject("No recipeId provided");

        return comments().then((commentCollection) => {
            return commentCollection.find({
                recipeId: recipeId
            }).toArray();
        }).catch((error)=>{
            return Promise.reject("Comment Collection: Get Comments By RecipeId Error");
        });
    },
    getCommentsByCommentId(commentId) {
        if (!commentId) return Promise.reject("No commentId provided");

        return comments().then((commentCollection) => {
            return commentCollection.findOne({
                _id: commentId
            }).then((comment) => {
                if (!comment) throw "Comment not found";
                return comment;
            });
        }).catch((error)=>{
            return Promise.reject("Comment Collection: Get Comments By CommentId Error");
        });
    },
    addCommentToRecipe(poster, comment, recipeId) {
        if (typeof poster !== "string") return Promise.reject("No poster name provided");
        if (typeof comment !== "string") return Promise.reject("No comment provided");

        return comments().then((commentCollection) => {
            return recipes.getRecipeById(recipeId)
                .then((recipeComment) => {
                    let newComment = {
                        _id: uuid.v4(),
                        recipeId: recipeId,
                        recipeTitle: `${recipeComment.title}`,
                        name: comment,
                        poster: poster
                    };

                    return recipes.addCommentToRecipe(poster, comment, newComment._id, recipeId).then(() => {
                        return commentCollection.insertOne(newComment).then((newInsertInformation) => {
                            return newInsertInformation.insertedId;
                        }).then((newId) => {
                            return this.getCommentsByCommentId(newId);
                        }).catch((error) => {
                            console.log("add Comment error");
                            console.log(error);
                        });
                    });
                });
        }).catch((error)=>{
            return Promise.reject("Comment Collection: Add Comment To Recipe Error");
        });
    },
    updateCommentByRecipeId(recipeId, commentId, updateComment) {
        return comments().then((commentCollection) => {
            let updatedCommentData = {};

            if (updateComment.comment) {
                updatedCommentData.name = updateComment.comment;
            }

            if (updateComment.poster) {
                updatedCommentData.poster = updateComment.poster;
            }

            let updateCommand = {
                $set: updatedCommentData
            };

            return recipes.updateCommentToRecipe(recipeId, commentId, updatedCommentData).then(() => {
                return commentCollection.updateOne({
                        _id: commentId
                    }, updateCommand)
                    .then((result) => {
                        return this.getCommentsByCommentId(commentId);
                    });
            })
        }).catch((error)=>{
            return Promise.reject("Comment Collection: Update Comment By RecipeId Error");
        });
    },
    removeComment(commentId) {
        return comments().then((commentCollection) => {
            return commentCollection.findOne({
                _id: commentId
            }).then((commentInfo) => {
                return commentInfo.recipeId;
            }).then((recipeInfoId) => {
                //remove comment from recipe
                return recipes.removeCommentFromRecipe(recipeInfoId, commentId);
            }).then(() => {
                return commentCollection.removeOne({
                    _id: commentId
                }).then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw (`Could not delete comment with id of ${id}`)
                    }
                });
            })
        }).catch((error)=>{
            return Promise.reject("Comment Collection: Remove Comment Error");
        });
    }
}

module.exports = exportedMethods;