const express = require("express");
const app = express();
require("dotenv").config({path: process.env.ENVIRONMENT + ".env"});
const path = require("path");

const noted = require("./projects/noted/controllers/notedController");
const asteroids = require("./projects/asteroids/asteroidsController");

//sets the templating engine to pug so we wont have to render them in each class
app.set("view engine", "pug");

//routing for projects
app.use("/noted", noted);
app.use("/asteroids", asteroids);
//home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});


//setting static files
app.use("/", express.static(path.join(__dirname, "public/")));

//sets catch-all missing resource error page
app.use((req,res,next) => {
	res.status(404).sendFile(path.join(__dirname, "views/error.html"));
});

app.listen(process.env.PORT, () => {
    console.log("application started on port: " + process.env.PORT);
});