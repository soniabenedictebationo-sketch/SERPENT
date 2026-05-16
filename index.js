alert("Bienvenue dans le jeu Snake !");
// Sélection des éléments HTML
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

// Taille des cases
const box = 20;

// État du jeu
let snake;
let direction;
let food;
let score;
let game;

// Initialisation du jeu
function initGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0;

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    scoreDisplay.textContent = score;

    if (game) clearInterval(game);
    game = setInterval(draw, 120);
}

// Contrôle clavier
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

// Dessin du jeu
function draw() {
    // Fond
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessin du serpent
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#22c55e" : "#4ade80";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Dessin de la nourriture
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(food.x, food.y, box, box);

    // Position de la tête
    let headX = snake[0].x;
    let headY = snake[0].y;

    // Déplacement
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    // Manger la nourriture
    if (headX === food.x && headY === food.y) {
        score++;
        scoreDisplay.textContent = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    // Nouvelle tête
    const newHead = { x: headX, y: headY };

    // Collision
    if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("💀 Game Over !");
    }

    snake.unshift(newHead);
}

// Vérifie collision avec le corps
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Bouton recommencer
restartBtn.addEventListener("click", initGame);

// Lancer le jeu au démarrage
initGame();

