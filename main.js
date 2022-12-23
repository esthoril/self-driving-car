const canvas = document.getElementById("myCanvas");
canvas.width=window.innerWidth;//200;

canvas.width=1200;
canvas.height=900;
var background = new Image();
background.src = "img/track3.png";

const ctx = canvas.getContext("2d");
const car = new Car(590,80,30,50);

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
  ctx.drawImage(background,0,0);
}

// animate();
window.requestAnimationFrame(animate);

function animate(){
  //canvas.height = window.innerHeight; // Hack to clear the canvas
  ctx.drawImage(background,0,0);
  car.update();
  car.draw(ctx);
  window.requestAnimationFrame(animate);
}