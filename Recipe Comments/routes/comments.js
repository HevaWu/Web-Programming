const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;

///comments/:commentId      GET
router.get("/:commentId", (req, res) => {
    commentData.getCommentsByCommentId(req.params.commentId).then((comment) => {
        res.json(comment);
    }).catch(() => {
        res.status(404).json({
            error: "Comment not found"
        });
    });
});

///comments/recipe/:recipeId    GET
router.get("/recipe/:recipeId", (req, res) => {
    commentData.getCommentsByRecipeId(req.params.recipeId).then((commentList) => {
        res.json(commentList);
    });
});

///commentList  GET
router.get("/", (req, res) => {
    commentData.getAllComments().then((commentList) => {
        res.json(commentList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

///comments/:recipeId/  POST
router.post("/:recipeId", (req, res) => {
    let commentInfo = req.body;
    //post poster and comment variable 

    if (!commentInfo) {
        res.status(400).json({
            error: "You must provide data to create a comment"
        });
        return;
    }

    if (!commentInfo.poster) {
        res.status(400).json({
            error: "You must provide a poster name"
        });
        return;
    }

    if (!commentInfo.comment) {
        res.status(400).json({
            error: "You must provide a comment details"
        });
        return;
    }

    commentData.addCommentToRecipe(commentInfo.poster, commentInfo.comment, req.params.recipeId)
        .then((newComment) => {
            res.json(newComment);
        }, () => {
            res.sendStatus(500);
        });
});

///comments/:recipeId/:commentId    PUT
router.put("/:recipeId/:commentId", (req, res) => {
    let commentInfo = req.body;

    //pass poster or comment to commentInfo

    if (!commentInfo) {
        res.status(400).json({
            error: "You must provide data to update a comment"
        });
        return;
    }

    let getComment = commentData.getCommentsByRecipeId(req.params.recipeId).then(() => {
        return commentData.getCommentsByCommentId(req.params.commentId).then(() => {
            return commentData.updateCommentByRecipeId(req.params.recipeId, req.params.commentId, commentInfo)
                .then((updatedComment) => {
                    res.json(updatedComment);
                }, () => {
                    res.sendStatus(500);
                });
        });
    }).catch(() => {
        res.status(404).json({
            error: "Comment not found"
        });
    });
});

///comments/:id     DELETE
router.delete("/:id", (req, res) => {
    let comment = commentData.getCommentsByCommentId(req.params.id).then(() => {
        return commentData.removeComment(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({
            error: "Comment not found"
        });
    });
});

module.exports = router;