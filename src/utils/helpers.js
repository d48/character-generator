const groupByAndSetValue = (objArray, property, initialValue) => {
  return objArray.reduce((acc, obj) => {
    var key = obj[property];
    acc[key] = initialValue;

    return acc;
  }, {});
};

export { groupByAndSetValue };