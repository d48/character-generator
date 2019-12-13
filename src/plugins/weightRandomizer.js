const weightRandomizer = (min = 30, max = 500) => {
  let minRound = Math.ceil(min);
  let maxRound = Math.floor(max);
  let calc = Math.floor(Math.random() * (maxRound - minRound + 1)) + minRound;
  return calc;
};

export default weightRandomizer;
