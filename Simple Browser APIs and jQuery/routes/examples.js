const express = require('express');
const router = express.Router();

router.get("/browserform", (req, res) => {
    res.render("examples/browserform", {
        partial: "browserform-scripts"
    });
});

module.exports = router;