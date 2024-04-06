class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = [];
  }

  hit(index) {
    this.hits.push(index);
  }

  isSunk() {
    if (this.hits.length === this.length.length) {
      return true;
    }
    return false;
  }
}

export default Ship;
