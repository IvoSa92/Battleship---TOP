import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";
import Game from "./modules/game.js";
import Dom from "./modules/dom.js";

const newGame = new Game("Ivo", "Miri", 10);
const dom = new Dom(newGame);

const player = newGame.player;
const enemy = newGame.enemy;

const playerFleet = newGame.playerFleet;

const enemyFleet = newGame.enemyFleet;

dom.gameBtn1Player.addEventListener("click", () => {
  dom.renderBoard(player, enemy);
  enemy.gameboard.placeShipRandom(enemyFleet);
  dom.eventListenerForShipPlacing(playerFleet, player, enemy);
  dom.gameBtn1Player.remove();
  dom.gameBtn2Player.remove();
});
