const express = require("express");
const router = express.Router();
const upload = require("multer")();

const videoHandler = require("../util/videoManipulator");
const videoModel = require("../models/videoModel");
const videoRepo = require("../repositories/videoRepository");
const { getBatch } = require("../repositories/videoRepository");

const FRAGMENT_SIZE = 2000;

router.get("/:id", async (req, res) => {
    res.send({videos:await videoRepo.getById(req.params.id)});
});

router.get("/", async (req, res) => {
    if(req.query.amount){
        res.send({videos: await videoRepo.getBatch(req.query.amount, req.query.offset)});
    } 
    res.send({videos: await videoRepo.getAll({})})
});

router.post("/date", upload.single("video"), async (req, res) => {
    try{
        let date = await videoHandler.getDate(req.file.buffer);
        console.log(date);
        res.status(200).send(date.toString());
    }catch(exception){
        res.status(400).send(exception);
    }
})


router.post("/", upload.single("data"), async (req, res) => {
    try{
        let videoData = await videoHandler.transcoder(req.file.buffer, FRAGMENT_SIZE);
        let duration  = await videoHandler.getDuration(req.file.buffer);
        let thumbnail = await videoHandler.getThumbnail(req.file.buffer);
        let date = req.body.date;

        videoRepo.create(new videoModel(date, duration, videoData, thumbnail));
        res.status(200).send();
    }catch(exception){
        console.log(exception);
        res.status(400).send(exception);
    }
})

router.get("/:id/stream", (req, res) => {
    videoRepo.getStream(req.params.id);
    res.status(200).send();
})

router.patch("/:id", (req, res) => {
    videoRepo.update()
});

router.delete("/:id", async (req, res) => {
    await videoRepo.delete(req.params.id);
    res.status(200).send();
});

const io = require(`${__basedir}/socket`)();
const tooSec = io.of("/toosec");
tooSec.on("connection", async (socket) => {
    let amount = 1;
    let offset = -amount;
    socket.on("nextVid", async (videoIndex) => {
        offset = videoIndex ?? (offset += amount);
        console.log(offset);
        let videos;
    
        !videos && (videos = await videoRepo.getBatch(amount, offset));
        if(!videos.length){
            offset = 0;
            videos = await videoRepo.getBatch(amount, offset);
        }

        let vid;
        videos.length && (vid = videos.shift());
        vid && socket.emit("video", {video: vid.videoData.buffer, id: vid._id.toHexString(), duration: vid.duration});
    })
    async function getBatch(){
        socket.emit("getBatch", (await videoRepo.getBatch(10, 0)).map((vid) => {
            return {thumbnail: vid.thumbnail.buffer, id: vid._id.toHexString()}; 
        }));   
    }
    getBatch();
})

module.exports = router;