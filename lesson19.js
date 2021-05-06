Document.write "Use the I, J, K, L, keys to move"

let numSegments = 10;
let direction = "right";

const xStart = 0;
const yStart = 250;
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;

function setup() {
  scoreElem = createDiv("Score = 0");
  scoreElem.position(20, 20);
  scoreElem.id = "score";
  scoreElem.style("color", "white");

  createCanvas(800, 450);
  frameRate(15);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  for (let w = 0; w < numSegments; w++) {
    xCor.push(xStart + w * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(0);
  for (let w = 0; w < numSegments - 1; w++) {
    line(xCor[w], yCor[w], xCor[w + 1], yCor[w + 1]);
  }
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

function updateSnakeCoordinates() {
  for (let w = 0; w < numSegments - 1; w++) {
    xCor[w] = xCor[w + 1];
    yCor[w] = yCor[w + 1];
  }
  switch (direction) {
    case "right":
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "up":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case "left":
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "down":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html("You Died. Score was : " + scoreVal);
  }
}
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let w = 0; w < xCor.length - 1; w++) {
    if (xCor[w] === snakeHeadX && yCor[w] === snakeHeadY) {
      return true;
    }
  }
}

function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html("Score = " + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}
function updateFruitCoordinates() {
  xFruit = floor(random(10, (width - 200) / 50)) * 50;
  yFruit = floor(random(10, (height - 200) / 50)) * 50;
}

function keyPressed() {
  switch (keyCode) {
    case 74:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 76:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 73:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 75:
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
}
