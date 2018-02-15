function getConstant(factor) {
  switch(factor) {
    case 'micro1': return 10;
    case 'micro3': return 30;
    case 'micro5': return 5;
    case 'micro10': return 10;
    case 'micro15': return 30;
    case 'micro20': return 50;
    case 'micro25': return 70;
    case 'macro5': return 100;
    case 'macro10': return 200;
    case 'macro15': return 300;
    case 'macro20': return 400;
    case 'macro25': return 500;
  }
}

export default function costFactor(amount, factor) {
  return Math.sqrt(Math.abs(amount)) * getConstant(factor) * (amount < 0 ? -1 : 1);
}
