let player = {
  x: 200,
  y: 300,
  vx: 0,
  vy: 0,
};

let blocks;

let gamestate;

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);

  resetGame();
}

function draw() {
  updateGame();
  drawGame();
}

function resetGame() {

  gamestate = "play";
  player = createPlayer();
  blocks = [];
}

function updateGame() {

  if (gamestate == "gameover") return;

  if (frameCount % 120 == 1) {
    addBlockPair(blocks);
  }
  blocks = blocks.filter(blockIsAlive);
  updatePosition(player);
  for (let block of blocks) updatePosition(block);

  applyGravity(player);

  if (!playerIsAlive(player)) gamestate = "gameover";

  for (let block of blocks) {
    if (entitiesAreColliding(player, block, 20 + 40, 20 + 200)) {
      gamestate = "gameover";
      break;
    }
  }
}

function drawGame() {
  background("#edf7fa");
  drawPlayer(player);
  for (let block of blocks) drawBlock(block);

  if (gamestate == "gameover") drawGameoverScreen();
}

function onMousePress() {
  switch (gamestate) {
    case "play":
      applyJump(player);
      break;
    case "gameover":
      resetGame();
      break;
  }
}

function mousePressed() {
  onMousePress();
}

function createBlock(y) {
  return {
    x: 900,
    y,
    vx: -2,
    vy: 0,
  }
}

function drawBlock(entity) {
  noStroke();
  fill("#5f6caf");
  rect(entity.x, entity.y, 80, 400, 8);
}

function blockIsAlive(entity) {
  return -100 < entity.x;
}

function updatePosition(entity) {
  entity.x += entity.vx;
  entity.y += entity.vy;
}

function addBlockPair() {
  let y = random(-100, 100);
  blocks.push(createBlock(y));
  blocks.push(createBlock(y + 600));
}

function createPlayer() {
  return {
    x: 200,
    y: 300,
    vx: 0,
    vy: 0,
  }
}

function applyGravity(entity) {
  entity.vy += 0.15;
}

function applyJump(entity) {
  entity.vy = -5;
}

function drawPlayer(entity) {
  noStroke();
  fill("#ffb677");
  square(entity.x, entity.y, 40, 8);
}

function playerIsAlive(entity) {
  return entity.y < 600;
}

function drawGameoverScreen() {
  background(0, 192);
  fill(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2)
}
function entitiesAreColliding(
  entityA,
  entityB,
  collisionXDistance,
  collisionYDistance
) {
  // xとy、いずれかの距離が十分開いていたら、衝突していないので false を返す

  let currentXDistance = abs(entityA.x - entityB.x); // 現在のx距離
  if (collisionXDistance <= currentXDistance) return false;

  let currentYDistance = abs(entityA.y - entityB.y); // 現在のy距離
  if (collisionYDistance <= currentYDistance) return false;

  return true; // ここまで来たら、x方向でもy方向でも重なっているので true
}
