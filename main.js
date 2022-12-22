const canvas = document.getElementById("myCanvas");
canvas.width=window.innerWidth;//200;

const ctx = canvas.getContext("2d");
const car = new Car(100,100,30,50);
car.draw(ctx);

// animate();
window.requestAnimationFrame(animate);

function animate(){
  canvas.height = window.innerHeight; // Hack to clear the canvas
  car.update();
  car.draw(ctx);
  window.requestAnimationFrame(animate);
}