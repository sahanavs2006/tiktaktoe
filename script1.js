let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const board = document.getElementById("board");
const status = document.getElementById("status");

function createBoard() {
  board.innerHTML = "";
  gameBoard.forEach((val, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = val;
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (gameBoard[index] !== "") return;
  gameBoard[index] = currentPlayer;
  createBoard();
  if (checkWinner()) {
    status.innerText = currentPlayer + " wins!";
    board.querySelectorAll(".cell").forEach(cell => cell.style.pointerEvents = "none");
  } else if (!gameBoard.includes("")) {
    status.innerText = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  return winningCombinations.some(combo =>
    combo.every(index => gameBoard[index] === currentPlayer)
  );
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  status.innerText = "";
  createBoard();
}

createBoard();