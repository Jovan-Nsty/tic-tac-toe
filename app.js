const gameBoard = (() => {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let gameActive = true;

  const gameOver = () => {
    gameActive = false;
    console.log('Game Over!');
  }

  const displayGameBoard = () => gameBoard;

  const placeSymbol = (playerName,playerSymbol, row, col) => {
    if(gameActive) {
      if (gameBoard[row][col] === null) {
        gameBoard[row][col] = playerSymbol;
      }
      checkWin(playerName,playerSymbol);
    }
  };

  const checkWin = (playerName,playerSymbol) => {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        // check rows
        if (gameBoard[j].every(row => row === playerSymbol)) {
          console.log('Row win for ' + playerName);
          gameOver();
          break;
        }
        // check columns
        if (gameBoard.every(column => column[j] === playerSymbol)) {
          console.log('Column win for ' + playerName);
          gameOver();
          break;
        }
        // check diagonals
        if (gameBoard[0][0] === playerSymbol && gameBoard[1][1] === playerSymbol && gameBoard[2][2] === playerSymbol) {
          console.log('Left diagonal win for ' + playerName);
          gameOver();
          break;
        }
        if(gameBoard[0][2] === playerSymbol && gameBoard[1][1] === playerSymbol && gameBoard[2][0] === playerSymbol) {
          console.log('right diagonal win for ' + playerName);
          gameOver();
          break;
        }
        // check ties
        if(gameBoard.every(row => row.every(element => element !== null))) {
          console.log(`It's a tie!`);
          gameOver();
          break;
        }
      }
      break;
    }
  };

  return { displayGameBoard, placeSymbol };
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
