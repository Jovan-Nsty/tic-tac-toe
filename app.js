const createPlayer = () => {
  let playerName = '';
  let playerSymbol = '';
  let playerScore = 0;

  const setPlayersName = name => {
    playerName = name;
  }

  const setPlayersSymbol = symbol => {
    playerSymbol = symbol;
  }

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
    setPlayersName,
    setPlayersSymbol
  };
};

const playerOne = createPlayer();
const playerTwo = createPlayer();

const gameBoard = (() => {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let gameActive = true;

  const gameOver = playerSymbol => {
    playerSymbol === 'X' ? playerOne.updatePlayersScore() : playerTwo.updatePlayersScore();
    gameActive = false;
    displayResult.updateResult();
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

  const placeSymbol = (playerSymbol, row, col) => {
    if(gameActive && gameBoard[row][col] === null) {
      gameBoard[row][col] = playerSymbol;
      displayGameBoard();
      checkWin(playerSymbol);
    }
  };

  const checkWin = playerSymbol => {
    // Check rows
    for(let i = 0; i < gameBoard.length; i++) {
      if(gameBoard[i].every(row => row === playerSymbol)) {
        gameOver(playerSymbol);
      }
    }

    // Check columns
    for(let i = 0; i < gameBoard[0].length; i++) {
      if(gameBoard.every(column => column[i] === playerSymbol)) {
        gameOver(playerSymbol);
      }
    }

    // Check diagonals
    if(gameBoard[0][0] === playerSymbol && gameBoard[1][1] === playerSymbol && gameBoard[2][2] === playerSymbol || 
       gameBoard[0][2] === playerSymbol && gameBoard[1][1] === playerSymbol && gameBoard[2][0] === playerSymbol) {
      gameOver(playerSymbol);
    } 

    // Check ties
    if(gameBoard.every(row => row.every(element => element !== null))) {
      gameActive = false;
    }
  };

  return { displayGameBoard, placeSymbol, deleteGameBoard };
})();

const gameFlow = (() => {
  let rowPosition = null;
  let columnPosition = null;
  let playerOneMove = true;

  playerOne.setPlayersSymbol('X');
  playerTwo.setPlayersSymbol('O');

  const container = document.getElementById('container');

  // Get row and column positions of clicked square
  container.addEventListener('click',(event) => {
    const target = event.target;
    const rowElement = target.closest('.row');

    if (rowElement) {
      rowPosition = rowElement.dataset.row;
    }

    if (target.classList.contains('column')) {
      columnPosition = target.dataset.column;
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
  const rematchBtn = document.getElementById('rematch-btn');

  const { deleteGameBoard } = gameBoard;

  rematchBtn.addEventListener('click',() => {
    deleteGameBoard();
  });
})();

const displayResult = (() => {
  const resultPlaceholder = document.getElementById('result-placeholder');
  const createParagraph = document.createElement('p');
  
  const updateResult = (() => {
    createParagraph.textContent = 
    `${playerOne.displayPlayersName()} ${playerOne.displayPlayersScore()} :
     ${playerTwo.displayPlayersScore()} ${playerTwo.displayPlayersName()}`;

    resultPlaceholder.appendChild(createParagraph);
  });

  updateResult();

  return { updateResult }
})();

const formControl = (() => {
  const form = document.getElementById('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const playerXName = document.getElementById('player-x').value;
    const playerOName = document.getElementById('player-o').value;
    
    playerOne.setPlayersName(playerXName);
    playerTwo.setPlayersName(playerOName);

    displayResult.updateResult();

    form.style.display = 'none';
  })
})();
