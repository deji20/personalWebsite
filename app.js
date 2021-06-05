const express = require("express");
const app = express();
const httpServer = require("http").createServer(app)
const io = require("./socket")(httpServer);

const path = require("path");
const fs = require("fs");
const database = require("./database/mongoDatabase")
const template = require("./templates/templates").standard;

//getting application configurations
const appConfig = require("./appsettings.json");
//setting a base directory for all routers to reference  
global.__basedir = __dirname; 

app.use(express.json({limit: "50mb"}));

//setting up database
database.initConnection(appConfig.Database.ConnectionString).then(() => {
    
    //importing routers 
    const projectsRouter = require("./routers/projectsRouter");
    const contactsRouter = require("./routers/contactsRouter");
    const skillsRouter = require("./routers/skillsRouter");
    const recommendationsRouter = require("./routers/recommendationsRouter");
    const educationRouter = require("./routers/educationRouter");
    //adding routers to project
    app.use("/projects", projectsRouter);
    app.use("/contact", contactsRouter);
    app.use("/skills", skillsRouter);
    app.use("/recommendations", recommendationsRouter);
    app.use("/education", educationRouter);

    //reading template html files
    const homeHtml = fs.readFileSync(path.join(__dirname, "views/index.html")).toString()
    const errorHtml = fs.readFileSync(path.join(__dirname, "views/error.html")).toString()

    //home
    app.get("/", (req, res) => {
        res.send(template(homeHtml));
    });

    //setting static files
    app.use("/", express.static(path.join(__dirname, "public/")));

    //sets catch-all missing resource error page
    app.get("/*", (req,res,next) => {
        res.status(404).send(template(errorHtml));
    });

});
httpServer.listen(process.env.PORT, () => {
    console.log("application started on port: " + process.env.PORT);
});