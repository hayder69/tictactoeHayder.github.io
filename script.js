document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll("[data-cell]");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
  
    let currentPlayer = "X";
    let gameActive = true;
  
    function checkWin() {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          gameActive = false;
          cells[a].classList.add("winner");
          cells[b].classList.add("winner");
          cells[c].classList.add("winner");
          status.textContent = `Player ${currentPlayer} wins!`;
          status.style.color = "green";
          break;
        }
      }
    }
  
    function checkDraw() {
      if ([...cells].every(cell => cell.textContent)) {
        gameActive = false;
        status.textContent = "It's a draw!";
        status.style.color = "gray";
      }
    }
  
    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = [...cells].indexOf(cell);
  
      if (!gameActive || cell.textContent) return;
  
      cell.textContent = currentPlayer;
      cell.classList.add("filled");
  
      checkWin();
      if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
  
      checkDraw();
    }
  
    function resetGame() {
      gameActive = true;
      currentPlayer = "X";
      status.textContent = "Player X's turn";
      status.style.color = "#777";
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("filled", "winner");
      });
    }
  
    cells.forEach(cell => {
      cell.addEventListener("click", handleCellClick);
    });
  
    resetButton.addEventListener("click", resetGame);
  });
  