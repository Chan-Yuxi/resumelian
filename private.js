class MySet {
  constructor(arr) {
    if (arr && Array.isArray(arr)) {
      const m = new Map();
      arr.forEach((item) => m.set(item, true));
      this.arr = Array.from(m.keys());
    } else {
      this.arr = [];
    }
  }

  has(item) {
    return this.arr.includes(item);
  }

  add(item) {
    if (!this.arr.includes(item)) {
      this.arr.push(item);
    }
  }

  clear() {
    this.arr = [];
  }

  delete(item) {
    const index = this.arr.findIndex(item);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }
}
