const express = require("express");
const router = express.Router();

//loading template
const fs = require("fs");
const template = require(`${__basedir}/templates/templates`);
const mainHtml = fs.readFileSync(`${__basedir}/views/tooSecond.html`).toString();
const adminHtml = fs.readFileSync(`${__dirname}/admin/tooSecSidebar.html`).toString();

//importing rest apis
const videoApi = require(`${__dirname}/rest/videoRestApi.js`);
router.use("/api/videos", videoApi);

//serve mainpage
router.get("/", (req, res) => {
    res.send(template.tooSecAdmin(mainHtml + adminHtml));
})

router.use("/", express.static(`${__dirname}/public`));
module.exports = router;