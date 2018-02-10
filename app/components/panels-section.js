import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  classNames: ['panels'],

  actions: {
    createResource(resource, costs, amount) {
      if (resource.max && amount + resource.amount >= resource.max.amount) amount = resource.max.amount - resource.amount;

      costs.forEach((cost) => {
        if (cost.amount * amount > cost.source.amount) {
          amount = Math.floor(cost.source.amount / cost.amount)
        }
      });

      costs.forEach((cost) => {
        set(cost.source, 'amount', cost.source.amount - (amount * cost.amount));
      });

      if (resource.multiplier) amount *= resource.multiplier.amount;

      set(resource, 'amount', resource.amount + amount);
    }
  }
});
