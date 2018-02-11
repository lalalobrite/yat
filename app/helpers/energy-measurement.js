import { helper } from '@ember/component/helper';

export function weightMeasurement(params/*, hash*/) {
  const abs = Math.abs(params);
  if (abs < 1000) {
    return `${(params / 1).toFixed(0)}ncal`;
  } else if (abs < 1000000){
    return `${(params / 1000).toFixed(2)}μcal`;
  } else if (abs < 10000000){
    return `${(params / 1000000).toFixed(2)}mcal`;
  } else if (abs < 100000000){
    return `${(params / 10000000).toFixed(2)}ccal`;
  } else if (abs < 100000000000){
    return `${(params / 100000000).toFixed(2)}cal`;
  } else {
    return `${(params / 100000000000).toFixed(2)}kcal`;
  }
}

export default helper(weightMeasurement);
