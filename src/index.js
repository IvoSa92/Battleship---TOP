import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";
import Game from "./modules/game.js";
import Dom from "./modules/dom.js";

const newGame = new Game("ivo", "miri", 10);
const dom = new Dom();

const player = newGame.player;
const enemy = newGame.enemy;
console.log(player.gameboard.gameBoard);
dom.renderBoard(player, enemy);
