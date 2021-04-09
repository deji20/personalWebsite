const Engine=Matter.Engine,
Render=Matter.Render,
Runner=Matter.Runner,
Events=Matter.Events,
Composite=Matter.Composite;

const area = 1500;

let player;
let engine;
let render;

$(document).ready(startUp);

function startUp(){
    setup()
    setControls();
    let score = scoreboard();
    render.canvas.height=$(window).height();
    render.canvas.width=$(window).width();
    render.options.height=$(window).height();
    render.options.width=$(window).width();

    Events.on(engine, "collisionStart", (colided) => {
        bodyA = colided.pairs[0].bodyA;
        bodyB = colided.pairs[0].bodyB;
        if(bodyA.label === "player" || bodyB.label === "player"){
            Render.stop(render)
            clearInterval(score);
        }
    })
}
function setup(){
    engine = Engine.create();
    engine.world.gravity.y=0;

    render = Render.create({
        element:document.body,
        engine:engine,
        options:{
            width:$(window).height(),
            height:$(window).width(),
            wireframes:false
        }
    });
    $(window).on("resize", () => {
        render.canvas.height=$(window).height();
        render.canvas.width=$(window).width();
        render.options.height=$(window).height();
        render.options.width=$(window).width();
    })

    player=new Character(400, 400, 3);
    const arena = new Arena(area, 100);

    Composite.add(engine.world, [player.body, arena.createWalls()]);

    Render.run(render);
    Engine.run(engine);

    setInterval(arena.spawnAsteroid, 500)
    gameloop();
}

function gameloop(){
    function update(){
        Engine.update(engine);
        Render.lookAt(render, player.body, {x:500, y:500})
        checkKeys();
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function scoreboard(){
    let modifier = 1;
    let score = 0;
    time = 0;
    return setInterval(() => {
        score += 1 * modifier;
        $("#scoreboard").text(score)
        if(time%60 === 0){
            modifier++;
        }
    }, 1000)
}

let keys=[];
function setControls(){
    $(document).on("keydown", (event) => {
        if(event.key === "e"){
            player.shoot()
        }
        keys[event.key]=true;
    })
    $(document).on("keyup", (event) => {
        keys[event.key]=false;
    })
}
function checkKeys(){
    let speed = 0.1
    if(keys["w"]) player.move(speed);
    if(keys["d"]) player.rotate(speed);
    if(keys["a"]) player.rotate(-speed);
    if(keys["s"]) player.move(-speed);
}