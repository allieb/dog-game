 window.setInterval(update, 100);

 function update() {
 	var canvas = document.getElementById('tutorial');
 	var ctx = canvas.getContext('2d');
 	ctx.drawImage(img, x, y, 35, 25);
 }
 var x = 0;
 var y = 0;
 speedx = 5;
 speedy = 5;
 var img = new Image();
img.src = "dog-head-md.png";