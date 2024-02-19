class Car{
  constructor(x, y, width, height, type, maxSpeed=3){
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;

  this.speed=0;
  this.acceleration=0.4;
  this.maxSpeed=maxSpeed;
  this.friction=0.05;
  this.angle=0;
  this.turningRadius = 0.03; // 0.06 Normal 0.04 Big 0.08 Small/sharp

  this.polygon = this.#createPolygon();
  this.damaged = false;
  
  this.useBrain = type=="AI";
  
  if(type != "DUMMY"){
    this.sensor = new Sensor(this);
    this.brain = new NeuralNetwork(
    [this.sensor.rayCount, 6, 4] // 4 possible outputs (forward, backword, left, right)
    );
    console.table(this.brain.levels[0].inputs);
  }
  this.controls=new Controls(type);  
  }

  update(roadBorders, traffic){
  if(!this.damaged){
    this.#move();
    this.polygon = this.#createPolygon();
    this.damaged = this.#assesDamage(roadBorders, traffic);
  }
  if(this.sensor){
    this.sensor.update(roadBorders, traffic);
    const offsets = this.sensor.readings.map(s => s==null ? 0 : 1-s.offset);
    const outputs = NeuralNetwork.feedForward(offsets, this.brain);

    if(this.useBrain){
    this.controls.forward = outputs[0];
    this.controls.left = outputs[1];
    this.controls.right = outputs[2];
    this.controls.reverse = outputs[3];
    }
  }
  }

  #assesDamage(roadBorders, traffic){
  return roadBorders.some(border => polyIntersect(this.polygon, border)) ||
    traffic.some(car => polyIntersect(this.polygon, car.polygon));
  }

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
  if(this.controls.forward){this.speed+=this.acceleration;}
  if(this.controls.reverse){this.speed-=this.acceleration;}

  // Cap speed
  if(this.speed>this.maxSpeed){this.speed=this.maxSpeed;}
  if(this.speed<-this.maxSpeed/2){this.speed=-this.maxSpeed/2;}

  // Accelerate / Slow down
  if(this.speed>0){this.speed-=this.friction;}
  if(this.speed<0){this.speed+=this.friction;}
  if(Math.abs(this.speed)<this.friction){this.speed=0;}

  if(this.speed!=0){
    const flip=this.speed>0?1:-1;
    if(this.controls.left){this.angle+=this.turningRadius*flip;}
    if(this.controls.right){this.angle-=this.turningRadius*flip;}
  }

  this.x-=Math.sin(this.angle)*this.speed;
  this.y-=Math.cos(this.angle)*this.speed;
  }

  draw(ctx, color){
  //this.#drawSprite(ctx);
  this.#drawPolygon(ctx, color);

  if(this.sensor)
    this.sensor.draw(ctx);
  }
  
  #drawPolygon(ctx, color){
  ctx.fillStyle = this.damaged ? "gray" : color;
  ctx.beginPath();
  ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
  this.polygon.slice(1).forEach(point => ctx.lineTo(point.x, point.y));
  ctx.fill();
  }
}