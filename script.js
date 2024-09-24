const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//grid sizes
const unitSize = 20;
const rows = canvas.height / unitSize;
const cols = canvas.width / unitSize;


//intial state of snake
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
let gameOver = false;

//listen for user input to change direction
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction.x === 0) {//left
        direction = { x: -1, y: 0 };
    } else if (key === 38 && direction.y === 0) {//up
        direction = { x: 0, y: -1 };
    } else if (key === 39 && direction.x === 0) {//righht
        direction = { x: 1, y: 0 };
    } else if (key === 40 && direction.y === 0) {//down
        direction = { x: 0, y: 1 };
    }
}

function update() {
    if (gameOver) return;

    //new head added and moved
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    //check for snake collision
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || snakeCollision(head)) {
        gameOver = true;
        alert('Game Over!');
        return;
    }

    snake.unshift(head);

    //check if food was added
    if (head.x === food.x && head.y === food.y) {
        //add more food
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    } else {
        snake.pop();
    }
}

function snakeCollision(head) {
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            return true;
        }
    }
    return false;
}

function draw() {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw snake
    for (let part of snake) {
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(part.x * unitSize, part.y * unitSize, unitSize, unitSize);
    }

    //draw food
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * unitSize, food.y * unitSize, unitSize, unitSize);
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 100); //snake speed
    }
}

gameLoop();
