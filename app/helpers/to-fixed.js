import { helper } from '@ember/component/helper';

export function weightMeasurement(params/*, hash*/) {
  return (params[0] / 1).toFixed(params[1] || 0);
}

export default helper(weightMeasurement);
