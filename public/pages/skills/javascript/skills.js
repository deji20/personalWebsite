$(document).ready(() => {
    let skills = $(".skill");
    colors = ["#37AEFF", "#00589D", "#FFDD56","#F5DE19"]
    skills.each((index, skill) => renderSkill($(skill), colors[index]));
})
function renderSkill(skill, color){
    const canvas =  skill.children(".canvas")[0];
    const ctx = canvas.getContext("2d");
    const proficiency = skill.children(".proficiency").val();

    let h = canvas.height = skill.height();
    let w = canvas.width = skill.width();

    let getAngle = (factor) => (Math.PI * 2 / 100 ) * factor; 
    let endPosition = getAngle(proficiency);

    let index = 0;

    ctx.fillStyle = color;

    function fillSkill(){
        let position = getAngle(index);
        
        ctx.moveTo(w/2, h/2);
        ctx.arc(w/2, h/2, h/2, 0 + Math.PI*1.5, position + Math.PI*1.5);
        ctx.fill();
        index++;
        if(position < endPosition){
            requestAnimationFrame(fillSkill);
        }else{
            resizer = $("#canResize");
            $(window).on("resize", () => {
                let h = canvas.height = resizer.height();
                let w = canvas.width = resizer.width()/2;
                
                ctx.moveTo(w/2, h/2);
                ctx.arc(w/2, h/2, h/2, 0 + Math.PI*1.5, endPosition + Math.PI*1.5);
                ctx.fill();
            })
        }
    }
    requestAnimationFrame(fillSkill);
}