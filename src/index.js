import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";
import Game from "./modules/game.js";
import Dom from "./modules/dom.js";

const newGame = new Game("stefan", "miri", 10);
const dom = new Dom();

const player = newGame.player;
const enemy = newGame.enemy;

const playerFleet = newGame.createFleet();

const enemyFleet = newGame.createFleet();

dom.gameBtn1Player.addEventListener("click", () => {
  dom.renderBoard(player, enemy);

  enemy.gameboard.placeShipRandom(enemyFleet);
  dom.eventListenerForShipPlacing(playerFleet, player, enemy);
  dom.gameBtn1Player.remove();
  dom.gameBtn2Player.remove();
});
