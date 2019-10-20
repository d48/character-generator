const groupByAndSetValue = (objArray, property, initialValue) => {
  return objArray.reduce((acc, obj) => {
    var key = obj[property];
    acc[key] = initialValue;

    return acc;
  }, {});
};

const getRandomIndex = num => Math.floor(Math.random(num) * num);

export { groupByAndSetValue, getRandomIndex };
