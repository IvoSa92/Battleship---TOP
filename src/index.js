import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";

const board = new Gameboard(5);

const ship = new Ship("destroyer", 3);
board.placeShip(ship, 0, 0, "vertical");

ship.hit(0);
ship.hit(1);
ship.hit(2);
console.log(board.gameBoard);
