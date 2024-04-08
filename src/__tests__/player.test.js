import exp from "constants";
import Player from "../modules/player.js";

let ivo;
let ivoGameboard;
let enemy;
let enemyGameboard;

beforeEach(() => {
  ivo = new Player("ivo", 10);
  ivoGameboard = ivo.gameboard.gameBoard;
  enemy = new Player("enemy", 10);
  enemyGameboard = enemy.gameboard.gameBoard;
});

test("player has the right name", () => {
  expect(ivo.name).toBe("ivo");
});

test("attack on enemy board", () => {
  ivo.attack(enemy, 0, 0);
  expect(enemyGameboard[0][0].hasBeenShot).toBe(true);
});

test("attack on my board", () => {
  enemy.attack(ivo, 0, 0);
  expect(ivoGameboard[0][0].hasBeenShot).toBe(true);
});

test("random attack", () => {
  enemy.attackRandom(ivo);
  let hasTrue = ivoGameboard.some((row) =>
    row.some((cell) => cell.hasBeenShot)
  );
  expect(hasTrue).toBe(true);
});

test("generate random number", () => {
  let isTrue;
  let number = ivo.generateRandomNumber();
  if (number <= 9 && number >= 0) {
    isTrue = true;
  }

  expect(isTrue).toBe(true);
});
