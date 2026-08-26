class ItemCounter {
  constructor() {
    this.count = 0;
  }

  add() {
    this.count = this.count + 1;
    return this.count;
  }

  remove() {
    if (this.count > 0) {
      this.count = this.count - 1;
    }
    return this.count;
  }

  reset() {
    this.count = 0;
    return this.count;
  }

  getCount() {
    return this.count;
  }
}

