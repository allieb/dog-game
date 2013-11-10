var canvas = document.getElementById('game');
var statusDiv = document.getElementById('status');

var dog = {
    position: { x: 0, y: 0 },
    heading: { x: 5, y: 5 },
    speed: 0,
    scale: {x: 0.1, y: 0.1},
    image: new Image ()
};

var player = { position: { x: 0, y: 0 } };

var game = {
    paused: false,
    difficulty: 1
};

function logPosition (name, thing) {
    console.log (name + ' position: ' + thing.position.x + ', ' + thing.position.y);
}

function below (a, b) {
    return a.position.y > b.position.y;
}

function rightOf (a, b) {
    return a.position.x > b.position.x;
}

function samePlace (dist) {
    return dist <= 1.0;
}
function buzzing (){
}

function onEdge (chaser){
	if (chaser.position.x == 0){
		return true;
	}
	if (chaser.position.x == (canvas.width-chaser.image.width)){
		return true;	 	 	
	}
	return false
}

function stopOn (a, b) {
    a.position.x = b.position.x;
    a.position.y = b.position.y;
    a.heading = { x: 0, y: 0 };
    a.speed = 0;
}

function distance (a, b) {
    return Math.sqrt (Math.pow (a.position.x - b.position.x, 2)
                      + Math.pow (a.position.y - b.position.y, 2));
}

function chase (chaser, chasee) {
    var d = distance (chaser, chasee);
    if (samePlace (d))
        // TODO: do something when the dog catches the player
        return stopOn (chaser, chasee);
		
		if (onEdge(chaser))
		buzzing();

    chaser.speed = game.difficulty * (d / 9.0);
    chaser.heading.x = chaser.speed * (rightOf (chaser, chasee)? -1 : 1);
    chaser.heading.y = chaser.speed * (below (chaser, chasee)? -1 : 1);
}

function move (thing) {
    thing.position.x += thing.heading.x;
    thing.position.y += thing.heading.y;
}

function offStageRight (thing) {
    return thing.position.x > canvas.width - thing.image.width;
}

function moveToStageRightEdge (thing) {
    thing.position.x = canvas.width - thing.image.width;
}

function offStageLeft (thing) {
    return thing.position.x < 0;
}

function moveToStageLeftEdge (thing) {
    thing.position.x = 0;
}

function offStageBottom (thing) {
    return thing.position.y > canvas.height - thing.image.height;
}

function moveToStageBottomEdge (thing) {
    thing.position.y = canvas.height - thing.image.height;
}

function offStageTop (thing) {
    return thing.position.y < 0;
}

function moveToStageTopEdge (thing) {
    thing.position.y = 0;
}

function keepOnStage (thing) {
    if (offStageRight (thing))
        moveToStageRightEdge (thing);
    else if (offStageLeft (thing))
        moveToStageLeftEdge (thing);

    if (offStageBottom (thing))
        moveToStageBottomEdge (thing);
    else if (offStageTop (thing))
        moveToStageTopEdge (thing);
}

function updateStatus () {
    statusDiv.textContent = dog.position.x.toString () + "," + dog.position.y + "@" + dog.speed;
}

function drawScene () {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save ();
    ctx.translate (dog.position.x, dog.position.y);
    ctx.drawImage(dog.image, 0, 0);
    ctx.restore ();
}

function update() {
	window.requestAnimationFrame (update);
    if (game.paused)
        return;
    chase (dog, player);
    move (dog);
    keepOnStage (dog);
    drawScene ();
}

function togglePause() {
    game.paused = !game.paused;

    var pauseScreen = document.getElementById ('pause-screen');
    pauseScreen.style.display = game.paused? 'block' : 'none';
}

function onKeyDown (event) {
    switch (event.keyCode)
    {
    case 32:
        togglePause ();
    }
}

function onMouseMove(event) {
    player.position.x = event.clientX;
    player.position.y = event.clientY;
}

function resizeCanvas (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startGame () {
    resizeCanvas ();
    dog.image.src = "dog-head-md.png";
    window.requestAnimationFrame (update);
}

document.addEventListener ('keydown', onKeyDown);
document.addEventListener ('mousemove', onMouseMove);
document.addEventListener ('resize', resizeCanvas);

startGame ();
