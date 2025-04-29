let randomNumber;
let attempts;
let monsterAttackTurn;
let monsterImages = ['monstruo1.png'];
let currentMonster;
let gameOver = false;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const jugador = document.getElementById('jugador');
const monstruo = document.getElementById('monstruo');

function initGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  monsterAttackTurn = Math.floor(Math.random() * 8) + 8;
  currentMonster = monsterImages[Math.floor(Math.random() * monsterImages.length)];
  monstruo.src = `assets/${currentMonster}`;
  monstruo.style.left = '0%';
  message.textContent = '';
  attemptsDisplay.textContent = 'Intentos: 0';
  guessButton.disabled = false;
  guessInput.disabled = false;
  restartButton.style.display = 'none';
  gameOver = false;
  jugador.classList.remove('entering'); 
  jugador.style.left = '510px';         
  jugador.style.opacity = '1';          

}

guessButton.addEventListener('click', () => {
  if (gameOver) return;

  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = 'Ingresa un número válido entre 1 y 100.';
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Intentos: ${attempts}`;

   // Mover monstruo hacia el jugador (proporcional, sin llegar antes de tiempo)
   const jugadorLeft = jugador.offsetLeft;
   const casaLeft = document.querySelector('.casa').offsetLeft;
   const maxTravel = jugadorLeft - 64; // Ajuste para no sobrepasar jugador
 
   let monsterProgress = Math.min(attempts / monsterAttackTurn, 1);
   monstruo.style.left = `${monsterProgress * maxTravel}px`;
 

  if (guess === randomNumber) {
    message.textContent = '¡Correcto! Has adivinado el número.';
    showPopupMessage("¡Uff, te has salvado!");

const jugador = document.querySelector('.jugador');
jugador.classList.add('entering');

const enterSound = document.getElementById('enterSound');
enterSound.play();

    endGame(true);
  } else if (guess < randomNumber) {
    message.textContent = 'Demasiado bajo. Intenta de nuevo.';
  } else {
    message.textContent = 'Demasiado alto. Intenta de nuevo.';
  }

  if (attempts >= monsterAttackTurn) {
    showPopupMessage("Ese monstruo ha sido más rápido...");
    endGame(false);
  }
});

function endGame(won) {
  guessButton.disabled = true;
  guessInput.disabled = true;
  gameOver = true;
  restartButton.style.display = 'inline-block';
}

restartButton.addEventListener('click', () => {
  initGame();
});

function showPopupMessage(text) {
    const popup = document.getElementById('popup');
    popup.textContent = text;
  
    // Ubicar justo sobre el jugador
    const jugador = document.querySelector('.jugador');
    const rect = jugador.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top - 40}px`;
    popup.classList.add('show');
  
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  }
  
window.onload = initGame;

window.addEventListener('click', () => {
    const musica = document.getElementById('musica');
    if (musica.paused) {
      musica.play().catch((error) => {
        console.log("No se pudo reproducir el audio automáticamente:", error);
      });
    }
  }, { once: true }); // Solo una vez
  