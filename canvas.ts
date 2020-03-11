const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const parseX = (x: number) => canvas.width - x;

let middleX = canvas.width / 2;
let middleY = canvas.height / 2;

function removeBorders() {
  canvas.style.margin = canvas.style.padding = document.body.style.margin = document.body.style.padding =
    "0";
}

function winAdapt() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  middleX = canvas.width / 2;
  middleY = canvas.height / 2;
}

function addAdaptListener() {
  window.onresize = winAdapt;
}

function rect(
  x: number,
  y: number,
  width: number,
  height: number,
  fill: boolean = false
): void {
  // Draw a rectangle on the screen
  x = parseX(x);
  if (fill) ctx.fillRect(x, y, width, height);
  else ctx.strokeRect(x, y, width, height);
}

function strokeColor(style: string) {
  ctx.strokeStyle = style;
}

function fillColor(style: string) {
  ctx.fillStyle = style;
}

function circle(x: number, y: number, radius: number, fill: boolean = true) {
  x = parseX(x);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) ctx.fill();
  else ctx.stroke();
  ctx.closePath();
}

function line(x: number, y: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

let LastTime: number = 0
function subLoop(func: (...args: any[]) => any, dTime) {
  let delay = dTime - LastTime
  LastTime = dTime
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  func(delay)
  requestAnimationFrame(dTime => {
    subLoop(func, dTime);
  });
}

function loop(func: (...args: any[]) => any): void {
  LastTime = 0
  requestAnimationFrame((dTime) => {subLoop(func, dTime)})
}

function initializeCanvas() {
  removeBorders();
  winAdapt();
  addAdaptListener();
}
