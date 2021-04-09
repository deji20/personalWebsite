class Arena{
    asteroidList = new Array();

    constructor(area, asteroidLimit){
        this.area = area;
        this.asteroidLimit = asteroidLimit
    }
    createWalls = () => {
        return Body.create({
            isStatic:true,
            collisionFilter:{
                group:-2,
                mask:1,
            },
            parts:[
                Bodies.rectangle(this.area/2,0,50, this.area,{isStatic:true, restitution:0.8, render:{fillStyle:"#007ACC"}, collisionFilter: {
                    group:-2,
                    mask:1,
                }}),
                Bodies.rectangle(0,-this.area/2,this.area,50,{isStatic:true, restitution:0.8, render:{fillStyle:"#007ACC"},collisionFilter: {
                    group:-2,
                    mask:1,
                }}),
                Bodies.rectangle(0,this.area/2,this.area,50,{isStatic:true, restitution:0.8, render:{fillStyle:"#007ACC"},collisionFilter: {
                    group:-2,
                    mask:1,
                }}),
                Bodies.rectangle(-this.area/2,0,50,this.area,{isStatic:true, restitution:0.8, render:{fillStyle:"#007ACC"},collisionFilter: {
                    group:-2,
                    mask:1,
                }}),
            ]
        })
    }

    spawnAsteroid = () => {
        let angle = Math.random() * 360
        let spawnPoint = {
            x:Math.cos(angle) * this.area, 
            y:Math.sin(angle) * this.area,
        }
        
        //get movement direction and vector
        let direction = {}
        let baseSpeed = 1.5;
        let maxSpeed = 4
        if(spawnPoint.x < 0) direction.x = baseSpeed+(Math.random()*maxSpeed); 
        else direction.x = -baseSpeed-(Math.random()* maxSpeed);
        
        if(spawnPoint.y < 0) direction.y = baseSpeed+Math.random()*maxSpeed; 
        else direction.y = -baseSpeed-(Math.random()*maxSpeed);

        let shape = 3 + Math.floor(Math.random()*10)
        let asteroid = Body.create({
            label:"asteroid",
            collisionFilter: {
                group:-2,
                mask:1,
            },
            parts:[
                Bodies.polygon(spawnPoint.x,spawnPoint.y, 5,100,{
                    density:0.01,
                    lable:"asteroid",
                    collisionFilter: {
                        group:-2,
                        mask:1,
                    }
                }),
                Bodies.polygon(spawnPoint.x,spawnPoint.y, shape,100,{
                    density:0.01,
                    lable:"asteroid",
                    collisionFilter: {
                        group:-2,
                        mask:1,
                    }
                }),
            ]
        });
        asteroid.frictionAir = 0;
        Composite.add(engine.world, asteroid);
        function update(){
            asteroid.force = direction;
            requestAnimationFrame(update);
        }
        this.asteroidList.push(asteroid);
        if(this.asteroidLimit < this.asteroidList.size){
            Composite.remove(engine.world, this.asteroidList.shift());
        }
        requestAnimationFrame(update)
    }
}