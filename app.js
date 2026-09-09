const PLAYER = "●";
const COMPUTER = "×";
const EMPTY = "";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = Array(9).fill(EMPTY);
let locked = false;
const cells = [];

function winner(state) {
  for (const [a, b, c] of LINES) {
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return { mark: state[a], line: [a, b, c] };
    }
  }
  return null;
}

function isDraw(state) {
  return state.every((cell) => cell !== EMPTY) && !winner(state);
}

function availableMoves(state) {
  return state.map((cell, i) => (cell === EMPTY ? i : -1)).filter((i) => i >= 0);
}

function computerMove(state) {
  const moves = availableMoves(state);

  for (const idx of moves) {
    state[idx] = COMPUTER;
    if (winner(state)?.mark === COMPUTER) return idx;
    state[idx] = EMPTY;
  }

  for (const idx of moves) {
    state[idx] = PLAYER;
    if (winner(state)?.mark === PLAYER) {
      state[idx] = EMPTY;
      return idx;
    }
    state[idx] = EMPTY;
  }

  for (const preferred of [4, 0, 2, 6, 8, 1, 3, 5, 7]) {
    if (moves.includes(preferred)) return preferred;
  }

  return moves[Math.floor(Math.random() * moves.length)];
}

function setStatus(text) {
  statusEl.classList.add("is-updating");
  window.setTimeout(() => {
    statusEl.textContent = text;
    statusEl.classList.remove("is-updating");
  }, 160);
}

function paintCell(index, mark, animate = true) {
  const cell = cells[index];
  cell.textContent = mark;
  cell.classList.toggle("is-player", mark === PLAYER);
  cell.classList.toggle("is-computer", mark === COMPUTER);
  cell.disabled = mark !== EMPTY || locked;
  if (animate && mark) {
    cell.classList.remove("mark-in");
    // restart animation
    void cell.offsetWidth;
    cell.classList.add("mark-in");
  }
}

function highlightWin(line) {
  for (const idx of line) {
    cells[idx].classList.add("is-win");
  }
}

function syncBoard(animateIndex = null) {
  board.forEach((mark, i) => {
    paintCell(i, mark, i === animateIndex);
  });
}

function endGame(message, line = null) {
  locked = true;
  setStatus(message);
  if (line) highlightWin(line);
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function afterPlayerMove() {
  const win = winner(board);
  if (win) {
    endGame("あなたの勝ちです！", win.line);
    return;
  }
  if (isDraw(board)) {
    endGame("引き分けです。");
    return;
  }

  locked = true;
  setStatus("コンピューターの番です…");
  syncBoard();

  window.setTimeout(() => {
    const idx = computerMove(board);
    board[idx] = COMPUTER;
    locked = false;
    syncBoard(idx);

    const computerWin = winner(board);
    if (computerWin) {
      endGame("コンピューターの勝ちです。", computerWin.line);
      return;
    }
    if (isDraw(board)) {
      endGame("引き分けです。");
      return;
    }

    setStatus("あなたの番です（●）");
    syncBoard();
  }, 420);
}

function onCellClick(index) {
  if (locked || board[index] !== EMPTY) return;
  board[index] = PLAYER;
  syncBoard(index);
  afterPlayerMove();
}

function resetGame() {
  board = Array(9).fill(EMPTY);
  locked = false;
  cells.forEach((cell) => {
    cell.classList.remove("is-win", "mark-in", "is-player", "is-computer");
  });
  setStatus("あなたの番です（●）");
  syncBoard();
}

function buildBoard() {
  boardEl.innerHTML = "";
  cells.length = 0;
  for (let i = 0; i < 9; i += 1) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cell";
    btn.setAttribute("role", "gridcell");
    btn.setAttribute("aria-label", `${Math.floor(i / 3) + 1}行${(i % 3) + 1}列`);
    btn.addEventListener("click", () => onCellClick(i));
    boardEl.appendChild(btn);
    cells.push(btn);
  }
}

restartBtn.addEventListener("click", resetGame);
buildBoard();
resetGame();
