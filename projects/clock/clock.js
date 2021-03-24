let ctx;

window.addEventListener("load", function(){
    const c = document.getElementById("clock");
    ctx = c.getContext("2d");
    requestAnimationFrame(draw);
});

function draw(){
    requestAnimationFrame(draw);
    let height = ctx.canvas.clientHeight;
    let width = ctx.canvas.clientWidth;
    ctx.clearRect(0,0, width, height);
    
    drawClock(50, {x: width/2, y: height/2});
}

function drawClock(rad, pos){
    let date = new Date(Date.now());
    //rim 
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.arc(pos.x, pos.y, rad, 0, Math.PI*2);
    ctx.stroke();

    //size unit
    let su = rad / 100;

    //century
    clockArm("cyan", pos, rad, rad - su, 1000, date.getFullYear() % 1000)
    //year
    clockArm("lightred", pos, rad,  rad - su*2, 365, getDayOfYear(date))
    //month
    clockArm("darkred", pos, rad,  rad - su*3, days(date.getMonth(), date.getFullYear()), date.getDate());
    //day

    //hour
    clockArm("red", pos, rad, su * 40, 12, date.getHours() % 12);
    //minute
    clockArm("blue", pos, rad, su * 30, 60, date.getMinutes());
    //second
    clockArm("green", pos, rad, su * 20, 60, date.getSeconds());
    //millisecound
    clockArm("purple", pos, rad, su * 10, 1000, date.getMilliseconds());
}

function clockArm(color, pos, rad, length, total, time){
    ctx.beginPath();
    ctx.strokeStyle = color;

    let position = (Math.PI*2 / total) * time;
    ctx.arc(pos.x, pos.y, rad - length, 0 + Math.PI*1.5, position + Math.PI*1.5);
    
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke();
}

function getDayOfYear(now){
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}
function days(month,year) {
    return new Date(year, month, 0).getDate();
 };