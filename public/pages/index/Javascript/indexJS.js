let a = 0;

$(document).ready(function(){
    const basePath = "/global/images/backgrounds";
    slideShow($("#slideshow"), [`${basePath}/1.jpg`, `${basePath}/2.jpg`, `${basePath}/3.jpg`, `${basePath}/4.jpg`,`${basePath}/5.jpg`]);

    setInterval(() => {
        change(1);
    }, 5000);

    getRecommendation();
});

async function getRecommendation(){
    let recs = await fetchRecommendations();
    if(recs.recommendations && recs.recommendations.length){
        $("#recommendationExample").empty().append(createRecommendationElement(recs.recommendations[0]));
    }
}

function slideShow(element, pictures){
    let index = 0;
    element.attr('src',`${pictures[index]}`)

    setInterval(() => {
        element.attr('src',`${pictures[index]}`)
        index++;
        if(index === pictures.length){
            index = 0;
        }
    }, 10000);
}

const sections = [
    {name:"Projects", link:"/projects"}, 
    {name:"Skills", link:"/skills"}, 
    {name:"Contact", link:"/contact"},
    {name:"Recommendations", link:"/recommmendations"}
]
function change(show){
    var group = $(".mainGroup");
    group.css("opacity", "0");

    a += show;
    a = a % group.length;
    
    $("#sectionName").text(sections[a].name).attr("href", sections[a].link);
    element = $(group[a]) 
    element[0].scrollIntoView({behavior: "smooth", block: "end"});
    element.css("opacity", "100");

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
    var out = object.style.display === "flex";

    //sets the proper opacity and display for an object coming in
    if(!out){
        fade = 0;
        object.style.opacity = fade;
        object.style.display = "flex";
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