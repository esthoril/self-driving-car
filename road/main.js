const carCanvas=document.getElementById("carCanvas");
const networkCanvas=document.getElementById("networkCanvas");
carCanvas.width = 200;
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);

const N = 1000;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
  console.log("Loading best car")
  for(let i=0; i<cars.length; i++){
    const item = localStorage.getItem("bestBrain");
    cars[i].brain = JSON.parse(item);
    if(i!=0){
      NeuralNetwork.mutate(cars[i].brain, 0.2);
    }
  }
}


traffic = defaultTraffic();

animate();

function save(){
  console.log("Saving best car");
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
  localStorage.removeItem("bestBrain");
}

function generateCars(N){
  const cars = [];
  for(let i=1; i<=N; i++){
    cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
  }
  return cars;
}

function clear(){
  carCanvas.height=window.innerHeight;
  networkCanvas.height=window.innerHeight;  
}

function update(){
  traffic.forEach(car => car.update(road.borders, []));
  cars.forEach(car => car.update(road.borders, traffic));
}

function drawRoad(){
  carCtx.save();
  carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

  // Draw everything
  road.draw(carCtx);
  traffic.forEach(car => car.draw(carCtx, "red"));
  carCtx.globalAlpha=0.2;
  cars.forEach(car => car.draw(carCtx, "blue"));
  carCtx.globalAlpha=1;
  bestCar.draw(carCtx,"purple",true);

  carCtx.restore();
}

function animate(time){
  clear();
  update();
  bestCar = cars.find(c => c.y==Math.min(...cars.map(c=>c.y)));

  drawRoad();

  // Draw network
  networkCtx.lineDashOffset =- time/50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  Visualizer.drawBest(networkCtx, bestCar);

  //const offset = 300-bestCar.y;
  //if(offset > row*200){
    //addTraffic(traffic, road, row*200);
  //  row++;
  //}

  requestAnimationFrame(animate);
}
