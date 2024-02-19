const outerTrack = [
 [989, 23], [1088, 24], [1193, 32], [1281, 35], [1373, 44], [1458, 59],
 [1495, 74], [1500, 103], [1483, 144], [1454, 189], [1415, 234], [1375, 282],
 [1328, 335], [1301, 388], [1319, 440], [1357, 486], [1441, 589], [1475, 671],
 [1486, 754], [1459, 820], [1394, 853], [1290, 873], [1172, 879], [1041, 876],
 [907, 866], [729, 858], [559, 840], [451, 813], [414, 783], [404, 720], [420, 667],
 [466, 599], [551, 529], [654, 466], [754, 411], [824, 365], [838, 332], [803, 319],
 [725, 357], [640, 407], [550, 457], [470, 496], [427, 492], [400, 460], [357, 327],
 [347, 224], [351, 133], [370, 74], [383, 58], [492, 39], [566, 30], [660, 27],
 [773, 19], [875, 19], [979, 21], [989, 23]
]
const innerTrack = [
  [994, 153], [1072, 157], [1134, 160], [1222, 168], [1270, 184], [1273, 204],
  [1232, 237], [1182, 274], [1126, 325], [1102, 365], [1100, 419], [1125, 467],
  [1191, 531], [1247, 596], [1275, 650], [1269, 701], [1186, 727], [1060, 735],
  [963, 738], [860, 729], [774, 715], [685, 685], [679, 651], [709, 611],
  [784, 562], [880, 506], [959, 453], [1018, 395], [1047, 323], [1026, 266],
  [988, 225], [918, 192], [834, 188], [749, 206], [662, 235], [584, 266], [519, 288],
  [502, 253], [508, 197], [534, 177], [592, 168], [695, 158], [762, 159], [904, 155],
  [979, 152], [994, 153]
]

const offset = 329;

class Track {
  constructor(){
  this.roadBorders = this.#setBorders();
  }

  #setBorders(){
  const createBorder = (track, offset) => {
    const border = [];

    for(let i=0; i<track.length-1; i++) {
    const [x1, y1] = [track[i][0] - offset, track[i][1]];
    const [x2, y2] = [track[i + 1][0] - offset, track[i + 1][1]];
    border.push([{ x: x1, y: y1 }, { x: x2, y: y2 }]);
    }
    return border;
  };

  const outerBorder = createBorder(outerTrack, offset);
  const innerBorder = createBorder(innerTrack, offset);

  return outerBorder.concat(innerBorder);
  }

  draw(ctx) {
  ctx.beginPath();
  ctx.lineWidth=6;
  ctx.strokeStyle="#0525FF";

  this.#drawTrack(ctx, outerTrack);
  this.#drawTrack(ctx, innerTrack);

  ctx.stroke();
  }

  #drawTrack(ctx, arr){
  ctx.moveTo(arr[0][0]-offset, arr[0][1]);
  arr.slice(1).forEach(point => ctx.lineTo(point[0] - offset, point[1]));
  }
}
