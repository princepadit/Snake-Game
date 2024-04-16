// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 0, y: 0 };
let direction = "right";
let score = 0;

// Set up the game loop
function gameLoop() {
  // Move the snake
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "up") {
    head.y -= 1;
  } else if (direction === "down") {
    head.y += 1;
  } else if (direction === "left") {
    head.x -= 1;
  } else if (direction === "right") {
    head.x += 1;
  }
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score += 1;
    spawnFood();
  } else {
    snake.pop();
  }

  // Check for collision with walls
  if (
    head.x < 0 ||
    head.x >= canvas.width / 10 ||
    head.y < 0 ||
    head.y >= canvas.height / 10
  ) {
    gameOver();
    return;
  }

  // Check for collision with snake
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Draw the game
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  drawScore();

  // Call the game loop again
  setTimeout(gameLoop, 100);
}

// Set up the keyboard input
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Spawn the initial food
spawnFood();

// Start the game loop
gameLoop();

// Helper functions
function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / 10));
  food.y = Math.floor(Math.random() * (canvas.height / 10));
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameOver() {
  alert("Game over! Score: " + score);
  location.reload();
}
