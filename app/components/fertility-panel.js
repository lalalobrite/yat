import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sum } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['fertility-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('spermGeneration').perform();
  },

  spermGeneration: task(function * () {
    yield timeout(509);

    // this.increaseSperm(this.get('data.fertility.sperm.factories'));

    this.get('spermGeneration').perform();
  }),

  spermCost: computed(function() {
    return [{
      name: 'testosterone',
      unit: 'weight',
      amount: 1,
      source: this.get('data.endocrine.testosterone')
    }]
  }),

  spermFactoryCost: computed('data.fertility.sperm.factories', function() {
    return Math.ceil(Math.pow(this.get('data.fertility.sperm.factories') + 1, 2) / 10);
  }),

  spermFactoryDisabled: computed('spermFactoryCost', 'data.nutrients.protein', function() {
    return this.get('spermFactoryCost') > this.get('data.nutrients.protein');
  }),

  createSpermFactory() {
    if (this.get('spermFactoryDisabled')) return;

    this.decrementProperty('data.nutrients.protein', this.get('spermFactoryCost'));
    this.incrementProperty('data.fertility.sperm.factories');
  },

  actions: {
    createSpermFactory() {
      this.createSpermFactory();
    }
  }
});
