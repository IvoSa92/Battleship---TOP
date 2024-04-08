import Gameboard from "./gameboard.js";

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

    enemy.gameboard.receiveAttack(column, row);
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}

export default Player;
