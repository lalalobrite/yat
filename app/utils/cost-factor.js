function getConstant(factor) {
  switch(factor) {
    case 'micro1': return 10;
    case 'micro3': return 30;
    case 'micro5': return 500;
    case 'micro10': return 100;
    case 'micro15': return 150;
    case 'micro20': return 200;
    case 'micro25': return 250;
    case 'macro5': return 750;
    case 'macro10': return 1000;
    case 'macro15': return 1250;
    case 'macro20': return 1500;
    case 'macro25': return 1750;
  }
}

export default function costFactor(amount, factor) {
  return Math.sqrt(Math.abs(amount)) * getConstant(factor) * (amount < 0 ? -1 : 1);
}
