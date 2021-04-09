const fs = require("fs");

const template = {}
module.exports = template;

const header = fs.readFileSync(`${__dirname}/standard/header.html`).toString();
const footer = fs.readFileSync(`${__dirname}/standard/footer.html`).toString();
template.standard = function(body){
    return header + body + footer;
}