const router = require("express").Router()
const fs = require("fs")

const noted = require("../projects/noted/controllers/notedController");
const asteroids = require("../projects/asteroids/asteroidsRouter");

//setting the header and footer templates for this project
const template = require(`${__basedir}/templates/templates`).standard;
const bodyHtml = fs.readFileSync(`${__basedir}/views/projects.html`).toString();

//routing for projects
router.use("/noted", noted);
router.use("/asteroids", asteroids);

router.get("/", (req, res) => {
    res.send(template(bodyHtml))
})

module.exports = router;