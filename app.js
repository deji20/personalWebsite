const express = require("express");
const app = express();
require("dotenv").config({path: process.env.ENVIRONMENT + ".env"});
const path = require("path");
const noted = require("./authentication/accessToken")


app.use("/auth", noted);
//home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

//setting static files
app.use("/", express.static(path.join(__dirname, "public/pages/index")));
app.use("/global", express.static(path.join(__dirname, "public/globalRes")));
app.use("/error", express.static(path.join(__dirname, "public/pages/error")));

//routes projects
app.use("/projects", express.static(path.join(__dirname, "projects")))

//sets catch-all missing resource error page
app.use((req,res,next) => {
	res.status(404).sendFile(path.join(__dirname, "views/error.html"));
});


app.listen(process.env.PORT, () => {
    console.log("application started on port: " + process.env.PORT);
});