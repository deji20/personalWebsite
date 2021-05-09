const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require("fs")

const authorization = require("../authentication/accessToken");
const onenoteApi = require("../repositories/onenoteApi")

//setting the header and footer templates for this project
const template = require(`${__basedir}/templates/templates`).standard
const bodyHtml = fs.readFileSync(`${__basedir}/views/notedHome.html`).toString();

//testing sync
const sync = require("../repositories/notebookSync");
router.use("/sync", async (req, res) => {
    try{
        let data = await sync();
        console.log(data);
    }catch(err){
        console.log(err);
    }
    res.send("hello")
})

//verifying authorization token for accessing onenote api
router.use("/auth", authorization)
router.use(async (req, res, next) => {
    try{
        token = await authorization.getToken();
        onenoteApi.accessToken = token;
        next();
    }catch(err){
        res.redirect("/projects/noted/auth")
    }
})

//importing api controllers
const notebook = require("./apiControllers/notebookController")
const section = require("./apiControllers/sectionController")
const note = require("./apiControllers/noteController");

//sends home page
router.get("/", (req, res) => res.send(template(bodyHtml)))

//setting apiControllers
router.use("/notebook", notebook);
router.use("/section", section);
router.use("/note", note);


//setting static files
router.use("/", express.static(path.join(__dirname, "../public")))


module.exports = router;