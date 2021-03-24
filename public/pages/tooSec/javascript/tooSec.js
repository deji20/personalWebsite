var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


var isDown = false;
var lastPlayed = 0;
var startDate = moment(firstDate);

$(document).ready(function () {
    initiatePlayer();
    initiateRow();
    initiateSlider();
    getVidsByDate(startDate);
});
function initiateRow(){
    $("#row").mousewheel(function(event, delta){
        this.scrollLeft -= (delta * 10);
        event.preventDefault();
    });
    $("#row").on("click", ".photoElem", function(){

        play(this);
    });
}
function initiatePlayer(){
    $("#arrowWrap").click(function(){extendHeight();});
    $("#player").addTogglePlay();
}
function initiateSlider(){
    var date = $("#dateInfo");
    var slider = $("#myRange");
    slider[0].max = range;
    slider.on("input change", function(){
            var searchDate = startDate.clone();
            searchDate.add(slider[0].value, 'd');
            getVidsByDate(searchDate);
        date[0].style.left = (this.value - 50) + "%";
    });
}


function getVidsByDate(date){
    $("#month").text(months[date.month()]);
    $("#year").text(date.year());
    $("#day").text(date.date());
    $("#row").empty();
    console.log(date);

    var formatedDate = date.toISOString().split("T")[0];

    $.getJSON("/2Seconds/videos?date="+formatedDate, function(data){
        for(var i = 0; i < data.length; i++){
            var column = document.createElement("div");
            var date = document.createElement("p");
            column.className = "column";

            $(column).append(createPhotoElement(data[i]));

            $(date).text(data[i].date);
            $(column).append(date);

            $("#row").append(column);
        }});

}
function createPhotoElement(element){
    var photo = document.createElement("img");
    photo.className="photoElem";
    photo.src = element.poster;
    $(photo).data("vidSource", element.path);
    return photo;
}

function play(playing){
    var photos = $(".photoElem");
    var cols = $(".column");
    var placeNr = $(photos).index(playing);
    var source = $("#source");
    var video = $("#player");

    $(photos[lastPlayed]).animate({height:'85%'}, 150);
    $(photos[placeNr]).animate({height:'90%'}, 150);
    lastPlayed = $(photos).index(playing);

    video[0].onended = function(){
        if(photos.length - 3 < placeNr){getVidsByDate(5);}
        $("#row").animateScrollLeft(cols[placeNr]);
        $(photos[placeNr + 1]).click();
    };

    source[0].src =  $(playing).data("vidSource");
    video[0].load();
}
function extendHeight(){
    var heightNr = '70%';
    var degrees = 180;
    var vidWrap = $("#vidWrap");
    if(isDown){
        vidWrap.removeAttr("style");
        degrees = 0;
        heightNr = '3em';
    }else{vidWrap.css("height", "100%");}

    $("#arrowWrap").stop().animate({rotation: degrees},
        {
            duration: 500,
            step: function(now, fx) {$(this).css({"transform": "rotate("+now+"deg)"});}
        }
    );
    $("#wrapper").stop().animate({height:heightNr}, 500);
    isDown = !isDown;
}

jQuery.fn.animateScrollLeft = function(scrollToElement){
    if($(scrollToElement).visible()){
        var end = (scrollToElement.offsetLeft + scrollToElement.offsetWidth) - this[0].offsetWidth/2;
        this.animate({scrollLeft: end}, 300);
    }
};
jQuery.fn.visible = function(){
    var parent = this.parent()[0];
    var element = this[0];
    return element.offsetLeft > parent.scrollLeft && element.offsetLeft < parent.scrollLeft + parent.offsetWidth;
};
jQuery.fn.addTogglePlay = function(){
    this.click(function(){
        if(this[0].paused){
            this[0].play();
        }else{this[0].pause();}
    });
};