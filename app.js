//Set the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth - 100);
const height = (canvas.height = window.innerHeight - 100);

//balls Array
let balls = [];

// ball Object
const ballPrototype = {
  x: 0,
  y: 0,
  vX: 0,
  vY: 0,
  radius: 0,
  friction: 0.99,
  gravity: 0,
  create: function (x, y, radius, direction, speed, gravity) {
    let ball = Object.create(this);
    // starting x and y position of the ball
    ball.x = x;
    ball.y = y;

    // radius of the ball = 5, if not specified when creating ball object
    ball.radius = radius || 5;

    // velocity change in x-y direction
    ball.vX = Math.cos(direction) * speed;
    ball.vY = Math.sin(direction) * speed;

    // gravity on the ball
    ball.gravity = gravity || 0;

    // add ball object to balls array
    balls.push(ball);
    return ball;
  },
  // Allows the ball to move around the canvas
  update: function () {
    this.vX *= this.friction;
    this.vY *= this.friction;

    this.vY += this.gravity;

    this.x += this.vX;
    this.y += this.vY;
  },
  // draws the circular balls on the canvas with specified params
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  },
};

// Creates a new ball when function is called upon with different params
function createBalls(e) {
  for (let i = 0; i < 1; i++) {
    const radius = 15;
    const gravity = 0.3;

    // Ball starting position given by the coordinates of the mouse click
    let posX = e.clientX - rect.left;
    let posY = e.clientY - rect.top;

    let speed = Math.random() * 15;
    let angle = Math.random() * Math.PI * 2;

    //ball creation (x, y, radius, direction, speed, gravity)
    ballPrototype.create(posX, posY, radius, angle, speed, gravity);
  }
}

// Render Canvas and animate the balls
function main() {
  // creates a black canvas to display on the webpage
  const grd = ctx.createLinearGradient(0, 0, width, 0);
  grd.addColorStop(0, "black");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  //balls color
  ctx.fillStyle = "white";

  // text within the canvas
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Click to add more balls", width / 2, height / 2);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].draw();
  }
  requestAnimationFrame(main);
}

//bouncing of balls
const bounce = -0.8;

function bounceBalls() {
  for (let i = balls.length - 1; i >= 0; i -= 1) {
    let ball = balls[i];
    if (ball.x + ball.radius > width) {
      ball.x = width - ball.radius;
      ball.vX = ball.vX * bounce;
    }
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.vX = ball.vX * bounce;
    }
    if (ball.y + ball.radius > height) {
      ball.y = height - ball.radius;
      ball.vY = ball.vY * bounce;
    }
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vY = ball.vY * bounce;
    }
  }
}
main();
