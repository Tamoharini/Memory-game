const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

const cardValues = [
  'A','A','B','B','C','C','D','D',
  'E','E','F','F','G','G','H','H'
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  gameBoard.innerHTML = '';
  cards = [];
  matchedPairs = 0;

  const shuffled = shuffle(cardValues.slice());

  shuffled.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    card.innerHTML = `
      <div class="front"></div>
      <div class="back">${value}</div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

function flipCard() {
  if (this.classList.contains('flip')) return;
  if (flippedCards.length === 2) return;

  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [c1, c2] = flippedCards;

  if (c1.dataset.value === c2.dataset.value) {
    matchedPairs++;
  } else {
    c1.classList.remove('flip');
    c2.classList.remove('flip');
  }

  flippedCards = [];

  if (matchedPairs === cardValues.length / 2) {
    alert("You won!");
  }
}

restartBtn.addEventListener('click', createBoard);

createBoard();
