const canvas = document.getElementById("myCanvas");
canvas.width=window.innerWidth;//200;

let x = 0, y = 0;

canvas.width = 1200;
canvas.height = 900;
var background = new Image();
background.src = "img/track3.png";

const ctx = canvas.getContext("2d");
const track = new Track();
const car = new Car(590, 80);

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = () => {
  ctx.drawImage(background,0,0);
}

// animate();
window.requestAnimationFrame(animate);

function animate(){
  //canvas.height = window.innerHeight; // Hack to clear the canvas
  ctx.drawImage(background,0,0);
  track.draw(ctx);
  car.update(track.roadBorders);
  car.draw(ctx);
  window.requestAnimationFrame(animate);
}

const append = () => {
  //var xPos = document.getElementById("myCanvas").offsetLeft;
  //console.log(xPos);
  debug.innerHTML += `[${x}, ${y}],<br/>`;
}

const tellPos = (p) => {
  x = p.pageX;
  y = p.pageY;
}
var debug = document.getElementById('debug');
addEventListener('mousemove', tellPos, false);
