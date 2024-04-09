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
    const playerGameboard = document.createElement("div");
    playerGameboard.className = "player-gameboard";
    let cellCounter = 0;

    for (let row = 0; row < player.gameboard.size; row++) {
      for (let col = 0; col < player.gameboard.size; col++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        let cellId = cellCounter.toString().padStart(2, "0");
        cell.setAttribute("id", `player-${cellId}`);
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
        let cellId = cellCounter.toString().padStart(2, "0");
        cell.setAttribute("id", `enemy-${cellId}`);
        enemyGameboard.appendChild(cell);
        cellCounter++;
      }
    }

    this.userBoard.appendChild(playerGameboard);
    this.enemyBoard.appendChild(enemyGameboard);
  }
}

export default Dom;
