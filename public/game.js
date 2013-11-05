var canvas = document.getElementById('game');
var x = 0;
var y = 0;
var speedx = 5;
var speedy = 5;
var img = new Image();
var paused = false;
var mousex = canvas.width / 2;
var mousey = canvas.height / 2;

function startGame () {
    img.src = "dog-head-md.png";
}

function below (a, b) { return a > b; }
function rightOf (a, b) { return a > b; }

function adjustDogSpeedToChaseMouse () {
    speedx = rightOf (x, mousex)? -5 : 5;
    speedy = below (x, mousex)? -5 : 5;
}

function moveDog () {
    x = x + speedx;
    y = y + speedy;
}

function keepDogOnScreen () {
    if (x>canvas.width-35) {
        speedx=-5;
        x=canvas.width-35
    } else if (x<0) {
        speedx=5;
        x=0;
    }

    if (y>canvas.height-25){
        speedy=-5;
        y=canvas.height-25;
    } else if (y<0){
        speedy=5;
        y=0;
    }
}

function drawScene () {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, 270/8, 298/8);
}

function update() {
    if (paused)
        return;

    adjustDogSpeedToChaseMouse ();
    moveDog ();
    keepDogOnScreen ();
    drawScene ();
}

function togglePause() {
    paused = !paused;
}

function onKeyDown (event) {
    switch (event.keyCode)
    {
    case 32:
        togglePause ();
    }
}

// copied from: http://stackoverflow.com/a/5932203/12934
HTMLCanvasElement.prototype.relMouseCoords = function (event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    } while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}

function onMouseMove(event) {
    var mousePosition = canvas.relMouseCoords (event);
    mousex = mousePosition.x;
    mousey = mousePosition.y;
}

function onResize (){
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.setAttribute ('width', w);
    canvas.setAttribute ('height', h);
}

// TODO: use requestAnimationFrame instead of hard-coded 100ms to make this look less choppy
//       see: https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
window.setInterval(update, 100);

document.addEventListener ('keydown', onKeyDown);
document.addEventListener ('mousemove', onMouseMove);
document.addEventListener ('resize', onResize);

onResize ();
startGame ();
