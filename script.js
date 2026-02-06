const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function createBoard() {
  gameBoard.innerHTML = '';
  const shuffledValues = shuffle(cardValues.slice());
  shuffledValues.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = `<div class="back">${value}</div>`;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}
function flipCard() {
  if (flippedCards.length === 2) return;
  this.classList.add('flip');
  flippedCards.push(this);
  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 1000);
  }
}
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    matchedPairs++;
  } else {
    card1.classList.remove('flip');
    card2.classList.remove('flip');
  }
  flippedCards = [];
  if (matchedPairs === cardValues.length / 2) {
    alert('You won!');
  }
}
function restartGame() {
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  createBoard();
}
restartBtn.addEventListener('click', restartGame);
createBoard();
