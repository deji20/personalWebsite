const express = require("express");
const router = express.Router();
const fs = require("fs")
const template = require(__basedir + "/templates/templates").standard

const bodyHtml = fs.readFileSync(`${__basedir}/views/asteroids.html`).toString();

router.use("/", express.static(`${__dirname}/public/`))

router.get("/", (req, res) => {
    res.send(template(bodyHtml))
});

module.exports = router;