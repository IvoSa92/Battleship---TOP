import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

class Player {
  constructor(name, boardSize) {
    this.name = name;
    this.gameboard = new Gameboard(boardSize);
  }

  attack(enemy, row, column) {
    return enemy.gameboard.receiveAttack(row, column);
  }

  attackRandom(enemy) {
    let row = this.generateRandomNumber();
    let column = this.generateRandomNumber();

    while (enemy.gameboard[row][column].hasBeenShot) {
      row = this.generateRandomNumber();
      column = this.generateRandomNumber();
    }

    enemy.gameboard.receiveAttack(column, row);
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
