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
  update: function () {
    this.vX *= this.friction;
    this.vY *= this.friction;

    this.vY += this.gravity;

    this.x += this.vX;
    this.y += this.vY;
  },
};
