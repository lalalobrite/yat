import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['mood-panel', 'panel'],

  arousalCosts: computed(function() {
    return [{
      name: 'testosterone',
      unit: 'weight',
      amount: 1,
      source: this.get('data.endocrine.testosterone')
    }]
  }),

  arousalFactoryCosts: computed('data.mood.arousal.factories.amount', function() {
    const totalResourcce = this.get('data.mood.arousal.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  })
});
