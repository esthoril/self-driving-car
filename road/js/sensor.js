class Sensor {
  constructor(car){
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 100;
    this.raySpread = Math.PI/2;

    this.rays = [];
    this.readings = []; // Sensor reading
  }

  update(roadBorders, traffic){
    this.#castRays();
    this.readings = [];
    this.rays.forEach(ray => this.readings.push(this.#getReading(ray, roadBorders, traffic)));
  }

  // Find all intersections and keep closest to the car
  #getReading(ray, roadBorders, traffic){
    let touches = [];

    // Road collision
    for(let i=0; i<roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0], ray[1], // line 1
        roadBorders[i][0], roadBorders[i][1]); // line  2
      if(touch)
        touches.push(touch)
    }
    
    // Traffic collision
    for(let i=0; i<traffic.length; i++) {
      const poly=traffic[i].polygon;
      for(let j=0; j<poly.length; j++){
        const value = getIntersection(
          ray[0], ray[1],
          poly[j], poly[(j+1)%poly.length]
        );
        if(value)
          touches.push(value);
      }
    }

    // No intersection for this ray
    if(touches.length==0)
      return null;

    // Find closes touch
    const offsets = touches.map(e=>e.offset);
    const minOffset = Math.min(...offsets);
    return touches.find(e=>e.offset==minOffset);
  }

  #castRays(){
    this.rays = [];
    for(let i=0; i<this.rayCount; i++) {
      const rayAngle = lerp(this.raySpread/2, -this.raySpread/2, this.rayCount==1?0.5:i/(this.rayCount-1)) + car.angle;
      const start = {
        x:this.car.x,
        y:this.car.y};
      const end = {
        x:this.car.x - Math.sin(rayAngle)*this.rayLength,
        y:this.car.y - Math.cos(rayAngle)*this.rayLength};
      this.rays.push([start, end]);
    }
  }

  draw(ctx){
    const drawLine = (ctx, A, B, color, width) => {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
    }

    for(let i=0; i<this.rayCount; i++) {
      let end = this.rays[i][1];
      if(this.readings[i])
        end = this.readings[i];

      drawLine(ctx, this.rays[i][0], end, "yellow", 2);
      drawLine(ctx, end, this.rays[i][1], "black", 1);
    }
  }
}
