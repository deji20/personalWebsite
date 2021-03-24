var a = 0;

$(document).ready(function(){
    slide(10,50, $(".mainGroup")[0]);
    $(".navMark")[0].style.opacity = "1";

    $(".navMark").click(function(){
        var nav = $("#nav").children();
        for(var i = 0; i < nav.length; i++){
            if(nav[i] === this){
                change(i - a);
            }
        }
    });
    $("body").bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta < 0) {
            change(1);
        }else {
            change(-1);
        }
    });
});


function change(show){
    var group = $(".mainGroup");

    if(show != 0) {
        if (a + show < group.length && a + show >= 0) {
            //sets slide direction based on list order
            if (show < 0) {
                startIn = -20;
                endOut = 130;
            } else {
                startIn = 130;
                endOut = -20;
            }

            //slides out old element
            $(".navMark")[a].style.opacity = "0.4";
            slide(50, endOut, group[a]);
            a += show;
            //slides in new element
            $(".navMark")[a].style.opacity = "1";
            slide(startIn, 50, group[a]);
        }
    }
}

function slide(start, end, object){
    var pos = start;
    var fade = 1;
    object.style.top = pos+"%";

    //determines the rate at which the object fades
    var fadeRatio;
    if(start < end){fadeRatio = 1/(end - start);}
        else{fadeRatio = 1/(start - end);}

    //determine if the object is on it's way in or out
    var out = object.style.display === "block";

    //sets the proper opacity and display for an object coming in
    if(!out){
        fade = 0;
        object.style.opacity = fade;
        object.style.display = "block";
    }

    var slide = setInterval(function(){
        object.style.top = pos+"%";
        object.style.opacity = fade;

        if(out){fade -= fadeRatio;}
            else{fade += fadeRatio;}

        if(pos === end){
            if(out){object.style.display = "none";}
            clearInterval(slide);
        }
            else if(start < end) {pos++;}
            else{pos--;}
    }, 10)
}