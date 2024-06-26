import Ship from "./ship.js";
import Dom from "./dom.js";
import AudioPlayer from "./sfx.js";

class Gameboard {
  constructor(size) {
    this.size = size;
    this.gameBoard = [];
    this.buildBoard = this.buildBoard();
    this.gameOver = false;
    this.AudioPlayer = new AudioPlayer();
  }

  buildBoard() {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push({
          ship: false,
          hasBeenShot: false,
          element: null,
        });
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
      ship.start.push(ship.position[0]);
      ship.end.push(ship.position[ship.position.length - 1]);
      ship.direction = "Horizontal";
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
      ship.start.push(ship.position[0]);
      ship.end.push(ship.position[ship.position.length - 1]);
      ship.direction = "Vertical";
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

    if (cell.ship && !cell.ship.isSunk()) {
      this.AudioPlayer.playAttackHit();
      let rowNum = parseInt(row);
      let columnNum = parseInt(column);

      const index = cell.ship.position.findIndex(
        (pos) => pos.row === rowNum && pos.column === columnNum
      );

      cell.ship.hit(index);

      if (cell.ship.isSunk()) {
        this.AudioPlayer.shipSunkSound();
        return true;
      }
      return true;
    } else {
      this.AudioPlayer.waterSplashSound();
      return "nope";
    }
  }
}
export default Gameboard;
