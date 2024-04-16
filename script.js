console.log(
  "Collision on scale of 1px = 1m which will lead to a test of human sense!"
);

const canvas = document.querySelector("canvas");
const tooltip = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomColor() {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
}

class Ball {
  constructor(x, vx, mass, radius) {
    this.x = x;
    this.vx = vx;
    this.mass = mass;
    this.radius = radius;
    tooltip.fillStyle = getRandomColor();
    tooltip.font = `${this.radius * 0.4}px Arial`;
  }

  collisionToWall() {
    return this.x <= this.radius || this.x + this.radius >= canvas.width;
  }

  collisionToBall(ball) {
    return Math.abs(ball.x - this.x) <= ball.radius + this.radius;
  }

  distanceToBall(ball) {
    return Math.abs(ball.x - this.x);
  }
  processCollision(ball) {
    let final1 =
      ((this.mass - ball.mass) / (this.mass + ball.mass)) * this.vx +
      ((2 * ball.mass) / (this.mass + ball.mass)) * ball.vx;
    let final2 =
      ((2 * this.mass) / (this.mass + ball.mass)) * this.vx +
      ((ball.mass - this.mass) / (this.mass + ball.mass)) * ball.vx;
    this.vx = final1;
    ball.vx = final2;
  }

  draw() {
    tooltip.beginPath();
    tooltip.arc(
      this.x,
      canvas.height - this.radius,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    tooltip.fill();
    tooltip.fillStyle = "black";
    tooltip.stroke();
    tooltip.fillText(
      `${this.vx} m/s`,
      this.x - this.radius / 1.5,
      canvas.height - this.radius,
      2 * this.radius
    );
    tooltip.closePath();
  }
}

const b1 = new Ball(350, 10, 2, 100);
b1.draw();
const b2 = new Ball(150, 0, 3, 100);
b2.draw();
