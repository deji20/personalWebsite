const express = require("express");
const router = express.Router();

const notebookRepository = require("../../repositories/notebookRepository");


router.get("/", async (req, res) => {
    let notebooks = await notebookRepository.getAll();
    res.send(notebooks);
})

router.get("/:id", async (req, res) => {
    let notebook = await notebookRepository.getById(req.params.id)
    res.send(notebook);
})

router.get("/:id/sections", async (req, res) => {
    let sections = await notebookRepository.getSections(req.params.id)
    console.log(req.params.id);
    res.send(sections);
})

module.exports = router;