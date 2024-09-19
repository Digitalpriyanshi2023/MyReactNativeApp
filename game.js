const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    color: 'blue',
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    move(left, right) {
        if (left && this.x > 0) this.x -= this.speed;
        if (right && this.x < canvas.width - this.width) this.x += this.speed;
    }
};

const asteroids = [];
const asteroidSpeed = 2;
const asteroidInterval = 2000; // milliseconds
let lastAsteroidTime = 0;

function generateAsteroid() {
    const x = Math.random() * (canvas.width - 50);
    const width = 50;
    const height = 50;
    asteroids.push({ x, y: -height, width, height, color: 'gray' });
}

function drawAsteroids() {
    ctx.fillStyle = 'gray';
    asteroids.forEach(asteroid => {
        ctx.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    });
}

function updateAsteroids() {
    asteroids.forEach(asteroid => {
        asteroid.y += asteroidSpeed;
    });
    // Remove off-screen asteroids
    asteroids = asteroids.filter(asteroid => asteroid.y < canvas.height);
}

function detectCollision() {
    for (let asteroid of asteroids) {
        if (
            spaceship.x < asteroid.x + asteroid.width &&
            spaceship.x + spaceship.width > asteroid.x &&
            spaceship.y < asteroid.y + asteroid.height &&
            spaceship.y + spaceship.height > asteroid.y
        ) {
            alert('Game Over!');
            document.location.reload();
        }
    }
}

function gameLoop(timestamp) {
    if (timestamp - lastAsteroidTime > asteroidInterval) {
        generateAsteroid();
        lastAsteroidTime = timestamp;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spaceship.draw();
    drawAsteroids();
    updateAsteroids();
    detectCollision();
    
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        spaceship.move(true, false);
    } else if (e.key === 'ArrowRight') {
        spaceship.move(false, true);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        spaceship.move(false, false);
    }
});

gameLoop();
