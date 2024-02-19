## Self-driving car in Javascript

Inspiration YouTube

**[Radu course](https://www.youtube.com/playlist?list=PLB0Tybl0UNfYoJE7ZwsBQoDIG4YN9ptyY)**

* [Self-driving car - No libraries](https://www.youtube.com/watch?v=NkI9ia2cLhc&list=PLB0Tybl0UNfYoJE7ZwsBQoDIG4YN9ptyY)
  - [(3) Ray casting](https://www.youtube.com/watch?v=2AKMSO2Gocs)
  - [(4) Collision detection](https://www.youtube.com/watch?v=M8kq2eJRIp0)
  - [(5) Add traffic](https://www.youtube.com/watch?v=M8kq2eJRIp0)
  - [(7) Visualization neural network](https://www.youtube.com/watch?v=lok3RVBwSqE)
* [Self Driving Car Neural Network (Python and NEAT)](https://www.youtube.com/watch?v=cFjYinc465M)
* [Python Pong AI NEAT](https://www.youtube.com/watch?v=2f6TmKm7yx0)
* [Car learns to RACE using A.I.](https://www.youtube.com/watch?v=DlD7TZb2jSM)
* [Self-driving AI car Simulation in Python](https://www.youtube.com/watch?v=Cy155O5R1Oo)

## Pipeline

## Changelog

* `2024-02-15` Add traffic
* `2024-02-13` Collision detection
* `2024-02-12` Polygon inner and outer track; Raycasting


## Optizing code

```javascript
for(let i=0; i<traffic.length; i++){
  traffic[i].update(road.borders);
}
```
```javascript
traffic.forEach(vehicle => vehicle.update(road.borders));
```

---

```javascript
for(let i=0; i<roadBorders.length; i++){
  if(polyIntersect(this.polygon, roadBorders[i])) {
  return true;
  }
}
```
```javascript
if (roadBorders.some(border => polyIntersect(this.polygon, border)))
  return true;
```

---

```javascript
#assesDamage(roadBorders, traffic){
  if(roadBorders.some(border => polyIntersect(this.polygon, border)))
  return true;

  if(traffic.some(car => polyIntersect(this.polygon, car.polygon)))
  return true;

  return false;
}
```
```javascript
#assesDamage(roadBorders, traffic){
  return roadBorders.some(border => polyIntersect(this.polygon, border)) ||
  traffic.some(car => polyIntersect(this.polygon, car.polygon));
}
```