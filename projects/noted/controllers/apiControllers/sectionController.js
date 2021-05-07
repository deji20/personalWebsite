const express = require("express");
const router = express.Router();
const sectionRepository = require("../../repositories/sectionRepository");

router.get("/:id", async (req, res) => {
    let section = await sectionRepository.getById(req.params.id)
    res.send(section);
})

router.get("/:id/notes", async (req, res) => {
    let sections = await sectionRepository.getNotes(req.params.id)
    res.send(sections)
})

module.exports = router;