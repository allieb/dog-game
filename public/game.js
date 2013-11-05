var canvas = document.getElementById('tutorial');
var x = 0;
var y = 0;
var speedx = 5;
var speedy = 5;
var img = new Image();
var paused = false;
var mousex=canvas.width/2;
var mousey=canvas.height/2;

function init (){
    img.src = "dog-head-md.png";
}

function moveDog (){
    x = x + speedx;
    y = y + speedy;
}

function update() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (paused)
        return;

    moveDog ();
    
    if (x>canvas.width-35) {
        speedx=-5;
        x=canvas.width-35
    }

    else if (x<0) {
        speedx=5;
        x=0;
    }
    else if (x<mousex){
        speedx=5;
    }
    else if (x>mousex){
        speedx=-5;
    }
    
    if (y>canvas.height-25){
        speedy=-5;
        y=canvas.height-25;
    }
    else if (y<0){
        speedy=5;
        y=0;
    }
    else if (y<mousey){
        speedy=5;
    }
    else if (y>mousey){
        speedy=-5;
    }

    ctx.drawImage(img, x, y, 35, 25);
}

function togglePause() {
    if (event.keyCode == 32) {
        paused = !paused;
    }
}

function mouseMoved(){
    console.log (event.clientX);
}

// TODO: use requestAnimationFrame instead of hard-coded 100ms to make this look less choppy
//       see: https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
window.setInterval(update, 100);

document.onkeypress = togglePause;
window.onmousemove = mouseMoved;










