<script>
  const sudokuBoards = {
    'Junior': [
      [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ]
    ],
    'Mid-term': [/* Array of 100 medium Sudoku boards */],
    'Senior': [/* Array of 100 hard Sudoku boards */],
    'Master': [/* Array of 100 very hard Sudoku boards */],
    'Grand Master': [/* Array of 100 expert Sudoku boards */]
  };

  function loadGame() {
    const difficulty = document.getElementById('difficulty').value;
    const board = getRandomBoard(sudokuBoards[difficulty]);
    renderBoard(board);
  }

  function getRandomBoard(boards) {
    const randomIndex = Math.floor(Math.random() * boards.length);
    return boards[randomIndex];
  }

  function renderBoard(board) {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="sudoku-board"></div>';
    const sudokuBoard = app.querySelector('.sudoku-board');

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'sudoku-cell';
        if (cell !== 0) {
          cellElement.textContent = cell;
        } else {
          const input = document.createElement('input');
          input.type = 'number';
          input.min = 1;
          input.max = 9;
          input.oninput = () => validateInput(input);
          cellElement.appendChild(input);
        }
        sudokuBoard.appendChild(cellElement);
      });
    });
  }

  function validateInput(input) {
    if (input.value < 1 || input.value > 9) {
      input.value = '';
    }
  }

  // Load initial game
  loadGame();
</script>
