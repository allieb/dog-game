 
 function update() {
 	var canvas = document.getElementById('tutorial');
 	var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if (!paused) {
		x = x + speedx;
		if (x>canvas.width-35) {
			speedx=-5;
			x=canvas.width-35
		}
	
		if (x<0) {
			speedx=5;
			x=0;
		}
	}
	
 	ctx.drawImage(img, x, y, 35, 25);
}
 
var x = 0;
var y = 0;
var speedx = 5;
var speedy = 5;
var img = new Image();
var paused = false;

img.src = "dog-head-md.png";

function togglePause() {
	if (event.keyCode == 32) {
		paused = !paused;
	}
}

window.setInterval(update, 100);
document.onkeypress = togglePause;