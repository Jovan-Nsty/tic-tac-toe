const gameBoard = (() => {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const displayGameBoard = () => gameBoard;

  const updateGameBoard = (playerSymbol, row, col) => {
    if (gameBoard[row][col] === null) {
      gameBoard[row][col] = playerSymbol;
    }
  };

  return { displayGameBoard, updateGameBoard };
})();

const createPlayer = (name, mark) => {
  const playerName = name;
  const playerSymbol = mark;
  let playerScore = 0;

  const displayPlayersName = () => playerName;
  const displayPlayersSymbol = () => playerSymbol;
  const displayPlayersScore = () => playerScore;
  const updatePlayersScore = () => playerScore++;

  return {
    displayPlayersName,
    displayPlayersSymbol,
    displayPlayersScore,
    updatePlayersScore,
  };
};
