export const addNumbers = (value1: number, value2: number) => {
  return value1 + value2;
};

export const getNumberCloseToZero = (value1: number, value2: number) => {
  const absoluteValue1 = Math.abs(value1);
  const absoluteValue2 = Math.abs(value2);

  if (absoluteValue1 === absoluteValue2) {
    return absoluteValue1 >= 0 ? absoluteValue1 : absoluteValue2;
  } else if (absoluteValue1 < absoluteValue2) {
    return value1;
  }

  return value2;
};

/*
export const getNumberCloseToZeroFromTheList = (...values:number[]) => {
  if (values.length == 1) {
    return values[0];
  }

  //if (values.length == 2) {
  //  return getNumberCloseToZero(values[0], values[1]);
  //}

};
*/
