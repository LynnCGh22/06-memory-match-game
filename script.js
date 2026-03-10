let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const emojis = ["🍕","🍕","🐶","🐶","🚀","🚀","🌈","🌈"];

shuffle(emojis);

let lockBoard = false;


function flipCard() {

  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  checkMatch();
}

function unflipCards() {

  lockBoard = true;

  setTimeout(() => {

    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetTurn();

  }, 800);

}

function checkMatch() {

  const isMatch =
    firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {

    disableCards();

  } else {

    unflipCards();

  }
}

function disableCards() {

  let matches = 0;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetTurn();

}



function resetTurn() {

  firstCard = null;
  secondCard = null;
  lockBoard = false;

}

let moves = 0;

function checkMatch() {

  moves++;
  document.getElementById("moves").textContent = moves;

  const isMatch =
    firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {

    disableCards();

  } else {

    unflipCards();

  }

}