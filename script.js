console.log("Collision!");
const canvas = document.querySelector("canvas");
const tooltip = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

function getRandomColor() {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
}

class Ball {
  constructor(x, vx, mass, radius) {
    this.x = x;
    this.vx = vx;
    this.radius = radius;
    tooltip.fillStyle = getRandomColor();
  }

  checkBoundaryCollision() {
    return this.x <= this.radius || this.x + this.radius >= canvas.width;
  }

  draw() {
    tooltip.beginPath();
    tooltip.arc(
      this.x,
      canvas.height - this.radius - 1,
      this.radius,
      Math.PI * 2,
      false
    );
    tooltip.fill();
    tooltip.stroke();
    tooltip.closePath();
  }
}

const b1 = new Ball(1625, 10, 2, 30);
b1.draw();

const b2 = new Ball(500, 0, 3, 30);
b2.draw();
