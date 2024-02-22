function generateTraffic(traffic, road, offset){
  const rnd = Math.random();
  const trafficRow = rnd < 0.6 ? [1,1,0] : [1,0,0]; // 1 or 2 cars
  
  for(let i=trafficRow.length-1; i>0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [trafficRow[i], trafficRow[j]] = [trafficRow[j], trafficRow[i]];
  }
  for(let i=0; i<trafficRow.length; i++){
    if(trafficRow[i]==true){
      const car = new Car(road.getLaneCenter(i), -offset, 30,50,"DUMMY",0);
      traffic.push(car);
    }
  }
}


function defaultTraffic(){
  return [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),

    new Car(road.getLaneCenter(0),-900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-1100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-1100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-1700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-1900,30,50,"DUMMY",2),
  ];
}