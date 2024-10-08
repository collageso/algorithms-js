/**
 * OrderedArray
 *
 * This class provides functionality to manage an ordered array.
 *
 * Differences from a regular array:
 * - Maintains a sorted order (ascending or descending).
 * - Supports binary search for efficient searching.
 * - Inserting involves finding position and shifting elements.
 */
export class OrderedArray {
  #data;
  #size;
  #capacity;
  #isAscending;

  /**
   * @constructor
   * @param {Array} data - Initial array of elements.
   * @param {boolean} isAscending - Determines the order (default is true).
   */
  constructor(data, isAscending = true) {
    this.#data = data;
    this.#size = data.length;
    this.#capacity = data.length * 2;
    this.#isAscending = isAscending;
  }

  /**
   * Resize the array to a new capacity.
   * @private
   * @param {number} newCapacity - The new capacity of the array.
   * @complexity
   * Worst: O(n)
   * Average: O(n)
   * Best: O(n)
   */
  #resize(newCapacity) {
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.#size; i++) {
      newData[i] = this.#data[i];
    }
    this.#data = newData;
    this.#capacity = newCapacity;
  }

  /**
   * Perform binary search to find the appropriate index for insertion.
   * @private
   * @param {any} value - The value to search for.
   * @param {boolean} isInsertion - Whether to find the insertion index.
   * @returns {number} - The index of the found element or the insertion index.
   * @complexity
   * Worst: O(log n)
   * Average: O(log n)
   * Best: O(log n)
   */
  #binary_search(value, isInsertion) {
    let left = 0;
    let right = this.#size - 1;

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

  /**
   * Get the current size of the array.
   * @returns {number} - The size of the array.
   * @complexity
   * Worst: O(1)
   * Average: O(1)
   * Best: O(1)
   */
  getSize() {
    return this.#size;
  }

  /**
   * Get the current capacity of the array.
   * @returns {number} - The capacity of the array.
   * @complexity
   * Worst: O(1)
   * Average: O(1)
   * Best: O(1)
   */
  getCapacity() {
    return this.#capacity;
  }

  /**
   * Access an element at a specific index.
   * @param {number} index - The index to access.
   * @returns {any} - The element at the specified index.
   * @throws {RangeError} - If the index is out of range.
   * @complexity
   * Worst: O(1)
   * Average: O(1)
   * Best: O(1)
   */
  getAt(index) {
    if (index >= this.#size) {
      throw new RangeError("Index out of range");
    }
    return this.#data[index];
  }

  /**
   * Perform binary search on the ordered array.
   * @param {any} value - The value to search for.
   * @returns {number} - The index of the found element or -1 if not found.
   * @complexity
   * Worst: O(log n)
   * Average: O(log n)
   * Best: O(log n)
   */
  find(value) {
    return this.#binary_search(value, false);
  }

  /**
   * Insert an element while maintaining order using binary search.
   * @param {any} value - The value to insert.
   * @complexity
   * Worst: O(n)
   * Average: O(n)
   * Best: O(1) (if inserting at the end)
   */
  insert(value) {
    if (this.#size >= this.#capacity) {
      this.#resize(this.#capacity * 2);
    }

    const index = this.#binary_search(value, true);

    for (let i = this.#size; i > index; i--) {
      this.#data[i] = this.#data[i - 1];
    }

    this.#data[index] = value;
    this.#size++;
  }

  /**
   * Remove an element at a specific index.
   * @param {number} index - The index of the element to remove.
   * @throws {RangeError} - If the index is out of range.
   * @complexity
   * Worst: O(n)
   * Average: O(n)
   * Best: O(1) (if removing the last element)
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
   * Get an iterator for the start of the array.
   * @returns {Iterator} - An iterator for the array.
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.#size; i++) {
      yield this.#data[i];
    }
  }
}
