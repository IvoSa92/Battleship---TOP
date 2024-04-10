import Player from "./player.js";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

class Game {
  constructor(player, enemy, boardSize) {
    this.player = new Player(player, boardSize);
    this.enemy = new Player(enemy, boardSize);
    this.turn = false;
    this.gameOver = false;
  }

  startGame() {
    this.turn = true;
  }
}

export default Game;
