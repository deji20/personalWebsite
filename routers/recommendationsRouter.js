const router = require("express").Router();
const fs = require("fs");
const template = require(`${__basedir}/templates/templates`).standard; 

const recommendtionsHtml = fs.readFileSync(`${__basedir}/views/recommendations.html`).toString();

router.get("/", (req, res) => {
    res.send(template(recommendtionsHtml));
})

module.exports = router;