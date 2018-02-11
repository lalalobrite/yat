import { helper } from '@ember/component/helper';

export function weightMeasurement(params/*, hash*/) {
  if (params < 1000) {
    return `${(params / 1).toFixed(0)}ng`;
  } else if (params < 1000000){
    return `${(params / 1000).toFixed(2)}μg`;
  } else if (params < 10000000){
    return `${(params / 1000000).toFixed(2)}mg`;
  } else if (params < 100000000){
    return `${(params / 10000000).toFixed(2)}cg`;
  } else if (params < 100000000000){
    return `${(params / 100000000).toFixed(2)}g`;
  } else {
    return `${(params / 100000000000).toFixed(2)}kg`;
  }
}

export default helper(weightMeasurement);
