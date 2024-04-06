class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.position = [];
  }

  hit(index) {
    if (index >= 0 && index < this.length) {
      this.position[index].hit = true;
    }
  }

  isSunk() {
    if (this.position.every((cell) => cell.hit)) {
      return true;
    }
  }
}
export default Ship;
