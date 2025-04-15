const boardElement = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, i) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.textContent = cell;
    if (cell !== '') div.classList.add('taken');
    div.addEventListener('click', () => handleClick(i));
    boardElement.appendChild(div);
  });
}

function handleClick(i) {
  if (gameOver || board[i]) return;

  board[i] = currentPlayer;
  renderBoard();

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins! ✅`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== '')) {
    statusText.textContent = `It's a draw 🤖`;
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winPatterns.some(pattern => pattern.every(i => board[i] === player));
}

restartBtn.addEventListener('click', () => {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  statusText.textContent = `Player X's turn`;
  renderBoard();
});

renderBoard();
