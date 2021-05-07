const router = require("express").Router();
const fs = require("fs");
const template = require(`${__basedir}/templates/templates`).standard;
const mail = require(`${__basedir}/services/mailingService`)

const contactsHtml = fs.readFileSync(`${__basedir}/views/contacts.html`).toString();

router.get("/", (req, res) => {
    res.send(template(contactsHtml));
});

router.post("/message", (req, res) => {
    let body = req.body;
    mail(body.emailAddress, body.subject, body.message);
    res.send("well..")
})

module.exports = router;