const express = require("express");
const router = express.Router();
const notebookRepository = require("../repositories/notebookRepository");
const authorization = require("../authentication/accessToken");
const sectionController = require("./sectionController");

router.use((req, res, next) => {
    try{
        notebookRepository.accessToken = authorization.getToken();
        next();
    }catch(err){
        console.log(err);
        res.redirect("/noted/auth")
    }
})

router.get("/", async (req, res) => {
    let notebooks = await notebookRepository.getAll();
    console.log(notebooks)
    res.render(__dirname + "/../pages/notebooks.pug",{books:notebooks});
})

router.get("/:id", async (req, res) => {
    let notebook = await notebookRepository.getById(req.params.id)
    res.render(__dirname + "/../pages/sections.pug", {notebook: notebook});
})

router.use("/:id/section", (req, res, next) => {
    res.locals.notebookId = req.params.id;
    next();
});
router.use("/:id/section", sectionController)

module.exports = router;