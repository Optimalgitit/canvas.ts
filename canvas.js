const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const parseY = (y) => canvas.height - y;
const calculateY = (y, height) => y - height;
const calcParseY = (y, height) => calculateY(parseY(y), height);
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
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function rect(x, y, width, height, fill = true) {
    // Draw a rectangle on the screen
    y = calcParseY(y, height);
    if (fill)
        ctx.fillRect(x, y, width, height);
    else
        ctx.strokeRect(x, y, width, height);
}
function strokeColor(style) {
    ctx.strokeStyle = style;
}
function fillColor(style) {
    ctx.fillStyle = style;
}
function circle(x, y, radius, fill = true) {
    y = parseY(y);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (fill)
        ctx.fill();
    else
        ctx.stroke();
    ctx.closePath();
}
function line(x, y, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
let LastTime = 0;
function subLoop(func, dTime) {
    let delay = dTime - LastTime;
    LastTime = dTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    func(delay);
    requestAnimationFrame(dTime => {
        subLoop(func, dTime);
    });
}
function loop(func) {
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
