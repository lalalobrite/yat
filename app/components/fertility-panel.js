import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sum } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['fertility-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('spermMaturation').perform();
    this.get('spermGeneration').perform();
  },

  spermMaturation: task(function * () {
    yield timeout(10007);

    this.incrementProperty('data.fertility.sperm.dead', this.get('data.fertility.sperm.available.0'));

    for (let x = 0; x < 5; ++x) {
      this.set(`data.fertility.sperm.available.${x}`, this.get(`data.fertility.sperm.available.${x + 1}`));
    }

    this.set('data.fertility.sperm.available.5', this.get('data.fertility.sperm.immature.0'));

    for (let x = 0; x < 5; ++x) {
      this.set(`data.fertility.sperm.immature.${x}`, this.get(`data.fertility.sperm.immature.${x + 1}`));
    }

    this.set('data.fertility.sperm.immature.5', 0);

    this.get('spermMaturation').perform();
  }),

  spermGeneration: task(function * () {
    yield timeout(509);

    this.increaseSperm(this.get('data.fertility.spermFactories'));

    this.get('spermGeneration').perform();
  }),

  totalSpermAvailable: computed('data.fertility.sperm.available.0', 'data.fertility.sperm.available.1', 'data.fertility.sperm.available.2', 'data.fertility.sperm.available.3', 'data.fertility.sperm.available.4', 'data.fertility.sperm.available.5', function() {
    return ['data.fertility.sperm.available.0', 'data.fertility.sperm.available.1', 'data.fertility.sperm.available.2', 'data.fertility.sperm.available.3', 'data.fertility.sperm.available.4', 'data.fertility.sperm.available.5'].reduce((sum, source) => sum + this.get(source), 0);
  }),

  totalSpermImmature: computed('data.fertility.sperm.immature.0', 'data.fertility.sperm.immature.1', 'data.fertility.sperm.immature.2', 'data.fertility.sperm.immature.3', 'data.fertility.sperm.immature.4', 'data.fertility.sperm.immature.5', function() {
    return ['data.fertility.sperm.immature.0', 'data.fertility.sperm.immature.1', 'data.fertility.sperm.immature.2', 'data.fertility.sperm.immature.3', 'data.fertility.sperm.immature.4', 'data.fertility.sperm.immature.5'].reduce((sum, source) => sum + this.get(source), 0);
  }),

  totalSpermDead: alias('data.fertility.sperm.dead'),

  spermCost: computed('data.fertility.sperm', function() {
    return 1
  }),

  spermDisabled: computed('spermCost', 'data.endocrine.testosterone', function() {
    return this.get('spermCost') > this.get('data.endocrine.testosterone');
  }),

  increaseSperm(amount) {
    if (this.get('spermDisabled')) return;

    if (this.get('spermCost') * amount > this.get('data.endocrine.testosterone')) {
      amount = Math.floor(this.get('data.endocrine.testosterone') / this.get('spermCost'))
    }

    this.decrementProperty('data.endocrine.testosterone', this.get('spermCost') * amount);
    this.incrementProperty('data.fertility.sperm.immature.5', amount * this.get('data.fertility.spermMultiplier'));
  },

  spermFactoryCost: computed('data.fertility.spermFactories', function() {
    return Math.ceil(Math.pow(this.get('data.fertility.spermFactories') + 1, 2) / 10);
  }),

  spermFactoryDisabled: computed('spermFactoryCost', 'data.nutrients.protein', function() {
    return this.get('spermFactoryCost') > this.get('data.nutrients.protein');
  }),

  createSpermFactory() {
    if (this.get('spermFactoryDisabled')) return;

    this.decrementProperty('data.nutrients.protein', this.get('spermFactoryCost'));
    this.incrementProperty('data.fertility.spermFactories');
  },

  actions: {
    createSperm() {
      this.increaseSperm(1);
    },

    createSpermFactory() {
      this.createSpermFactory();
    }
  }
});
