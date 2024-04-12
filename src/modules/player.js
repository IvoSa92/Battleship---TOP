import Gameboard from "./gameboard.js";
import Game from "./game.js";

class Player {
  constructor(name, boardSize) {
    this.name = name;
    this.gameboard = new Gameboard(boardSize);
  }

  attack(enemy, row, column) {
    return enemy.gameboard.receiveAttack(row, column);
  }

  attackRandom(enemy) {
    let enemyGameboard = enemy.gameboard.gameBoard;
    let row = this.generateRandomNumber();
    let column = this.generateRandomNumber();

    while (enemyGameboard[row][column].hasBeenShot) {
      row = this.generateRandomNumber();
      column = this.generateRandomNumber();
    }

    //let cellShot = document.getElementById(`${row}${column}`);
    //cellShot.classList.add("cell-shot");
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}

export default Player;
