const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const parseY = (y: number) => canvas.height - y;
const calculateY = (y: number, height: number) => y - height;

const calcParseY = (y: number, height: number) => calculateY(parseY(y), height);

let middleX = canvas.width / 2;
let middleY = canvas.height / 2;

interface KeyStyle {
  forward: String;
  backward: String;
  left: String;
  right: String;
  space: String;
}

interface KeyFuncStyle {
  forward: (event: KeyboardEvent) => any;
  backward: (event: KeyboardEvent) => any;
  left: (event: KeyboardEvent) => any;
  right: (event: KeyboardEvent) => any;
  space: (event: KeyboardEvent) => any;
}

const keyboardControlStyles: { wasd: KeyStyle; arrow: KeyStyle } = {
  wasd: { forward: "w", left: "a", backward: "s", right: "d", space: " " },
  arrow: {
    forward: "ArrowUp",
    left: "ArrowLeft",
    backward: "ArrowDown",
    right: "ArrowRight",
    space: " "
  }
};



function keyPressed(keyStyle: KeyStyle, functions: KeyFuncStyle) {
  addEventListener('keydown', event => {
    switch (event.key) {
      case keyStyle.forward:
        functions.forward(event);
        break;
      case keyStyle.backward:
        functions.backward(event);
        break;
      case keyStyle.left:
        functions.left(event);
        break;
      case keyStyle.right:
        functions.right(event);
        break;
      case keyStyle.space:
        functions.space(event);
        break;
    }
  })
}

function keyReleased(keyStyle: KeyStyle, functions: KeyFuncStyle) {
  addEventListener("keyup", event => {
    switch (event.key) {
      case keyStyle.forward:
        functions.forward(event);
        break;
      case keyStyle.backward:
        functions.backward(event);
        break;
      case keyStyle.left:
        functions.left(event);
        break;
      case keyStyle.right:
        functions.right(event);
        break;
      case keyStyle.space:
        functions.space(event);
        break;
    }
  });
}


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

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function rect(
  x: number,
  y: number,
  width: number,
  height: number,
  fill: boolean = true
): void {
  // Draw a rectangle on the screen
  y = calcParseY(y, height);
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
  y = parseY(y);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) ctx.fill();
  else ctx.stroke();
  ctx.closePath();
}

function line(x: number, y: number, x2: number, y2: number) {
  y = parseY(y);
  y2 = parseY(y2);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

let LastTime: number = 0;
function subLoop(func: (...args: any[]) => any, dTime: number) {
  let delay = dTime - LastTime;
  LastTime = dTime;
  clear();
  func(delay);
  requestAnimationFrame(dTime => {
    subLoop(func, dTime);
  });
}

function loop(func: (...args: any[]) => any): void {
  LastTime = 0;
  requestAnimationFrame(dTime => {
    subLoop(func, dTime);
  });
}

function initializeCanvas() {
  removeBorders();
  winAdapt();
  addAdaptListener();
}
