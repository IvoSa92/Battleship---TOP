import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";

const board = new Gameboard(5);

const ship = new Ship("destroyer", 3);
board.placeShip(ship, 0, 0, "vertical");

board.receiveAttack(0, 0);
