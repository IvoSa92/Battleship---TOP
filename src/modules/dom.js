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
    player.gameboard.gameBoard.forEach((element) => {
      element.forEach((element) => {
        let cell = document.createElement("div");
        cell.className = "cell";
        playerGameboard.appendChild(cell);
      });
    });

    const enemyGameboard = document.createElement("div");
    enemyGameboard.className = "enemy-gameboard";
    enemy.gameboard.gameBoard.forEach((element) => {
      element.forEach((element) => {
        let cell = document.createElement("div");
        cell.className = "cell";
        enemyGameboard.appendChild(cell);
      });
    });
    this.userBoard.appendChild(playerGameboard);
    this.enemyBoard.appendChild(enemyGameboard);
  }
}

export default Dom;
