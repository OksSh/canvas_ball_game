let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let keyActions = {
  32: 'stop',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

let ballSpeeds = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
};

let speedFactors = {
  90: 'z',
  88: 'x',
};

let sizeFactors = {
  67: 'c',
  86: 'v',
};

let Ball = function () {
  this.x = width / 2;
  this.y = height / 2;
  this.radius = 10;
  this.xSpeed = -5;
  this.ySpeed = 5;
  this.speed = 5;
};

let ball = new Ball();

function getCircle(x, y, radius, isFull, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  if (isFull) {
    context.fillStyle = color;
    context.fill();
  } else {
    context.strokeStyle = color;
    context.stroke();
  }
}

function setBallParams(event) {
  let direction = keyActions[event.keyCode];
  let speed = ballSpeeds[event.keyCode];
  let speedFactor = speedFactors[event.keyCode];
  let sizeFactor = sizeFactors[event.keyCode];

  ball.setDirection(direction);

  if (speed) {
    ball.setSpeed(speed);
  }

  if (speedFactor) {
    ball.changeSpeed(speedFactor);
  }

  if (sizeFactor) {
    ball.changeSize(sizeFactor);
  }
}

function setMoveBall() {
  context.clearRect(0, 0, width, height);
  ball.draw();
  ball.move();
  context.strokeRect(0, 0, width, height);
}

Ball.prototype.move = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  if (this.x > width || this.x < 0) {
    this.xSpeed = -this.xSpeed;
  }
  if (this.y > height || this.y < 0) {
    this.ySpeed = -this.ySpeed;
  }
};

Ball.prototype.draw = function () {
  getCircle(this.x, this.y, this.radius, true, 'orange');
};

Ball.prototype.setDirection = function (direction) {
  if (direction === 'up') {
    this.xSpeed = 0;
    this.ySpeed = -this.speed;
  } else if (direction === 'down') {
    this.xSpeed = 0;
    this.ySpeed = this.speed;
  } else if (direction === 'left') {
    this.xSpeed = -this.speed;
    this.ySpeed = 0;
  } else if (direction === 'right') {
    this.xSpeed = this.speed;
    this.ySpeed = 0;
  } else if (direction === 'stop') {
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
};

Ball.prototype.setSpeed = function (speed) {
  this.speed = speed;

  if (this.xSpeed > 0) {
    this.xSpeed = speed;
  } else if (this.xSpeed < 0) {
    this.xSpeed = -speed;
  }

  if (this.ySpeed > 0) {
    this.ySpeed = speed;
  } else if (this.ySpeed < 0) {
    this.ySpeed = -speed;
  }
};

Ball.prototype.changeSpeed = function (speedFactor) {
  if (speedFactor === 'z') {
    this.speed /= 2;
    this.xSpeed /= 2;
    this.ySpeed /= 2;
  } else if (speedFactor === 'x') {
    this.speed *= 2;
    this.xSpeed *= 2;
    this.ySpeed *= 2;
  }
};

Ball.prototype.changeSize = function (sizeFactor) {
  if (sizeFactor === 'v' && this.radius < 100) {
    this.radius += 1;
  }

  if (sizeFactor === 'c' && this.radius > 1) {
    this.radius -= 1;
  }
};

$('body').keydown((event) => setBallParams(event));

setInterval(() => setMoveBall(), 30);
