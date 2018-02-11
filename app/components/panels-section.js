import Component from '@ember/component';

export default Component.extend({
  classNames: ['panels'],

  actions: {
    createResource(resource, amount) {
      if (resource.max && amount + resource.get('amount') >= resource.get('max.amount')) amount = resource.get('max.amount') - resource.get('amount');

      resource.get('costs').forEach((cost) => {
        if (cost.get('amount') * amount > cost.get('source.amount')) {
          amount = Math.floor(cost.get('source.amount') / cost.get('amount'))
        }
      });

      resource.get('costs').forEach((cost) => {
        cost.decrementProperty('source.amount', amount * cost.get('amount'));
      });

      amount *= resource.get('multiplier.amount') || 1;

      resource.incrementProperty('amount', amount);
    },

    destroyResource(resource, amount) {
      if (resource.min && resource.get('amount') - amount <= resource.get('min.amount')) amount = resource.get('amount') - resource.get('min.amount');

      resource.get('destroyCosts').forEach((cost) => {
        if (cost.get('amount') * amount > cost.get('source.amount')) {
          amount = Math.floor(cost.get('source.amount') / cost.get('amount'))
        }
      });

      resource.get('destroyCosts').forEach((cost) => {
        cost.decrementProperty('source.amount', amount * cost.get('amount'));
      });

      amount *= resource.get('multiplier.amount') || 1;

      resource.decrementProperty('amount', amount);
    }
  }
});
