import Gameboard from "../modules/gameboard.js";
import Ship from "../modules/ship.js";

let board;

beforeEach(() => {
  board = new Gameboard(10);
});

test("board size is 10", () => {
  expect(board.size).toBe(10);
});

test("every cell has the property ship=false", () => {
  for (let i = 0; i < board.gameBoard.length; i++) {
    board.gameBoard[i].forEach((cell) => {
      expect(cell.ship).toBe(false);
    });
  }
});

test("every cell has the property hasBeenShot=false", () => {
  for (let i = 0; i < board.gameBoard.length; i++) {
    board.gameBoard[i].forEach((cell) => {
      expect(cell.hasBeenShot).toBe(false);
    });
  }
});

test("gameboard has 100 cells", () => {
  let count = 0;
  for (let i = 0; i < board.gameBoard.length; i++) {
    board.gameBoard[i].forEach((cell) => {
      count++;
    });
  }
  expect(count).toBe(100);
});

test("ship placing horizontal", () => {
  const ship = new Ship("ivo", 4);
  board.placeShip(ship, 0, 0, "horizontal");

  for (let i = 0; i < ship.length; i++) {
    expect(board.gameBoard[0][i].ship).toBe(ship);
  }
});

test("ship placing vertical", () => {
  const ship = new Ship("ivo", 4);
  board.placeShip(ship, 0, 0, "vertical");

  for (let i = 0; i < ship.length; i++) {
    expect(board.gameBoard[i][0].ship).toBe(ship);
  }
});

test("when received a shot the cell gets hasBeenShot=true", () => {
  board.receiveAttack(0, 0);
  expect(board.gameBoard[0][0].hasBeenShot).toBe(true);
});
