function setup() {
  createCanvas(600, 400);
  for (let i = -20; i < 500; i++) {
    xList[i] = random(0, 600);
    yList[i] = i * -50;
  }
}

let xList = [];
let yList = [];

let x = 300;
let y = 350;
let bx, by = 350, bdx = 0, bdy = 0, dy = 0;
let B_gravity = 0.02;
let P_gravity = 0.02;
let cameraY = 0;
let stand_flag = 0;
let change_flag = 0;
let n = 0;
let m = 0;

function draw() {
  background(100);
  stroke(255);
  line(0, 1100 - cameraY, 600, 1100 - cameraY);
  for (let i = -20; i < xList.length; i++) {
    noStroke(0);
    fill(255);
    ellipse(xList[i], yList[i] - cameraY, 10, 10);
  }
  if (by < 300) {
    if (cameraY > by - 100) {
      cameraY = by - 100;
      m = 100;
    } else if (cameraY < by - 300) {
      cameraY = by - 300;
      m = 300;
    }
  } else if (by > 350) {
    cameraY = by - 350;
  }

  n = mouseY - y + cameraY;
  let rad = atan2(n, mouseX - x);

  console.log(change_flag);
  console.log(y);
  //console.log(by);
  //console.log("X"+mouseX);
  //console.log("Y"+mouseY);
  //console.log(cameraY);
  //console.log(flag_350);

  bx += bdx;
  bdx *= 0.995;
  by += bdy;
  if (stand_flag == 1) {
    if (y != 350) {
      y += dy;
    }
    applyGravity();
  }
  noStroke();
  fill(0, 200, 100);
  ellipse(bx, by - cameraY, 10, 10);
  if (bx < 0 || bx > 600) {
    bdx *= -0.99;
  }
  let a_x = x + 30 * cos(rad);
  let a_y = y + 30 * sin(rad);
  stroke(255);
  line(x, y - cameraY, a_x, a_y - cameraY);
  noStroke();
  fill(255);
  ellipse(x, y - cameraY, 30, 30);

  if (by > 1100) {
    bdy *= -0.99;
  } else if (y > 1085) {
    if (change_flag == 0) {
      y = 1085;
      by = 1085;
      dy = 0;
      bdx = 0;
      bdy = 0;
    } else if (change_flag == 1) {
      y = 1085;
      dy = 0;
    }
  }
}

function mousePressed() {

}

function applyGravity() {
  bdy += B_gravity;
  dy += P_gravity;
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (change_flag == 0) {//0の時押したら球を発射。一体化している。
      bx = x;
      by = y;
      rad = atan2(n, mouseX - x);
      bdx = 5 * cos(rad);
      bdy = 5 * sin(rad);
      change_flag = 1;
      dy = 0.3;
      stand_flag = 1;
    } else if (change_flag == 1) {//1の時押したら移動する。ばらばら。
      bdx = 0;
      bdy = 0;
      x = bx;
      y = by;
      change_flag = 0;
      dy = 0;
    }
  }
}
