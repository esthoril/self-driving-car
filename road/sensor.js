class Sensor{
  constructor(car){
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI/2;

    this.rays = [];
    this.readings = [];
  }

  update(roadBorders,traffic){
    this.#castRays();
    this.readings = [];
    for(let i=0; i<this.rays.length; i++){
      const reading = this.#getReading(this.rays[i], roadBorders, traffic);
      this.readings.push(reading)
    }
  }

  #getReading(ray,roadBorders,traffic){
    let touches = [];

    for(let i=0; i<roadBorders.length; i++){
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if(touch)
        touches.push(touch);
    }

    for(let i=0; i<traffic.length; i++){
      const poly = traffic[i].polygon;
      for(let j=0; j<poly.length; j++){
        const value = getIntersection(
          ray[0],
          ray[1],
          poly[j],
          poly[(j+1)%poly.length]
        );
        if(value)
          touches.push(value);
      }
    }

    if(touches.length==0){
      return null;
    }else{
      const offsets=touches.map(e=>e.offset);
      const minOffset=Math.min(...offsets);
      return touches.find(e=>e.offset==minOffset);
    }
  }

  #castRays(){
    this.rays=[];
    for(let i=0; i<this.rayCount; i++){
      const t = this.rayCount==1 ? 0.5 : i/(this.rayCount-1);
      const spread = this.raySpread/2;
      const rayAngle = lerp(spread, -spread, t) + this.car.angle;

      const start = {
        x:this.car.x,
        y:this.car.y};
      const end = {
        x:this.car.x - Math.sin(rayAngle)*this.rayLength,
        y:this.car.y - Math.cos(rayAngle)*this.rayLength};
      this.rays.push([start,end]);
    }
  }

  draw(ctx){
    for(let i=0; i<this.rayCount; i++){
      let end = this.rays[i][1];
      if(this.readings[i])
        end = this.readings[i];

      Sensor.#drawLine(ctx, this.rays[i][0], end, "yellow");
      Sensor.#drawLine(ctx, end, this.rays[i][1], "black");
    }
  }
  
  static #drawLine(ctx, p1, p2, color){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}