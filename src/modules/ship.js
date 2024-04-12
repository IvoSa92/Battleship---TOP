class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.position = [];
    this.destroyed = false;
  }

  hit(index) {
    if (index >= 0 && index < this.length) {
      this.position[index].hit = true;
    }
    this.isSunk();
  }

  isSunk() {
    if (this.position.every((cell) => cell.hit)) {
      this.destroyed = true;
      return true;
    }
    return false;
  }
}
export default Ship;
