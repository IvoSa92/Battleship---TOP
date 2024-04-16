import Player from "./player.js";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

class Game {
  constructor(player, enemy, boardSize) {
    this.player = new Player(player, boardSize);
    this.enemy = new Player(enemy, boardSize);
    this.enemyFleet = this.createFleetEnemyFleet();
    this.playerFleet = this.createFleetPlayerFleet();
  }

  createFleetPlayerFleet() {
    const fleet = [
      new Ship("carrier", 5),
      /*new Ship("battleship", 4),
      new Ship("cruiser", 3),
      new Ship("submarine", 3),
      new Ship("destroyer", 2),*/
    ];

    return fleet;
  }

  createFleetEnemyFleet() {
    const fleet = [
      new Ship("carrier", 5),
      /*new Ship("battleship", 4),
      new Ship("cruiser", 3),
      new Ship("submarine", 3),
      new Ship("destroyer", 2),*/
    ];

    return fleet;
  }

  checkGameOver() {
    if (this.enemyFleet.every((ship) => ship.destroyed)) {
      return "enemyGameOver";
    } else if (this.playerFleet.every((ship) => ship.destroyed)) {
      return "playerGameOver";
    }
  }
}

export default Game;
