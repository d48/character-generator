// Get array of objects and specific property to set initial value to
const groupByAndSetValue = (objArray, property, initialValue) => {
  return objArray.reduce((acc, obj) => {
    var key = obj[property];
    acc[key] = initialValue;

    return acc;
  }, {});
};

// return random index from 0 to num
const getRandomIndex = (num) => Math.floor(Math.random(num) * num);

export { groupByAndSetValue, getRandomIndex };
