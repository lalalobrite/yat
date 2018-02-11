import Component from '@ember/component';

export default Component.extend({
  classNames: ['panels'],

  actions: {
    createResource(resource, costs, amount) {
      if (resource.max && amount + resource.get('amount') >= resource.get('max.amount')) amount = resource.get('max.amount') - resource.get('amount');

      costs.forEach((cost) => {
        if (cost.get('amount') * amount > cost.get('source.amount')) {
          amount = Math.floor(cost.get('source.amount') / cost.get('amount'))
        }
      });

      costs.forEach((cost) => {
        cost.decrementProperty('source.amount', amount * cost.get('amount'));
      });

      amount *= resource.get('multiplier.amount') || 1;

      resource.incrementProperty('amount', amount);
    }
  }
});
