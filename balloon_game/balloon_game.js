let score = 0;
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let gameInterval;

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.backgroundColor = 'red';
    balloon.style.width = '50px';
    balloon.style.height = '50px';
    balloon.style.position = 'absolute';
    balloon.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
    balloon.style.bottom = '0px';

    gameArea.appendChild(balloon);

    let speed = Math.random() * 2 + 1; // Random speed between 1 and 3
    function move() {
        if (parseInt(balloon.style.bottom) < gameArea.offsetHeight) {
            balloon.style.bottom = `${parseInt(balloon.style.bottom) + speed}px`;
            requestAnimationFrame(move);
        } else {
            gameArea.removeChild(balloon);
            decrementScore();
        }
    }
    move();

    //+10 when catch a ballon
    balloon.addEventListener('click', () => {
        gameArea.removeChild(balloon);
        score += 10;
        document.getElementById('score').innerText = 'Score: ' + score;
    });
}

//-5 when miss a ballon
function decrementScore() {
    score -= 5;
    document.getElementById('score').innerText = 'Score: ' + score;
    checkGameOver();
}

// game over when score<0
function checkGameOver() {
    if (score < 0) {
        clearInterval(gameInterval);  // Stop creating new balloon
        alert("Game over! Your score fell below zero.");
        gameArea.innerHTML = '';  // Optionally clear all balloon
    }
}

function startGame() {
    gameArea.innerHTML = '';  // Clear previous balloon
    score = 0;  // Reset score
    document.getElementById('score').innerText = 'Score: ' + score;
    clearInterval(gameInterval);
    gameInterval = setInterval(createBalloon, 800);//ever 800ms a new balloon
}

document.getElementById('startButton').addEventListener('click', startGame);
