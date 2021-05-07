const express = require("express");
const router = express.Router();
const noteRepository = require("../../repositories/noteRepository");


router.get("/:id", async (req, res) => {
    let note = await noteRepository.getById(req.params.id);
    res.send(note += `<link rel="stylesheet" type="text/css" href="/noted/styling/note.css"/>`);
})

module.exports = router;