const gameBoard = (() => {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const displayGameBoard = () => gameBoard;

  const placeSymbol = (playerSymbol, row, col) => {
    if (gameBoard[row][col] === null) {
      gameBoard[row][col] = playerSymbol;
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
    gameBoard.placeSymbol(playerSymbol, row, col);
  };

  return {
    displayPlayersName,
    displayPlayersSymbol,
    displayPlayersScore,
    updatePlayersScore,
    placeSymbolOnBoard,
  };
};

const playerOne = createPlayer('playerOne', 'X');
const playerTwo = createPlayer('playerTwo', 'O');
