let streamPlayer;
let videoApi = new VideoApi(); 

$(document).ready(async () => {
    streamPlayer = new StreamPlayer("#videoPlayer");
    $("#videoPlayer").on("click", (e) => {
        player = e.currentTarget;
        $(player).removeAttr("muted")
        player.volume = 0.6;
    })
});

//create and animate thumbnails
function addThumbnails(elements){
    let referenceElement = $("#vidRef");
    let scrollElem = elements.map((element) => {
        let thumbnail = $(`<div class="thumbnail cursor-pointer inline-block p-2" value="${element.id}"> <img class="transition-all inline rounded-md shadow-2xl duration-1000 h-44", src="data:image/png;base64,${toBase64(element.thumbnail)}"/> </div>`);
        thumbnail.on("click", (e) => {
            socket.emit("nextVid", ($(e.currentTarget).attr("value")));
        });
        return thumbnail;
    });
    referenceElement.before(scrollElem);
}

//manipulates the chosen thumbnail bringing focus on it 
let scrollWithFocus = true;
function toggleFocusThumbnail(index){
    let images = $(".thumbnail").children("img")
    //sets focus on the appropriate image wrapping around to the start like the videos, if their are no more images
    let focusImage = images[index % images.length]; 
    scrollWithFocus && focusImage.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
    images.removeClass("h-48")
    $(focusImage).addClass("h-48")
}

function toBase64(arr) {
    arr = new Uint8Array(arr);
    return btoa( arr.reduce((data, byte) => data + String.fromCharCode(byte), '') );
}

//jquery function that shakes any jquery object using css transform
$.fn.shake = function (speed) {
    this.each((index, element) => {
        if(!$(element).hasClass("shake")){
            $(element).addClass(`shake transition duration-${speed} transform`);
            let dir = true;
            let rotate;
            setInterval(() => {
                $(element).removeClass(rotate)
                rotate = dir ? "rotate-6" : "-rotate-6";
                $(element).addClass(rotate)
                dir = !dir;
            }, speed)
        }else{
            $(element).removeClass(`shake transition duration-${speed} transform`);
        }
    });
};

let socket = io("/toosec");

socket.on("getBatch", (images) => addThumbnails(images));

$(document).ready(() => {
    streamPlayer.addEventListener("ready", () => {
        socket.emit("nextVid")
        //requests new video when buffer is nearing end
        streamPlayer.addEventListener("runningout", () => socket.emit("nextVid"));
        
        let queue = 0;
        socket.on("video", (data) => {
            streamPlayer.addVideo(data);
            toggleFocusThumbnail(queue++);
        });
    });
})
