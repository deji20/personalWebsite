const router = require("express").Router();
const fs = require("fs");
const template = require(`${__basedir}/templates/templates`).standard; 

const recommendtionsHtml = fs.readFileSync(`${__basedir}/views/recommendations.html`).toString();

let recommendations = [];

router.get("/", (req, res) => {
    res.send(template(recommendtionsHtml));
})

router.post("/create", (req, res) => {
    console.log(req.body);
    recommendations.push(req.body);
    res.status(200).send("ok");
})

router.get("/get", (req, res) => {
    res.send({"recommendations": recommendations})
})

module.exports = router;