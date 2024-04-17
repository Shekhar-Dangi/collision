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
  #vx;
  constructor(x, vx, mass, radius, textPosition, label) {
    this.x = x;
    this.#vx = vx;
    this.mass = mass;
    this.radius = radius;
    this.color = getRandomColor();
    this.textPosition = textPosition;
    this.label = label;
    tooltip.font = `${this.radius * 0.4}px Arial`;
  }

  getVelocity() {
    return this.#vx;
  }
  setVelocity(velocity) {
    this.#vx = velocity;
    tooltip.fillText(
      `${this.label} : ${this.#vx.toFixed(1)} m/s`,
      100,
      this.textPosition
    );
  }

  collisionToWall() {
    return this.x <= this.radius || this.x + this.radius >= canvas.width;
  }

  collisionToBall(ball) {
    return this.distanceToBall(ball) <= this.radius + ball.radius;
  }

  distanceToBall(ball) {
    return Math.abs(this.x - ball.x);
  }

  processCollision(ball) {
    let overlap = this.radius + ball.radius - this.distanceToBall(ball);
    let direction = Math.sign(ball.x - this.x);
    this.x -= overlap * direction;
    let final1 =
      ((this.mass - ball.mass) / (this.mass + ball.mass)) * this.#vx +
      ((2 * ball.mass) / (this.mass + ball.mass)) * ball.#vx;
    let final2 =
      ((2 * this.mass) / (this.mass + ball.mass)) * this.#vx +
      ((ball.mass - this.mass) / (this.mass + ball.mass)) * ball.#vx;
    this.setVelocity(final1);
    ball.setVelocity(final2);
    console.log(final1, final2);
  }

  draw() {
    tooltip.beginPath();
    tooltip.fillStyle = this.color;
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
    this.setVelocity(this.#vx);
    tooltip.closePath();
  }

  update(ball) {
    if (this.radius != ball.radius) {
      alert("Switch to 2d collision!");
    }
    if (this.collisionToWall()) {
      console.log("wall collision");
      this.setVelocity(-this.#vx);
    }
    if (ball.collisionToWall()) {
      console.log("wall collision");
      ball.setVelocity(-ball.#vx);
    }
    if (this.collisionToBall(ball)) {
      // alert(`Collision! from ${this.label}`);
      this.processCollision(ball);
    }
    this.draw();
    ball.draw();

    this.x += this.#vx;
    ball.x += ball.getVelocity();
  }
}

const b1 = new Ball(150, 0, 0.2, 50, 100, "b1");
// b1.draw();
const b2 = new Ball(300, -3, 3, 50, 200, "b2");
// b2.draw();

function animate() {
  tooltip.clearRect(0, 0, innerWidth, innerHeight);
  b2.update(b1);

  // alert(
  //   `x1 : ${b1.x}, x2 : ${b2.x}, distance : ${b1.distanceToBall(
  //     b2
  //   )}, radius sum : ${b1.radius + b2.radius}`
  // );
  requestAnimationFrame(animate);
}

animate();
