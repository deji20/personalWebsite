const router = require("express").Router();
const fs = require("fs");
const template = require(`${__basedir}/templates/templates`).standard; 

const educationHtml = fs.readFileSync(`${__basedir}/views/education.html`).toString();

router.get("/", (req, res) => {
    res.send(template(educationHtml));
})

module.exports = router;