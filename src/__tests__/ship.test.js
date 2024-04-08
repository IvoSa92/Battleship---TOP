import Ship from "../modules/ship.js";
import Gameboard from "../modules/gameboard.js";

let board;

let miri;

beforeEach(() => {
  miri = new Ship("miri", 4);
  board = new Gameboard(10);
  board.placeShip(miri, 0, 0, "horizontal");
});

afterEach(() => {
  miri = null;
  board = null;
});

test("new ship has the length of 4", () => {
  expect(miri.length).toBe(4);
});

test("ship has the name miri", () => {
  expect(miri.name).toBe("miri");
});

test("hits should be 0", () => {
  miri.position.forEach((pos) => {
    expect(pos.hit).toBe(false);
  });
});

test("miri gets hits counted", () => {
  miri.hit(0);
  expect(miri.position[0].hit).toBe(true);
});

test("miri gets multiple hits", () => {
  miri.hit(0);
  miri.hit(1);
  expect(miri.position[0].hit).toBe(true);
  expect(miri.position[1].hit).toBe(true);
});

test("when miri gets 4 hits the ship is sunk", () => {
  miri.hit(0, 0);
  miri.hit(1);
  miri.hit(2);
  miri.hit(3);
  expect(miri.isSunk()).toBe(true);
});
