const express = require("express");
const router = express.Router();
const sectionRepository = require("../repositories/sectionRepository");
const authorization = require("../authentication/accessToken");
const noteController = require("./noteController");

router.use((req, res, next) => {
    try{
        sectionRepository.accessToken = authorization.getToken();
        next();
    }catch(err){
        console.log(err);
        res.redirect("/noted/auth")
    }
})

router.get("/", async (req, res) => {
    let notebookId = res.locals.notebookId;
    let sections = await sectionRepository.getAllByNotebook(notebookId)
    res.send(sections)
})

router.get("/:id", async (req, res) => {
    let section = await sectionRepository.getById(req.params.id)
    res.send(section);
})

router.use("/:id/note", (req, res, next) => {
    res.locals.sectionId = req.params.id;
    next();
});
router.use("/:id/note", noteController)

module.exports = router;