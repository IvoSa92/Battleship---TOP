import Ship from "./ship.js";

class Gameboard {
  constructor(size) {
    this.size = size;
    this.gameBoard = [];
    this.buildBoard = this.buildBoard();
  }

  buildBoard() {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push({ ship: false, hasBeenShot: false });
      }
      this.gameBoard.push(row);
    }
  }

  placeShip(ship, row, column, direction) {
    if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.gameBoard[row][column + i].ship = true;
      }
    } else if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.gameBoard[row + i][column].ship = true;
      }
    }
  }
}

export default Gameboard;
