const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

///recipes/:id      GET
router.get("/:id", (req, res) => {
    recipeData.getRecipeById(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

///recipes      GET
router.get("/", (req, res) => {
    recipeData.getAllRecipes().then((recipeList) => {
        res.json(recipeList);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

///recipes  POST
router.post("/", (req, res) => {
    let newRecipeData = req.body;
    //create title, ingredients, steps, comments of a recipe
    
    if (!newRecipeData) {
        res.status(400).json({ error: "You must provide data to create a recipe" });
        return;
    }

    if (!newRecipeData.title) {
        res.status(400).json({ error: "You must provide a title for recipe" });
        return;
    }

    if (!newRecipeData.ingredients) {
        res.status(400).json({ error: "You must provide ingredients for recipe" });
        return;
    }

    if (!newRecipeData.steps) {
        res.status(400).json({ error: "You must provide steps for recipe" });
        return;
    }

    if (!newRecipeData.comments) {
        res.status(400).json({ error: "You must provide a comment for recipe, you can init as []" });
        return;
    }

    recipeData.addRecipe(newRecipeData.title, newRecipeData.ingredients, newRecipeData.steps, newRecipeData.comments)
        .then((newRecipe) => {
            res.json(newRecipe);
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
});

///recipes/:id  PUT
router.put("/:id", (req, res) => {
    let updatedRecipeData = req.body;
    ////update title, ingredients, steps, comments of a recipe
    
    if (!updatedRecipeData) {
        res.status(400).json({ error: "You must provide data to update a recipe" });
        return;
    }

    let getRecipe = recipeData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipeData.updateRecipe(req.params.id, updatedRecipeData)
            .then((updateRecipe) => {
                res.json(updateRecipe);
            }).catch((error) => {
                res.status(500).json({ error: error });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

///recipes/:id  DELETE
router.delete("/:id", (req, res) => {
    let getRecipe = recipeData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipeData.removeRecipeById(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                res.status(500).json({ error: error });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;