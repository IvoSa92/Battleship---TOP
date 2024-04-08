import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";

const board = new Gameboard(5);

const miri = new Ship("miri", 4);
board.placeShip(miri, 0, 0, "horizontal");

//console.log(board.gameBoard);
console.log(miri);
