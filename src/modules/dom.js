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
  renderBoard(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    const boardTitle = document.querySelectorAll(".board-title");
    boardTitle.forEach((title) => {
      title.style.display = "flex";
    });

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
        cellCounter++;
      }
    }

    const enemyGameboard = document.createElement("div");
    enemyGameboard.className = "enemy-gameboard";
    cellCounter = 0;

    for (let row = 0; row < enemy.gameboard.size; row++) {
      for (let col = 0; col < enemy.gameboard.size; col++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        /* cell.addEventListener("click", (event) => {
          cell.classList.add("cell-shot");
          let column = event.target.id[1];
          let row = event.target.id[0];
          player.attack(enemy, row, column);
          return enemy.attackRandom(player);
          //console.log(enemy.gameboard.gameBoard);
        });*/
        let cellId = cellCounter.toString().padStart(2, "0");
        cell.setAttribute("id", cellId);
        enemyGameboard.appendChild(cell);
        cellCounter++;
      }
    }

    this.userBoard.appendChild(playerGameboard);
    this.enemyBoard.appendChild(enemyGameboard);
  }

  eventListenerForShipPlacing(fleet, player, enemy) {
    let board = document.querySelector(".user-board");
    let cells = board.querySelectorAll(".cell");
    let counter = 0;
    let shipFleet = fleet;
    cells.forEach((cell) => {
      cell.addEventListener("click", (event) => {
        let row = parseInt(event.target.id[0]);
        let column = parseInt(event.target.id[1]);
        if (counter === 5) {
          cell.removeEventListener;
          this.eventListenerForPlaying(player, enemy);
        } else {
          this.player.gameboard.placeShip(
            shipFleet[counter],
            row,
            column,
            "horizontal"
          );
          counter++;
          console.log(this.player.gameboard.gameBoard);
        }
      });
    });
  }

  eventListenerForPlaying(player, enemy) {
    let board = document.querySelector(".enemy-board");
    let cells = board.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", (event) => {
        cell.classList.add("cell-shot");
        let column = event.target.id[1];
        let row = event.target.id[0];
        player.attack(enemy, row, column);
        return enemy.attackRandom(player);
      });
    });
  }
}

export default Dom;
