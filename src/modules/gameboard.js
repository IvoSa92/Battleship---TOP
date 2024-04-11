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
    if (direction === "horizontal") {
      if (column + ship.length > this.size) {
        return false;
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.gameBoard[row][column + i].ship) {
          return false;
        }
      }

      for (let i = 0; i < ship.length; i++) {
        this.gameBoard[row][column + i].ship = ship;
        ship.position.push({ row: row, column: column + i, hit: false });
      }
    } else if (direction === "vertical") {
      if (row + ship.length > this.size) {
        return false;
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.gameBoard[row + i][column].ship) {
          return false;
        }
      }

      for (let i = 0; i < ship.length; i++) {
        this.gameBoard[row + i][column].ship = ship;
        ship.position.push({ row: row + i, column: column, hit: false });
      }
    }

    return true;
  }

  receiveAttack(column, row) {
    let cell = this.gameBoard[row][column];

    if (cell.hasBeenShot) {
      return "has been shot";
    }

    cell.hasBeenShot = true;

    if (cell.ship) {
      const index = cell.ship.position.findIndex(
        (pos) => pos.row === row && pos.column === column
      );
      cell.ship.hit(index);

      if (cell.ship.isSunk()) {
        return "hit and sunk";
      }
      return "hit";
    } else {
      return "nope";
    }
  }
}

export default Gameboard;
