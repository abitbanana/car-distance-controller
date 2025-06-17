const background = document.getElementById("background");

const whiteCar = document.getElementById("white-car");
let positionWhiteCar = {
  x: 0,
  y: background.offsetHeight / 2 - 1.5 * whiteCar.offsetHeight,
};
// in pixel per second
const maxVelocity = 100;
let velocityWhiteCar = {
  x: 0,
  y: 0,
};
const maxAcceleration = 20;
let accelerationWhiteCar = {
  x: 0,
  y: 0,
};

const blueCar = document.getElementById("blue-car");
let positionBlueCar = {
  x: 0,
  y: background.offsetHeight / 2 - 1.5 * blueCar.offsetHeight,
};
let velocityBlueCar = {
  x: 0,
  y: 0,
};
let accelerationBlueCar = {
  x: 0,
  y: 0,
};

let lastAnimationTimestampInMs;

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    brakeWhiteCar();
  } else if (event.key === "ArrowRight") {
    accelerateWhiteCar();
  }
});

requestAnimationFrame(animate);

function animate(timestampInMs) {
  if (!lastAnimationTimestampInMs) {
    lastAnimationTimestampInMs = timestampInMs;
  }

  const deltaTimeInSeconds =
    (timestampInMs - lastAnimationTimestampInMs) / 1000;

  updatePosition(deltaTimeInSeconds);
  updateVelocity(deltaTimeInSeconds);
  updateAcceleration();
  draw();

  lastAnimationTimestampInMs = timestampInMs;
  requestAnimationFrame(animate);
}

function updatePosition(deltaTime) {
  positionWhiteCar.x += velocityWhiteCar.x * deltaTime;
  positionWhiteCar.y += velocityWhiteCar.y * deltaTime;
  positionBlueCar.x += velocityBlueCar.x * deltaTime;
  positionBlueCar.y += velocityBlueCar.y * deltaTime;
}

function updateVelocity(deltaTime) {
  velocityWhiteCar.x += accelerationWhiteCar.x * deltaTime;
  velocityWhiteCar.y += accelerationWhiteCar.y * deltaTime;
  velocityBlueCar.x += accelerationBlueCar.x * deltaTime;
  velocityBlueCar.y += accelerationBlueCar.y * deltaTime;
}

function updateAcceleration() {}

function draw() {
  whiteCar.style.transform = `translate(${positionWhiteCar.x}px, ${positionWhiteCar.y}px)`;
  blueCar.style.transform = `translate(${positionBlueCar.x}px, ${positionBlueCar.y}px)`;
}

function accelerateWhiteCar() {
  if (velocityWhiteCar.x < maxVelocity) {
    if (accelerationWhiteCar.x < maxAcceleration) {
      accelerationWhiteCar.x += 1;
    }
  } else {
    accelerationWhiteCar.x = 0;
    velocityWhiteCar.x = maxVelocity;
  }
}

function brakeWhiteCar() {
  if (velocityWhiteCar.x > 0) {
    if (accelerationWhiteCar.x > -3 * maxAcceleration) {
      accelerationWhiteCar.x -= 1;
    }
  } else {
    accelerationWhiteCar.x = 0;
    velocityWhiteCar.x = 0;
  }
}
