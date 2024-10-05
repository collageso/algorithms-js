import {
  generateRandomNumber,
  randomNumberTestCases,
} from "../../../test-utils";
import { DynamicArray } from "../dynamic-array";

describe("DynamicArray", () => {
  const NUM_TEST_CASES = 5;
  const MAX_SIZE = 10;
  const MAX_VALUE = 100;

  const testCases = randomNumberTestCases(NUM_TEST_CASES, {
    maxSize: MAX_SIZE,
    maxValue: MAX_VALUE,
  });

  testCases.forEach(({ inputs }) => {
    let dynamicArray;
    let expectedSize;
    let expectedCapacity;

    beforeEach(() => {
      dynamicArray = new DynamicArray(...inputs);
      expectedSize = inputs.length;
      expectedCapacity = expectedSize > 0 ? expectedSize * 2 : 1;
    });

    describe("initialize", () => {
      it("should initialize with given elements", () => {
        expect(dynamicArray.getSize()).toBe(expectedSize);
        expect(dynamicArray.getCapacity()).toBe(expectedCapacity);

        inputs.forEach((value, index) => {
          expect(dynamicArray.getAt(index)).toBe(value);
        });
      });
    });

    describe("get and set", () => {
      it("should get the correct element by index", () => {
        inputs.forEach((value, index) => {
          expect(dynamicArray.getAt(index)).toBe(value);
        });
      });

      it("should set the element at the correct index", () => {
        inputs.forEach((value, index) => {
          dynamicArray.setAt(index, value * 2);
          expect(dynamicArray.getAt(index)).toBe(value * 2);
        });
      });

      it("should throw RangeError for out of range index", () => {
        expect(() => dynamicArray.getAt(inputs.length)).toThrow(RangeError);
        expect(() => dynamicArray.setAt(inputs.length, 1)).toThrow(RangeError);
      });
    });

    describe("find", () => {
      it("should return the index of found element", () => {
        const target = inputs[generateRandomNumber(inputs.length - 1)];
        const targetIndex = inputs.indexOf(target);
        expect(dynamicArray.find(target)).toBe(targetIndex);
      });

      it("should return the -1 when no element found", () => {
        const target = MAX_VALUE + 1;
        expect(dynamicArray.find(target)).toBe(-1);
      });
    });

    describe("insert", () => {
      it("should insert an element to a given index", () => {
        const target = MAX_VALUE + 1;
        const targetIndex = generateRandomNumber(0, inputs.length);
        dynamicArray.insert(targetIndex, target);
        expect(dynamicArray.getAt(targetIndex)).toBe(target);
        expect(dynamicArray.getSize()).toBe(expectedSize + 1);
      });

      it("should throw RangeError for out of range index", () => {
        expect(() => dynamicArray.insert(inputs.length + 1, 1)).toThrow(
          RangeError,
        );
      });
    });

    describe("remove", () => {
      it("should remove an element at a given index", () => {
        const target = MAX_VALUE + 1;
        const targetIndex = generateRandomNumber(0, expectedSize - 1);
        if (expectedSize > 0) {
          dynamicArray.setAt(targetIndex, target);
          dynamicArray.remove(targetIndex);
          expect(dynamicArray.find(target)).toBe(-1);
          expect(dynamicArray.getSize()).toBe(expectedSize - 1);
        }
      });
    });
  });
});
