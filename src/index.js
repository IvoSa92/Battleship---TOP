import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";
import Game from "./modules/game.js";
import Dom from "./modules/dom.js";

//const newGame = new Game("Ivo", "Miri", 10);
const dom = new Dom();

/*const player = newGame.player;
const enemy = newGame.enemy;

const playerFleet = newGame.playerFleet;

const enemyFleet = newGame.enemyFleet;*/

dom.gameBtn1Player.addEventListener("click", () => {
  dom.nameInput();
});
