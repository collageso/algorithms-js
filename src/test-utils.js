export function randomNumberTestCases(numCases, { maxSize, maxValue }) {
  const testCases = [];

  for (let i = 0; i < numCases; i++) {
    const inputSize = Math.floor(Math.random() * (maxSize + 1));
    const getInput = () => Math.floor(Math.random() * (maxValue + 1));

    const inputs = Array.from({ length: inputSize }).map(() => getInput());
    testCases.push({ inputs });
  }

  return testCases;
}

export function generateRandomNumber(minNumber, maxNumber) {
  if (minNumber < 0 || maxNumber < 0) {
    return 0;
  }

  if (minNumber > maxNumber) {
    return 0;
  }

  return Math.floor(Math.random() * (maxNumber + 1)) + minNumber;
}
