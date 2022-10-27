function setup() {
  createCanvas(displayWidth, windowHeight)
  rectMode(CENTER);
  background(0);
  noLoop();
}

const palette = ['#ffadad', '#ffc4ad', '#ffd6a5', '#fdffb6', '#f0ffb6', '#caffbf', '#bfffd4', '#9bf6ff', '#9be3ff', '#a0c4ff', '#a0a0ff', '#bdb2ff', '#d5b2ff', '#ffc6ff', '#ffc6eb', '#ffc6d0']

// total circles
// palette array must be at least iVar in length
const iVar = 16;

// total shapes per circle
const jVar = 32;

// BE AWARE: lowering rotation creates
// fast(er) moving colors, flashing, and flickering effects. 
const rotation = 400;

let shapeIndex = 0;

window.addEventListener("click", () => {
  isLooping() ? noLoop() : loop();
});

window.addEventListener('keyup', (e) => {
  // timeout to give loop time to stop before clearing
  e.key == 'Backspace' && (noLoop(), setTimeout(() => {
    clear()
  }, 50))

  e.key == 'Enter' && (shapeIndex++, loop());

  e.key == '1' && (shapeIndex = 0, loop()); // square
  e.key == '2' && (shapeIndex = 1, loop()); // oval
  e.key == '3' && (shapeIndex = 2, loop()); // big circle
  e.key == '4' && (shapeIndex = 3, loop()); // arch
  e.key == '5' && (shapeIndex = 4, loop()); // triangle
  e.key == '6' && (shapeIndex = 5, loop()); // small circle

})

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(windowWidth / 2, windowHeight / 2.2);

  pop()
  rotate(TWO_PI / rotation);
  push()

  for (let i = 0; i < iVar; i++) {
    push();
    rotate(TWO_PI * i / iVar);

    let tx = 200 * noise(0.01 * frameCount);
    translate(tx, 0);

    for (let j = 0; j < jVar; j++) {
      push();
      rotate(TWO_PI * j / jVar);
      fill(color(palette[i]));
      switch (shapeIndex) {
        case 0:
          rect(50, 25, 4, 3)
          break;
        case 1:
          ellipse(10, 0, 3, 3)
          break;
        case 2:
          circle(50, 50, 30)
          break;
        case 3:
          arc(10, 80, 5, 40, 0, HALF_PI)
          break;
        case 4:
          noStroke()
          triangle(100, 5, 10, 2, 2, 2)
          break;
        case 5:
          circle(10, 30, 10)
          break;
        default:
          shapeIndex = 0
      }
      pop();
    }
    pop();
  }
}

