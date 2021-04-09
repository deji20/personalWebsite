const express = require("express");
const router = express.Router();
const noteRepository = require("../repositories/noteRepository");
const authorization = require("../authentication/accessToken");

router.use((req, res, next) => {
    try{
        noteRepository.accessToken = authorization.getToken();
        next();
    }catch(err){
        console.log(err);
        res.redirect("/noted/auth")
    }
})

router.get("/", async (req, res) => {
    let sectionId = res.locals.sectionId;
    let notes = await noteRepository.getAllBySection(sectionId);
    res.send(notes);
})

router.get("/:id", async (req, res) => {
    let note = await noteRepository.getById(req.params.id);
    res.send(note);
})

module.exports = router;