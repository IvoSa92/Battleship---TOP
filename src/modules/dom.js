import Game from "./game.js";

class Dom {
  constructor() {
    this.game = null;
    this.gameStart = false;
    this.container = document.querySelector(".container");
    this.header = document.querySelector(".header");
    this.gameContainer = document.querySelector(".game-container");
    this.gameBtn1Player = document.querySelector(".start-game-1player");
    this.gameBtn2Player = document.querySelector(".start-game-2player");
    this.startGame = document.querySelector(".name-input");
    this.userBoard = document.querySelector(".user-board");
    this.enemyBoard = document.querySelector(".enemy-board");

    //objects
    this.player;
    this.enemy;
  }

  setGame(game) {
    this.game = game;
  }

  //nameInput and starting game
  nameInput() {
    if (!this.gameStart) {
      this.gameStart = true;
      let div = document.createElement("div");
      div.className = "ask-name-div";

      let title = document.createElement("h1");
      title.textContent = "What's your name?";

      let input = document.createElement("input");
      input.className = "name-input";
      input.placeholder = "Type here...";
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.initializeGame(input.value);
          div.remove();
        }
      });

      let container = this.gameContainer;
      div.append(title, input);
      container.appendChild(div);
      input.focus();
    }
  }

  //initialize game
  initializeGame(playerName) {
    const newGame = new Game(playerName, "Enemy", 10);
    this.setGame(newGame);

    this.player = newGame.player;
    this.enemy = newGame.enemy;
    this.renderBoard(this.player, this.enemy);
    let playerFleet = newGame.playerFleet;
    let enemyFleet = newGame.enemyFleet;

    this.enemy.gameboard.placeShipRandom(enemyFleet);
    this.eventListenerForShipPlacing(playerFleet, this.player, this.enemy);
    this.gameBtn1Player.remove();
  }

  //render the boards
  renderBoard(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    const boardTitle = document.querySelectorAll(".board-title");
    boardTitle.forEach((title) => {
      title.style.display = "flex";
    });

    //display elements
    const userDiv = document.querySelector(".user-title-div");
    const enemyDiv = document.querySelector(".enemy-title-div");
    const icons = document.querySelectorAll(".icon");
    icons.forEach((icon) => {
      icon.classList.add("activate");
    });
    userDiv.classList.add("activate");
    enemyDiv.classList.add("activate");

    //render player board
    const playerGameboard = document.createElement("div");
    playerGameboard.className = "player-gameboard";
    let cellCounter = 0;

    for (let row = 0; row < player.gameboard.size; row++) {
      for (let col = 0; col < player.gameboard.size; col++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add("user-cell");
        let cellId = cellCounter.toString().padStart(2, "0");
        cell.setAttribute("id", cellId);
        playerGameboard.appendChild(cell);
        player.gameboard.gameBoard[row][col].element = cell;
        cellCounter++;
      }
    }

    //user ship container
    let userShipContainer = document.createElement("div");
    userShipContainer.className = "ship-container";

    const createShipIcon = (className, src) => {
      let ship = document.createElement("img");
      ship.src = src;
      ship.className = className;
      ship.classList.add("ship-icon");
      return ship;
    };

    let ship1 = createShipIcon("uCarrier gray", "../src/assets/ship-5.jpg");
    let ship2 = createShipIcon("uBattleship gray", "../src/assets/ship-4.jpg");
    let ship3 = createShipIcon("uCruiser gray", "../src/assets/ship-3.jpg");
    let ship4 = createShipIcon("uSubmarine gray", "../src/assets/ship-3.jpg");
    let ship5 = createShipIcon("uDestroyer gray", "../src/assets/ship-2.jpg");

    userShipContainer.append(ship1, ship2, ship3, ship4, ship5);

    //enemy ship container

    let enemyShipContainer = document.createElement("div");
    enemyShipContainer.className = "e-ship-container";
    let ship_1 = createShipIcon("eCarrier", "../src/assets/ship-5.jpg");
    let ship_2 = createShipIcon("eBattleship", "../src/assets/ship-4.jpg");
    let ship_3 = createShipIcon("eCruiser", "../src/assets/ship-3.jpg");
    let ship_4 = createShipIcon("eSubmarine", "../src/assets/ship-3.jpg");
    let ship_5 = createShipIcon("eDestroyer", "../src/assets/ship-2.jpg");

    enemyShipContainer.append(ship_1, ship_2, ship_3, ship_4, ship_5);

    // render enemy board
    const enemyGameboard = document.createElement("div");
    enemyGameboard.className = "enemy-gameboard";
    cellCounter = 0;

    for (let row = 0; row < enemy.gameboard.size; row++) {
      for (let col = 0; col < enemy.gameboard.size; col++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add("enemy-cell");
        let cellId = cellCounter.toString().padStart(2, "0");
        cell.setAttribute("id", cellId);
        enemyGameboard.appendChild(cell);
        enemy.gameboard.gameBoard[row][col].element = cell;
        cellCounter++;
      }
    }
    //render ship direction button
    const shipDirectionDiv = document.createElement("div");
    shipDirectionDiv.classList.add("direction-btn-div");

    const shipDirectionBtn = document.createElement("button");
    shipDirectionBtn.classList.add("ship-direction");
    shipDirectionBtn.textContent = "Vertical";

    shipDirectionBtn.addEventListener("click", () => {
      shipDirectionBtn.textContent =
        shipDirectionBtn.textContent === "Vertical" ? "Horizontal" : "Vertical";
    });

    shipDirectionDiv.appendChild(shipDirectionBtn);

    // add elements to the dom
    this.userBoard.append(playerGameboard, shipDirectionDiv, userShipContainer);
    this.enemyBoard.append(enemyGameboard, enemyShipContainer);
  }

  //event listener for the ship placement
  eventListenerForShipPlacing(fleet, player, enemy) {
    let board = document.querySelector(".user-board");
    let cells = board.querySelectorAll(".cell");
    let counter = 0;
    let shipFleet = fleet;
    let shipDirection = document.querySelector(".ship-direction");
    let ships = Array.from(document.querySelectorAll(".gray"));

    const shipPlacingHandler = (event) => {
      let row = parseInt(event.target.id[0]);
      let column = parseInt(event.target.id[1]);
      let direction = shipDirection.textContent;

      if (counter < shipFleet.length) {
        let placementSuccessful = this.player.gameboard.placeShip(
          shipFleet[counter],
          row,
          column,
          direction
        );

        console.log(ships[counter]);
        ships[counter].classList.remove("gray");

        if (placementSuccessful) {
          this.updateUi(enemy, player);
          console.log(counter);
          counter++;
          if (counter === shipFleet.length) {
            cells.forEach((cell) =>
              cell.removeEventListener("click", shipPlacingHandler)
            );
            shipDirection.remove();
            let eShipContainer = document.querySelector(".e-ship-container");
            eShipContainer.style.marginTop = "1rem";

            this.eventListenerForPlaying(player, enemy);
          }
        }
      }
    };

    cells.forEach((cell) => cell.addEventListener("click", shipPlacingHandler));
  }

  // after placing the ships the event listener for starting the game
  eventListenerForPlaying(player, enemy) {
    let board = document.querySelector(".enemy-board");
    let cells = board.querySelectorAll(".cell");

    const handleClick = (event) => {
      let cell = event.target;

      let row = parseInt(cell.id[1]);
      let column = parseInt(cell.id[0]);

      if (player.attack(enemy, row, column) === true) {
        cell.removeEventListener("click", handleClick);
        this.updateUi(enemy, player);
        if (this.game.checkGameOver() === "enemyGameOver") {
          cells.forEach((cell) => {
            cell.removeEventListener("click", handleClick);
          });
          this.showWinner(player);
        }
        return;
      }
      this.updateUi(enemy, player);

      setTimeout(() => {
        enemy.attackRandom(player);
        this.updateUi(enemy, player);
      }, 1000);

      if (this.game.checkGameOver() === "playerGameOver") {
        cells.forEach((cell) => {
          cell.removeEventListener("click", handleClick);
        });
        this.showWinner(enemy);
      }
      cell.removeEventListener("click", handleClick);
    };

    cells.forEach((cell) => {
      cell.addEventListener("click", handleClick);
    });
  }

  //function for UI updates
  updateUi(enemy, player) {
    let enemyBoard = enemy.gameboard.gameBoard;
    let playerBoard = player.gameboard.gameBoard;

    enemyBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.ship && cell.ship.destroyed) {
          cell.element.classList.add("destroyed");
          //hier deaktivieren um gegnerische schiffe unsichtbar zu machen
        } else if (cell.ship && !cell.hasBeenShot) {
          cell.element.classList.add("ship-on-cell");
        } else if (!cell.ship && cell.hasBeenShot) {
          cell.element.classList.add("cell-shot");
        } else if (cell.ship && cell.hasBeenShot) {
          cell.element.classList.add("ship-shot");
        }
      });
    });

    playerBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.ship && cell.ship.destroyed) {
          cell.element.classList.add("destroyed");
        } else if (cell.ship && !cell.hasBeenShot) {
          cell.element.classList.add("ship-on-cell");
        } else if (!cell.ship && cell.hasBeenShot) {
          cell.element.classList.add("cell-shot");
        } else if (cell.ship && cell.hasBeenShot) {
          cell.element.classList.add("ship-shot");
        }
      });
    });
  }

  showWinner(winner) {
    let winnerName = winner.name;
    let container = document.createElement("div");
    container.className = "winner-container";

    let winnerText = document.createElement("h1");
    winnerText.className = "winner-text";
    winnerText.textContent = `The Winner is ${winnerName} !`;

    let blurryBackground = document.createElement("div");
    blurryBackground.className = "blurry-div";

    let newGameBtn = document.createElement("button");
    newGameBtn.textContent = "NEW GAME";
    newGameBtn.className = "new-game-tbn";
    newGameBtn.addEventListener("click", () => {
      this.startNewGame();
    });

    let playAgainButton = document.createElement("button");
    playAgainButton.className = "play-again-btn";
    playAgainButton.textContent = "PLAY AGAIN";
    playAgainButton.addEventListener("click", () => {
      this.playAgain();
    });

    container.append(winnerText, newGameBtn, playAgainButton);

    this.container.appendChild(container);
    this.gameContainer.classList.add("blurr");
  }

  playAgain() {
    let winnerContainer = document.querySelector(".winner-container");
    if (winnerContainer) winnerContainer.remove();
    this.gameContainer.classList.remove("blurr");

    this.gameStart = false;
    this.clearBoards();
    this.initializeGame(this.player.name);
  }

  startNewGame() {
    let winnerContainer = document.querySelector(".winner-container");
    if (winnerContainer) winnerContainer.remove();
    this.gameContainer.classList.remove("blurr");
    this.gameStart = false;
    this.clearBoards();
    this.nameInput();
  }

  clearBoards() {
    let enemyBoard = document.querySelector(".enemy-gameboard");
    let playerBoard = document.querySelector(".player-gameboard");
    let titles = document.querySelectorAll(".activate");
    titles.forEach((div) => {
      div.classList.remove("activate");
    });

    enemyBoard.remove();
    playerBoard.remove();
  }
}

export default Dom;

// schiffe hovern beim platzieren
// Zähler für die Runden und gewinne
//schiffe unter dem board darstzellen und durchstreichen wenn ein schiff zerstört wurde
//beim schiffe setzen werdfen die schiffe unten im container aktiviert sozusagen, von grau auf farbe

// IWIE ZÄHLT DER COUNTER IMMER DOPPELT UND JEDES 2 SCHIFF KOMMT DRANN BEIM CLASS GRAY ENTFERNEN?
