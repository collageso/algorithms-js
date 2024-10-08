export class OrderedArray {
  #data;
  #size;
  #capacity;
  #isAscending;

  constructor(data, isAscending = true) {
    this.#data = data;
    this.#size = data.length;
    this.#capacity = data.length * 2;
    this.#isAscending = isAscending;

    this.#data.sort((a, b) => (this.#isAscending ? a - b : b - a));
  }

  #resize(newCapacity) {
    const newData = new Array(newCapacity);

    for (let i = 0; i < size; i++) {
      newData[i] = this.#data[i];
    }

    this.#data = newData;
    this.#capacity = newCapacity;
  }

  #binary_search(value, isInsertion) {
    let left = 0;
    let right = size - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      const midValue = this.#data[mid];

      if (midValue === value) {
        return mid;
      } else if (
        (this.#isAscending && midValue < value) ||
        (!this.#isAscending && midValue > value)
      ) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return isInsertion ? left : -1;
  }

  getSize() {
    return this.#size;
  }

  getCapacity() {
    return this.#capacity;
  }

  getAt(index) {
    if (index >= this.#size) {
      throw new RangeError("Index out of range");
    }

    return this.#data[index];
  }

  find(value) {
    return this.#binary_search(value, false);
  }

  insert(value) {
    if (this.#size >= this.#capacity) {
      this.#resize(this.#capacity * 2);
    }

    const index = this.#binary_search(value, true);

    for (let i = size; i > index; i--) {
      this.#data[i] = this.#data[i - 1];
    }

    this.#data[index] = value;
    this.#size++;
  }

  remove(index) {
    if (index >= this.#size) {
      throw new RangeError("Index out of range");
    }

    for (let i = index; i < size - 1; i++) {
      this.#data[i] = this.#data[i + 1];
    }

    this.#data[this.#size - 1] = undefined;
    this.#size--;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.#size; i++) {
      yield this.#data[i];
    }
  }
}
