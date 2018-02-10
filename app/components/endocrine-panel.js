import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['endocrine-panel', 'panel'],

  testosteroneCosts: computed(function() {
    return [{
      name: 'fat',
      unit: 'weight',
      amount: 1,
      source: this.get('data.nutrients.fat')
    }]
  }),

  testosteroneFactoryCosts: computed('data.endocrine.testosterone.factories.amount', function() {
    const totalResourcce = this.get('data.endocrine.testosterone.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  })
});
