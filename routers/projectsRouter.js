const router = require("express").Router()
const fs = require("fs")


const noted = require(`${__basedir}/projects/noted/controllers/notedController`);
const asteroids = require(`${__basedir}/projects/asteroids/asteroidsRouter`);
const tooSecond = require(`${__basedir}/projects/tooSecond/tooSecondRouter`);

//setting the header and footer templates for this project
const template = require(`${__basedir}/templates/templates`).standard;
const bodyHtml = fs.readFileSync(`${__basedir}/views/projects.html`).toString();

//routing for projects
router.use("/noted", noted);
router.use("/tooSec", tooSecond);
router.use("/asteroids", asteroids);

router.get("/", (req, res) => {
    res.send(template(bodyHtml))
})

module.exports =  router;