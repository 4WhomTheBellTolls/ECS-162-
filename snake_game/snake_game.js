const canvas = document.getElementById('snakeGameCanvas');
const ctx = canvas.getContext('2d');
const snakeSize = 10;
const w = canvas.width;
const h = canvas.height;
let score = 0;
let snake;
let food;
let direction = 'right';
let gameInterval;


//innitial snake
function initSnake() {
    const length = 3;
    snake = [];
    for (let i = length - 1; i >= 0; i--) {
        snake.push({ x: i * snakeSize, y: 0 });
    }
}

//random create food 
function createFood() {
    food = {
        x: Math.floor(Math.random() * (w / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (h / snakeSize)) * snakeSize
    };
}


function drawSnake() {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'white';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
        ctx.strokeRect(part.x, part.y, snakeSize, snakeSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function updateGame() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    // Direction control
    if (direction == 'right') headX += snakeSize;
    else if (direction == 'left') headX -= snakeSize;
    else if (direction == 'up') headY -= snakeSize;
    else if (direction == 'down') headY += snakeSize;

    // Wall collision
    if (headX < 0 || headX >= w || headY < 0 || headY >= h || checkCollision(headX, headY, snake)) {
        clearInterval(gameInterval);
        ctx.font = "20px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", w / 2 - 50, h / 2);
        return;
    }

    // New head position
    const newHead = { x: headX, y: headY };

    // Eating food
    if (headX == food.x && headY == food.y) {
        score += 10;
        createFood(); // Create new food
    } else {
        snake.pop(); // Remove the tail
    }

    snake.unshift(newHead); // Add new head

    ctx.clearRect(0, 0, w, h);
    drawFood();
    drawSnake();
    document.getElementById('score').innerText = 'Score: ' + score;
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = direction === 'up';
    const goingDown = direction === 'down';
    const goingRight = direction === 'right';
    const goingLeft = direction === 'left';

    if (keyPressed === LEFT_KEY && !goingRight) {
        direction = 'left';
    } else if (keyPressed === RIGHT_KEY && !goingLeft) {
        direction = 'right';
    } else if (keyPressed === UP_KEY && !goingDown) {
        direction = 'up';
    } else if (keyPressed === DOWN_KEY && !goingUp) {
        direction = 'down';
    }
}

function checkCollision(x, y, array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) return true;
    }
    return false;
}

document.addEventListener("keydown", changeDirection);

function startGame() {
    clearInterval(gameInterval);
    score = 0;
    direction = 'right';
    createFood();
    initSnake();
    gameInterval = setInterval(updateGame, 100);
}


document.getElementById('startButton').addEventListener('click', startGame);
document.addEventListener("keydown", changeDirection);
