const isPositiveNumber = (number) => !isNaN(number) && number >= 0;

export const getRandomInt = (rangeStart = 0, rangeEnd = 0) => {
  if (!isPositiveNumber(rangeStart) || !isPositiveNumber(rangeEnd)) {
    return 0;
  }

  if (rangeEnd <= rangeStart) {
    return rangeStart;
  }

  return Number(rangeStart) + Math.round(Math.random() * (rangeEnd - rangeStart));
};

export const getRandomFloat = (rangeStart = 0, rangeEnd = 0, digitsAfterPoint = 2) => {
  if(!isPositiveNumber(rangeStart) || !isPositiveNumber(rangeEnd) || !isPositiveNumber(digitsAfterPoint)) {
    return 0;
  }

  if(rangeEnd <= rangeStart) {
    return rangeStart;
  }

  return (+rangeStart + Math.random() * (rangeEnd - rangeStart)).toFixed(digitsAfterPoint);
};

export const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

export const getFixedLengthArrayOfRandomElements = (array, elementsNumber) => {
  const randomElements = [];

  while(randomElements.length < elementsNumber) {
    const randomElement = getRandomElement(array);

    if (!randomElements.includes(randomElement)) {
      randomElements.push(randomElement);
    }
  }
  return randomElements;
};
