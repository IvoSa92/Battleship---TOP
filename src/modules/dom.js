import Player from "./player.js";
import Gameboard from "./gameboard.js ";
import Game from "./game.js";
import Ship from "./ship.js";

class Dom {
  constructor() {
    this.container = document.querySelector(".container");
    this.gameBtn1Player = document.querySelector(".start-game-1player");
    this.gameBtn2Player = document.querySelector(".start-game-2player");
    this.userBoard = document.querySelector(".user-board");
    this.enemyBoard = document.querySelector(".enemy-board");
  }

  //render the boards
  renderBoard(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    const boardTitle = document.querySelectorAll(".board-title");
    boardTitle.forEach((title) => {
      title.style.display = "flex";
    });

    //render player board
    const playerGameboard = document.createElement("div");
    playerGameboard.className = "player-gameboard";
    let cellCounter = 0;

    for (let row = 0; row < player.gameboard.size; row++) {
      for (let col = 0; col < player.gameboard.size; col++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        let cellId = cellCounter.toString().padStart(2, "0");
        cell.setAttribute("id", cellId);
        playerGameboard.appendChild(cell);
        player.gameboard.gameBoard[row][col].element = cell;
        cellCounter++;
      }
    }
    // render enemy board
    const enemyGameboard = document.createElement("div");
    enemyGameboard.className = "enemy-gameboard";
    cellCounter = 0;

    for (let row = 0; row < enemy.gameboard.size; row++) {
      for (let col = 0; col < enemy.gameboard.size; col++) {
        let cell = document.createElement("div");
        cell.className = "cell";
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

    shipDirectionDiv.appendChild(shipDirectionBtn);

    // add elements to the dom
    this.userBoard.appendChild(playerGameboard);
    this.userBoard.appendChild(shipDirectionDiv);
    this.enemyBoard.appendChild(enemyGameboard);
  }

  //event listener for the ship placement
  eventListenerForShipPlacing(fleet, player, enemy) {
    let board = document.querySelector(".user-board");
    let cells = board.querySelectorAll(".cell");
    let counter = 0;
    let shipFleet = fleet;
    let shipDirection = document.querySelector(".ship-direction");

    //event listener for changing the ship direction button
    shipDirection.addEventListener("click", () => {
      shipDirection.textContent =
        shipDirection.textContent === "Vertical" ? "Horizontal" : "Vertical";
    });

    const shipPlacingHandler = (event) => {
      if (counter >= shipFleet.length) {
        cells.forEach((cell) =>
          cell.removeEventListener("click", shipPlacingHandler)
        );
        this.eventListenerForPlaying(player, enemy);
      } else {
        let row = parseInt(event.target.id[0]);
        let column = parseInt(event.target.id[1]);
        let direction = shipDirection.textContent;
        console.log(direction);
        let placementSuccessful = this.player.gameboard.placeShip(
          shipFleet[counter],
          row,
          column,
          direction
        );

        if (placementSuccessful) {
          this.updateUi(enemy, player);
          counter++;
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

      player.attack(enemy, row, column);
      this.updateUi(enemy, player);

      enemy.attackRandom(player);
      this.updateUi(enemy, player);

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
}

export default Dom;

// checken ob game over ist
