const express = require("express");
const router = express.Router();
const path = require('path');

const authorization = require("../authentication/accessToken");
const notebookController = require("./notebookController")

router.use("/auth", authorization)

router.get("/", (req, res) => res.redirect("notebook"))

router.use("/notebook", notebookController);
router.use("/", express.static(path.join(__dirname, "../public")))


module.exports = router;