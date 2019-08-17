function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum and the minimum are inclusive 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function sum(listOfNums) {
  const result = listOfNums.reduce((a, b) => a + b, 0);
  return result;
}

export { getRandomIntInclusive, sum };