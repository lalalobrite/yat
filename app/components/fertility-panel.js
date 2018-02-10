import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sum } from '@ember/object/computed';

export default Component.extend({
  classNames: ['fertility-panel', 'panel'],

  spermCosts: computed(function() {
    return [{
      name: 'testosterone',
      unit: 'weight',
      amount: 1,
      source: this.get('data.endocrine.testosterone')
    }]
  }),

  spermFactoryCosts: computed('data.fertility.sperm.factories.amount', function() {
    const totalResourcce = this.get('data.fertility.sperm.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  })
});
