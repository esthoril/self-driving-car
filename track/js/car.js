class Sprite {
  constructor(ratio, img){
  this.ratio = ratio;
  this.img = document.getElementById(img);
  this.w = this.img.width;
  this.h = this.img.height;
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
  constructor(x, y){
  this.x = x; // Center x of the car
  this.y = y; // Center y of the car
  this.sprite = new Sprite(2, "car");
  
  this.width = this.sprite.w/this.sprite.ratio;
  this.height = this.sprite.h/this.sprite.ratio;

  this.speed = 0;
  this.acceleration = 0.2;
  this.maxSpeed = 7;//3
  this.friction = 0.05;
  this.angle = -Math.PI/2; // -90deg = facing right
  this.turningRadius = 0.06; // 0.06 Normal 0.04 Big 0.08 Small/sharp

  this.sensor = new Sensor(this);
  this.controls = new Controls();
  }

  update(roadBorders){
  if(!this.damaged){
    this.#move();
    this.polygon = this.#createPolygon();
    this.damaged = this.#assesDamage(roadBorders);
  }
  this.sensor.update(roadBorders);
  }

  #assesDamage(roadBorders){
  for(let i=0; i<roadBorders.length; i++){
    if(polyIntersect(this.polygon, roadBorders[i])) {
    return true;
    }
  }
  return false;
  }

  // Bounding box of the car
  #createPolygon(){
  const points = [];
  const rad = Math.hypot(this.width, this.height)/2;
  const alpha = Math.atan2(this.width, this.height);
  
  points.push({
    x:this.x-Math.sin(this.angle-alpha)*rad,
    y:this.y-Math.cos(this.angle-alpha)*rad
  });
  points.push({
    x:this.x-Math.sin(this.angle+alpha)*rad,
    y:this.y-Math.cos(this.angle+alpha)*rad
  });
  points.push({
    x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
    y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
  });
  points.push({
    x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
    y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
  });
  return points;
  }

  #move(){
  if(this.controls.forward){this.speed += this.acceleration;}
  if(this.controls.reverse){this.speed -= this.acceleration;}

  if(this.speed>this.maxSpeed){this.speed = this.maxSpeed;}
  if(this.speed<-this.maxSpeed/2){this.speed =- this.maxSpeed/2;}

  if(this.speed>0){this.speed -= this.friction}
  if(this.speed<0){this.speed += this.friction}

  if(Math.abs(this.speed) < this.friction){this.speed=0;}

  if(this.speed != 0){
    const flip = this.speed>0?1:-1; // Take direction into account
    if(this.controls.left){this.angle += this.turningRadius*flip;}
    if(this.controls.right){this.angle -= this.turningRadius*flip;}
  }

  this.x -= Math.sin(this.angle)*this.speed;
  this.y -= Math.cos(this.angle)*this.speed;
  }

  draw(ctx){
  //this.#drawSprite(ctx);
  this.#drawPolygon(ctx);

  this.sensor.draw(ctx);
  }

  #drawSprite(ctx){
  ctx.save();
  ctx.translate(this.x,this.y);
  ctx.rotate(-this.angle);
  this.sprite.draw(ctx);
  //this.#drawRect(ctx);
  ctx.restore();
  }
  
  #drawPolygon(ctx){
  ctx.fillStyle = this.damaged ? "gray" : "black";
  ctx.beginPath();
  ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
  this.polygon.slice(1).forEach(point => ctx.lineTo(point.x, point.y));
  ctx.fill();
  }

  #drawRect(ctx){
  const width = this.sprite.w/this.sprite.ratio;
  const height = this.sprite.h/this.sprite.ratio;
  ctx.beginPath();
  ctx.rect(-width/2, -height/2, width, height);
  ctx.fill();
  }
}
