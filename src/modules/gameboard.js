import Ship from "./ship.js";
import Dom from "./dom.js";

class Gameboard {
  constructor(size) {
    this.size = size;
    this.gameBoard = [];
    this.buildBoard = this.buildBoard();
    this.gameOver = false;
  }

  buildBoard() {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push({ ship: false, hasBeenShot: false, element: null });
      }
      this.gameBoard.push(row);
    }
  }

  placeShip(ship, row, column, direction) {
    if (direction === "Horizontal") {
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
    } else if (direction === "Vertical") {
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

  placeShipRandom(fleet) {
    let shipFleet = Array.from(fleet);
    shipFleet.forEach((ship) => {
      let placed = false;
      while (!placed) {
        let directions = ["Vertical", "Horizontal"];
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        let directionChoice = directions[Math.floor(Math.random() * 2)];
        placed = this.placeShip(ship, row, column, directionChoice);
      }
    });
  }

  receiveAttack(column, row) {
    let cell = this.gameBoard[row][column];

    if (cell.hasBeenShot) {
      return "has been shot";
    }

    cell.hasBeenShot = true;

    if (cell.ship) {
      let rowNum = parseInt(row);
      let columnNum = parseInt(column);

      const index = cell.ship.position.findIndex(
        (pos) => pos.row === rowNum && pos.column === columnNum
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
