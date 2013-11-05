var canvas = document.getElementById('game');

var dog = {
    position: { x: 0, y: 0 },
    heading: { x: 5, y: 5 },
    speed: 5,
    image: new Image ()
};

var player = { position: { x: 0, y: 0 } };
var game = {paused: false};

function logPosition (name, thing) {
    console.log (name + ' position: ' + thing.position.x + ', ' + thing.position.y);
}

function below (a, b) {
    return a.position.y > b.position.y;
}

function rightOf (a, b) {
    return a.position.x > b.position.x;
}

function samePlace (a, b) {
    return a.position.x == b.position.x
        && a.position.y == b.position.y;
}

function chase (chaser, chasee) {
    if (samePlace (chaser, chasee)) {
        chaser.heading = { x: 0, y: 0 };
        chaser.speed = 0;
        return;
    }

    // TODO: Calculate speed based on how close the dog is to the player or a treat
    chaser.speed = 5;
    chaser.heading.x = chaser.speed * (rightOf (chaser, chasee)? 1 : -1);
    chaser.heading.y = chaser.speed * (below (chaser, chasee)? 1 : -1);
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

function drawScene () {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dog.image, dog.position.x, dog.position.y);
}

function update() {
    if (game.paused)
        return;

    chase (dog, player);
    move (dog);
    keepOnStage (dog);
    drawScene ();

    window.requestAnimationFrame (update);
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
    logPosition ('player', player);
    logPosition ('dog', dog);
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
