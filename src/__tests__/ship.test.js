import Ship from "../modules/ship.js";

let miri;

beforeEach(() => {
  miri = new Ship("miri", 4);
});

test("new ship has the length of 4", () => {
  expect(miri.length).toBe(4);
});

test("ship has the name miri", () => {
  expect(miri.name).toBe("miri");
});

test("hits should be 0", () => {
  expect(miri.hits.length).toBe(0);
});

test("miri gets hits counted", () => {
  miri.hit(0);
  expect(miri.hits.length).toBe(1);
});

test("miri gets multiple hits", () => {
  miri.hit(0);
  miri.hit(2);
  expect(miri.hits.length).toBe(2);
});

test("when miri gets 4 hits the ship is sunk", () => {
  miri.hit(0);
  miri.hit(2);
  miri.hit(6);
  miri.hit(1);
  expect(miri.isSunk()).toBe(true);
});
