import Player from "./player.js";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

class Game {
  constructor(player, enemy, boardSize) {
    this.player = new Player(player, boardSize);
    this.enemy = new Player(enemy, boardSize);
    this.turn = null;
    this.gameOver = false;
  }

  enemyTurn() {
    this.enemy.attackRandom(this.player);
    console.log(this.player.gameboard.gameBoard);
  }

  createFleet() {
    const fleet = [
      new Ship("carrier", 5),
      new Ship("battleship", 4),
      new Ship("cruiser", 3),
      new Ship("submarine", 3),
      new Ship("destroyer", 2),
    ];

    return fleet;
  }
}

export default Game;
