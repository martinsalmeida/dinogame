const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
// const score = document.querySelector('.score');
const container = document.querySelector('.container');

let isJumping = false;
let position = 0;
var total_score = 1;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      isJumping = false;
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randonTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      document.querySelector('.score').remove();
      adicionaPlacar();
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1 class="game_over">Fim de Jogo</h1>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randonTime);
}

function adicionaPlacar() {
  const showScore = document.createElement('div');
  showScore.classList.add('score');
  const dataScore = document.createTextNode(`Score: ${total_score++}`);
  showScore.appendChild(dataScore);
  container.appendChild(showScore);
}

createCactus();

document.addEventListener('keydown', handleKeyUp);
