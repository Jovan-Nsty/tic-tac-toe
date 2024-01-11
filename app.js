const gameBoard = (() => {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let gameActive = true;

  const gameOver = (playerSymbol) => {
    playerSymbol === 'X' ? playerOne.updatePlayersScore() : playerTwo.updatePlayersScore();
    gameActive = false;
    console.log('Game Over!');
  }

  const displayGameBoard = () => {
    for(let i = 0; i < gameBoard.length; i++) {
      const row = document.querySelector(`[data-row="${i}"]`);
      for(let j = 0; j < gameBoard[i].length; j++) {
        const column = row.querySelector(`[data-column="${j}"]`);
        column.textContent = gameBoard[i][j];
      }
    }
  };

  const deleteGameBoard = () => {
    for(let i = 0; i < gameBoard.length; i++) {
      for(let j = 0; j < gameBoard[i].length; j++) {
        gameBoard[i][j] = null;
      }
    }
    displayGameBoard();
    gameActive = true;
  };

  const placeSymbol = (playerName,playerSymbol, row, col) => {
    if(gameActive) {
      if (gameBoard[row][col] === null) {
        gameBoard[row][col] = playerSymbol;
      }
      displayGameBoard();
      checkWin(playerName,playerSymbol);
    }
  };

  const checkWin = (playerName,playerSymbol) => {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        // check rows
        if (gameBoard[j].every(row => row === playerSymbol)) {
          console.log('Row win for ' + playerName);
          gameOver(playerSymbol);
          break;
        }
        // check columns
        if (gameBoard.every(column => column[j] === playerSymbol)) {
          console.log('Column win for ' + playerName);
          gameOver(playerSymbol);
          break;
        }
        // check diagonals
        if (gameBoard[0][0] === playerSymbol && gameBoard[1][1] === playerSymbol && gameBoard[2][2] === playerSymbol) {
          console.log('Left diagonal win for ' + playerName);
          gameOver(playerSymbol);
          break;
        }
        if(gameBoard[0][2] === playerSymbol && gameBoard[1][1] === playerSymbol && gameBoard[2][0] === playerSymbol) {
          console.log('right diagonal win for ' + playerName);
          gameOver(playerSymbol);
          break;
        }
        // check ties
        if(gameBoard.every(row => row.every(element => element !== null))) {
          console.log(`It's a tie!`);
          gameOver(playerSymbol);
          break;
        }
      }
      break;
    }
  };

  return { displayGameBoard, placeSymbol, deleteGameBoard };
})();

const gameFlow = (() => {
  let rowPosition = null;
  let columnPosition = null;
  let playerOneMove = true;

  const container = document.getElementById('container');

  // Get row and column positions of clicked square
  container.addEventListener('click',(event) => {
    const target = event.target;
    const rowElement = target.closest('.row');

    if (rowElement) {
      rowPosition = rowElement.dataset.row;
      console.log(`Row position: ${rowPosition}`);
    }

    if (target.classList.contains('column')) {
      columnPosition = target.dataset.column;
      console.log(`Column position: ${columnPosition}`);
    }

    // Players take turns using row and column positions to fill available squares
    if(playerOneMove) {
      playerOne.placeSymbolOnBoard(rowPosition,columnPosition);
      playerOneMove = false;
    } else {
      playerTwo.placeSymbolOnBoard(rowPosition,columnPosition);
      playerOneMove = true;
    }
  })
})();

const displayController = (() => {
  const rematchBtn = document.querySelector('.button');

  const { deleteGameBoard } = gameBoard;

  rematchBtn.addEventListener('click',() => {
    console.log('rematch click');
    deleteGameBoard();
  });
})();

const createPlayer = (name, mark) => {
  const playerName = name;
  const playerSymbol = mark;
  let playerScore = 0;

  const displayPlayersName = () => playerName;
  const displayPlayersSymbol = () => playerSymbol;
  const displayPlayersScore = () => playerScore;
  const updatePlayersScore = () => playerScore++;

  const placeSymbolOnBoard = (row, col) => {
    gameBoard.placeSymbol(playerName,playerSymbol, row, col);
  };

  return {
    displayPlayersName,
    displayPlayersSymbol,
    displayPlayersScore,
    updatePlayersScore,
    placeSymbolOnBoard,
  };
};

const playerOne = createPlayer('Player X', 'X');
const playerTwo = createPlayer('Player O', 'O');
