const heightConversion = (val) => { 
  return `${Math.floor(val/12)}' ${val%12}"`; 
}

export default heightConversion;
