import Component from '@ember/component';

export default Component.extend({
  classNames: ['panels'],

  actions: {
    createResource(resource, costs, amount) {
      if (resource.max && amount + resource.get('amount') >= resource.get('max.amount')) amount = resource.get('max.amount') - resource.get('amount');

      costs.forEach((cost) => {
        if (cost.amount * amount > cost.source.get('amount')) {
          amount = Math.floor(cost.source.get('amount') / cost.amount)
        }
      });

      costs.forEach((cost) => {
        cost.source.decrementProperty('amount', amount * cost.amount);
      });

      amount *= resource.get('multiplier.amount') || 1;

      resource.incrementProperty('amount', amount);
    }
  }
});
