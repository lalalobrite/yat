function getConstant(factor) {
  switch(factor) {
    case 'micro1': return 10;
    case 'micro3': return 30;
    case 'micro5': return 500;
    case 'micro10': return 1000;
    case 'micro15': return 1500;
    case 'micro20': return 2000;
    case 'micro25': return 2500;
    case 'macro5': return 750000;
    case 'macro10': return 1000000;
    case 'macro15': return 1250000;
    case 'macro20': return 1500000;
    case 'macro25': return 1750000;
  }
}

export default function costFactor(amount, factor) {
  return Math.sqrt(Math.abs(amount)) * getConstant(factor) * (amount < 0 ? -1 : 1);
}
