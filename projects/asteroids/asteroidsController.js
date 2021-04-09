const express = require("express");
const router = express.Router();
const fs = require("fs")
const template = require("../../templates/templates")

const bodyHtml = fs.readFileSync(`${__dirname}/public/game.html`).toString();

router.use("/", express.static(`${__dirname}/public/`))

router.get("/", (req, res) => {
    res.send(template.standard(bodyHtml))
});

module.exports = router;