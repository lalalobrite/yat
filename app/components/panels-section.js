import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  classNames: ['panels'],

  actions: {
    createResource(resource, costs, amount) {
      costs.forEach((cost) => {
        if (cost.amount * amount > cost.source.amount) {
          amount = Math.floor(cost.source.amount / cost.amount)
        }
      });

      costs.forEach((cost) => {
        set(cost.source, 'amount', cost.source.amount - (amount * cost.amount));
      });

      set(resource, 'amount', resource.amount + (amount * resource.multiplier));
    }
  }
});
