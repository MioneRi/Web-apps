// Create canvas.
const canvas = document.getElementById('ourCanvas');
const ctx = canvas.getContext('2d');

// Set images.
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Common stuff.
var score = 0;
var boxSize = 32; 

var food = {
    // We have 17 horizontal boxes and 15 vertical.
    // from 1 to 17.
    x: Math.floor(Math.random() * 17 + 1) * boxSize,
    // from 3 to 15 cuz sizes of our ground.png
    y: Math.floor(Math.random() * 15 + 3) * boxSize
};

var snake = [];
snake [0] = {
    x: 9 * boxSize,
    y: 10 * boxSize
};

// Handle controls (left, up, right, down)
document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTail(head, ourSnake) {
    for (var i = 0; i < ourSnake.length; i++)
        if (head.x == ourSnake[i].x && head.y == ourSnake[i].y)
            clearInterval(refreshStuff);
}

// Basic functions.
function draw() {
    // Ground.
    ctx.drawImage(ground, 0, 0);

    // Food.
    ctx.drawImage(foodImg, food.x, food.y);

    // Snake parts.
    for (let i = 0; i < snake.length; i++) {        
        // contour.
        ctx.fillStyle = "#1ac6ff";
        ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
        // color inside.
        if (i == 0) ctx.fillStyle = "#ff751a"; // orange.
        else ctx.fillStyle = "#006600"; // green.

        ctx.fillRect(snake[i].x + 1, snake[i].y + 1, boxSize - 5, boxSize - 5);
    }

    // Text score.
    ctx.fillStyle = "white";
    ctx.font = "38px Arial";
    ctx.fillText(score, boxSize * 2.3, boxSize * 1.6);

    // Draw logic.
    // Change the values of head, delete the last el. 
    // and check if there was a food.
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y){
        score++;
        // Change food stuff.
        food = {                        
            x: Math.floor(Math.random() * 17 + 1) * boxSize,            
            y: Math.floor(Math.random() * 15 + 3) * boxSize
        };
    } 
    else {
        snake.pop();
    }    

    // Check if snake outside game area.
    if (snakeX < boxSize || snakeX > boxSize * 17
        || snakeY < boxSize * 3 || snakeY > boxSize * 17)
        clearInterval(refreshStuff); // Stops execute setInterval function.

    if (dir == "left") snakeX -= boxSize;
    if (dir == "right") snakeX += boxSize;
    if (dir == "up") snakeY -= boxSize;
    if (dir == "down") snakeY += boxSize;
    
    var newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    // Adds new el. at the begin of array.
    snake.unshift(newHead);
}

// function fillArea() {
//     clearArea(); 
//     ctx.fillStyle = '#d9b3ff';    
//     ctx.fillRect(50, 50, 600, 600);
// }

// function clearArea() {
//     ctx.clearRect(50, 50, 600, 600);
// }

// Main logic
var endGame = false;

// Executes that func. every 100ms.
var refreshStuff = setInterval(draw, 110); 
