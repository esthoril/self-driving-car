class Sprite {
  constructor(w, h, ratio, img){
    this.w = w;
    this.h = h;
    this.ratio = ratio;
    this.img = document.getElementById(img);
  }

  draw(ctx){
    const w = this.w/this.ratio;
    const h = this.h/this.ratio;
    ctx.drawImage(
      this.img,
      0, 0, this.w, this.h, // Crop image sprite
      -w/2, -h/2, w, h // Place image in canvas
    );
  }
}

class Car {
  constructor(x,y,width,height){
    this.x = x; // Center x of the car
    this.y = y; // Center y of the car
    this.width = width;
    this.height = height;
    this.sprite = new Sprite(80, 156, 3, "car");

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 7;//3
    this.friction = 0.05;
    this.angle = -Math.PI/2;//0;

    this.sensor = new Sensor(this);
    
    this.controls = new Controls();
  }

  update(roadBorders){
    this.#move();
    this.sensor.update(roadBorders);

  }

  #move(){
    if(this.controls.forward){this.speed+=this.acceleration;}
    if(this.controls.reverse){this.speed-=this.acceleration;}

    if(this.speed>this.maxSpeed){this.speed=this.maxSpeed;}
    if(this.speed<-this.maxSpeed/2){this.speed=-this.maxSpeed/2;}

    if(this.speed>0){this.speed-=this.friction}
    if(this.speed<0){this.speed+=this.friction}

    if(Math.abs(this.speed)<this.friction){this.speed=0;}

    const radius=0.06;//0.03;
    if(this.speed!=0){
      const flip=this.speed>0?1:-1;
      if(this.controls.left){this.angle+=radius*flip;}
      if(this.controls.right){this.angle-=radius*flip;}
    }

    this.x-=Math.sin(this.angle)*this.speed;
    this.y-=Math.cos(this.angle)*this.speed;
  }

  draw(ctx){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(-this.angle);

    //this.#drawImg(ctx);
    this.sprite.draw(ctx);
    //this.#drawRect(ctx);

    ctx.restore();
    
    this.sensor.draw(ctx);
  }

  #drawRect(ctx){
    ctx.beginPath();
    ctx.rect(
      -this.width/2,
      -this.height/2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}