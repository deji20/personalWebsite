const router = require("express").Router();
const fs = require("fs");
const template = require(`${__basedir}/templates/templates`).standard;

const skillsHtml = fs.readFileSync(`${__basedir}/views/skills.html`).toString();

router.get("/", (req, res) => {
    res.send(template(skillsHtml))
})

module.exports = router;