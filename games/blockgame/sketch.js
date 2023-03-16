let block = [
  [0, 1, 1, 1, 1, 1, 1, 1,],
  [1, 0, 1, 1, 1, 1, 1, 1,],
  [1, 1, 0, 1, 1, 1, 1, 1,],
  [1, 1, 1, 0, 1, 1, 1, 1,],
  [1, 1, 1, 1, 0, 1, 1, 1,],
  [1, 1, 1, 1, 1, 0, 1, 1,],
];

let stage = [
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0,],
];

let lines = 0;
let num = 0;

let bx = 0;
let by = 0;
let dy = -10;

function setup() {
  createCanvas(400, 600);
  init_block();
}

function draw() {
  background(150);

  draw_stage();
  console.log(num);
  if (frameCount % 200 == 0) {
    update_stage(num);
    num += 1;
  }
  by += dy;
  rect(bx, by, 50, 50, 8);
  for (let i = 0; i < 8; i++) {
    if (dist(i * 50, num * 50, bx, by) < 5) {
      if (stage[num][i] == 0) {
        stage[num][i] = 1;
        bx = -999;
        by = -999;
        if (canDelete() == 1) {
          lineDelete();
        }
      }
    }
  }
}

function draw_stage() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 8; j++) {
      if (stage[i][j] == 1) {
        let x = j * 50;
        let y = i * 50;
        fill(0, 200, 100);
        rect(x, y, 50, 50, 8);
      }
    }
  }
}

function init_block() {
  lines = int(random(block.length));
  set_stage();
}

function set_stage() {
  for (let i = 0; i < 8; i++) {
    stage[0][i] = block[lines][i];
  }
}

function update_stage(p1) {
  for (let i = p1; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      stage[i + 1][j] = stage[i][j];
    }
  }
  init_block();
}

function mousePressed() {
  bx = mouseX - 25;
  by = mouseY - 25;
}

function canDelete() {
  for (let i = 0; i < 8; i++) {
    if (stage[num][i] == 0) {
      return 0;
    }
  }
  return 1;
}

function lineDelete() {
  for (let i = 0; i < 8; i++) {
    stage[num][i] = 0;
  }
  num -= 1;
}
