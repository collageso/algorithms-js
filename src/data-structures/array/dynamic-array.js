/**
 * @class DynamicArray
 * @classdesc A class that implements a dynamic array.
 *
 * @constructor
 * @param {...*} [elements] - Optional elements to populate the dynamic array.
 */
export class DynamicArray {
  #data;
  #size;
  #capacity;

  constructor(...args) {
    this.#data = args;
    this.#size = args.length;
    this.#capacity = Math.max(this.#size * 2, 1);
  }

  /**
   * Resize the array to a new capacity.
   *
   * @param {number} newCapacity - The new capacity for the array.
   * @complexity
   * - Best: O(1)
   * - Worst: O(n)
   * - Average: O(n)
   */
  #resize(newCapacity) {
    const newData = new Array(newCapacity);

    this.#data.forEach((value, index) => {
      newData[index] = value;
    });

    this.#data = newData;
    this.#capacity = newCapacity;
  }

  /**
   * Get the size of the array.
   *
   * @returns {number} The size of the array.
   * @complexity
   * - Best: O(1)
   * - Worst: O(1)
   * - Average: O(1)
   */
  getSize() {
    return this.#size;
  }

  /**
   * Get the capacity of the array.
   *
   * @returns {number} The capacity of the array.
   * @complexity
   * - Best: O(1)
   * - Worst: O(1)
   * - Average: O(1)
   */
  getCapacity() {
    return this.#capacity;
  }

  /**
   * Access an element at a specific index.
   *
   * @param {number} index - The index of the element to access.
   * @returns {*} The element at the specified index.
   * @throws {RangeError} Throws an error if the index is out of range.
   * @complexity
   * - Best: O(1)
   * - Worst: O(1)
   * - Average: O(1)
   */
  getAt(index) {
    if (index >= this.#size) {
      throw new RangeError("Index out of range");
    }

    return this.#data[index];
  }

  /**
   * Set the element at a specific index.
   *
   * @param {number} index - The index of the element to set.
   * @param {*} value - The value to set.
   * @throws {RangeError} Throws an error if the index is out of range.
   * @complexity
   * - Best: O(1)
   * - Worst: O(1)
   * - Average: O(1)
   */
  setAt(index, value) {
    if (index >= this.#size) {
      throw new RangeError("Index out of range");
    }

    this.#data[index] = value;
  }

  /**
   * Find an element in the array.
   *
   * @param {*} value - The value to find.
   * @returns {number} The index of the found element, or -1 if not found.
   * @complexity
   * - Best: O(1) (if the value is at the first index)
   * - Worst: O(n) (if the value is at the last index or not present)
   * - Average: O(n)
   */
  find(value) {
    for (let i = 0; i < this.#size; i++) {
      if (value === this.#data[i]) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Insert an element at a specific index.
   *
   * @param {number} index - The index to insert at.
   * @param {*} value - The value to insert.
   * @throws {RangeError} Throws an error if the index is out of range.
   * @complexity
   * - Best: O(1) (if inserting at the end)
   * - Worst: O(n) (when shifting elements)
   * - Average: O(n)
   */
  insert(index, value) {
    if (index > this.#size) {
      throw new RangeError("Index out of range");
    }

    if (this.#size >= this.#capacity) {
      this.#resize(this.#capacity * 2);
    }

    for (let i = this.#size; i > index; i--) {
      this.#data[i] = this.#data[i - 1];
    }

    this.#data[index] = value;
    this.#size++;
  }

  /**
   * Remove an element at a specific index.
   *
   * @param {number} index - The index to remove.
   * @throws {RangeError} Throws an error if the index is out of range.
   * @complexity
   * - Best: O(1) (if removing the last element)
   * - Worst: O(n) (when shifting elements)
   * - Average: O(n)
   */
  remove(index) {
    if (index >= this.#size) {
      throw new RangeError("Index out of range");
    }

    for (let i = index; i < this.#size - 1; i++) {
      this.#data[i] = this.#data[i + 1];
    }

    this.#data[this.#size - 1] = undefined;
    this.#size--;
  }

  /**
   * Begin iterator.
   *
   * @returns {Iterator<*>}
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.#size; i++) {
      yield this.#data[i];
    }
  }
}
