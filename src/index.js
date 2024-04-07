import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";

const board = new Gameboard(5);

const ship = new Ship("destroyer", 3);
board.placeShip(ship, 0, 0, "horizontal");

board.receiveAttack(0, 0);
board.receiveAttack(1, 0);

console.log(board.gameBoard[0]);
console.log(board.gameBoard[0][0].ship.isSunk());
console.log(board.gameBoard[0][0].ship.isSunk());
