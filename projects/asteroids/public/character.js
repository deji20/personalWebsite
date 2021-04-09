const Body=Matter.Body,
Bodies=Matter.Bodies;

class Character{
    constructor(startX, startY, ammo)
    {
        this.ammo = ammo;
        this.body = Body.create({
            label:"player",
            density:1,
            restitution:0.8,
            parts:[
                Bodies.polygon(startX,startY,3,50,{label:"player"}),
                Bodies.polygon(startX,startY,5,25,{label:"player"}),
                Bodies.rectangle(startX-35,startY,45,10,{label:"player"})
            ],
            
        });
    }

    move = (speed) => {
        let angle = this.getAngleVector();
        angle.x = -speed * (angle.x * 0.02);
        angle.y = -speed * (angle.y * 0.02);
        Body.applyForce(this.body, this.body.position, angle)
    }
    
    rotate = (speed) =>{
        Body.setAngularVelocity(this.body, speed/5);
    }

    shoot = () => {
        if(this.ammo){
            let angle = this.getAngleVector();
            angle.x *= 20;
            angle.y *= 20;
            let shot = Bodies.circle(this.body.position.x-angle.x*5, this.body.position.y-angle.y*5, 10, {
                label:"bullet",
                density:1.5, 
            },5);

            angle.x = -angle.x;
            angle.y = -angle.y;

            Body.applyForce(shot, shot.position, angle)
            Composite.add(engine.world, shot);
            this.ammo--;
            setTimeout(() => {
                Composite.remove(engine.world, shot);
                this.ammo++;
            }, 20000)
        }
    }

    getAngleVector(){
        return {
            x:Math.cos(this.body.angle), 
            y:Math.sin(this.body.angle),
        }
    }
}