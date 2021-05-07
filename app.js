const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
//setting a base directory for all routers to reference  
global.__basedir = __dirname; 

//importing routers
const projects = require("./routes/projectsRouter");
const contacts = require("./routes/contactsRouter");

//reading template html files
const template = require("./templates/templates").standard;
const homeHtml = fs.readFileSync(path.join(__dirname, "views/index.html")).toString()
const errorHtml = fs.readFileSync(path.join(__dirname, "views/error.html")).toString()

app.use(express.json());

//home
app.get("/", (req, res) => {
    res.send(template(homeHtml));
});

//adding routers
app.use("/projects", projects);
app.use("/contacts", contacts);

//setting static files
app.use("/", express.static(path.join(__dirname, "public/")));

//sets catch-all missing resource error page
app.get("/*", (req,res,next) => {
	res.status(404).send(template(errorHtml));
});

app.listen(process.env.PORT, () => {
    console.log("application started on port: " + process.env.PORT);
});