let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let moves = 0;
let secondsElapsed = 0;
let timerId = null;

const emojis = ["🍕", "🍕", "🐶", "🐶", "🚀", "🚀", "🌈", "🌈"];

const board = document.querySelector("#board");
const movesDisplay = document.querySelector("#moves");
const matchesDisplay = document.querySelector("#matches");
const timerDisplay = document.querySelector("#timer");
const messageDisplay = document.querySelector("#message");
const restartButton = document.querySelector("#restart");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(function () {
    secondsElapsed++;
    updateStats();
  }, 1000);
}

function stopTimer() {
  if (timerId === null) return;

  clearInterval(timerId);
  timerId = null;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function createCard(emoji) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.emoji = emoji;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${emoji}</div>
    </div>
  `;

  card.addEventListener("click", flipCard);
  return card;
}

function setupBoard() {
  board.innerHTML = "";

  const shuffledEmojis = [...emojis];
  shuffle(shuffledEmojis);

  for (let i = 0; i < shuffledEmojis.length; i++) {
    const card = createCard(shuffledEmojis[i]);
    board.appendChild(card);
  }
}

function updateStats() {
  movesDisplay.textContent = moves;
  matchesDisplay.textContent = matchesFound;
  timerDisplay.textContent = formatTime(secondsElapsed);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("flipped")) return;

  startTimer();

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  moves++;
  updateStats();

  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.classList.add("match");
  secondCard.classList.add("match");

  matchesFound++;
  updateStats();

  resetTurn();
  checkWin();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(function () {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetTurn();
  }, 800);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkWin() {
  if (matchesFound === emojis.length / 2) {
    stopTimer();
    messageDisplay.textContent = `You won in ${moves} moves and ${formatTime(secondsElapsed)}!`;
  }
}

function restartGame() {
  stopTimer();

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchesFound = 0;
  moves = 0;
  secondsElapsed = 0;

  messageDisplay.textContent = "";

  updateStats();
  setupBoard();
}

restartButton.addEventListener("click", restartGame);
restartGame();
