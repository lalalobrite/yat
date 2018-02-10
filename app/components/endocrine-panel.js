import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['endocrine-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('hormoneGeneration').perform();
  },

  hormoneGeneration: task(function * () {
    yield timeout(402);

    this.increaseTestosterone(this.get('data.endocrine.testosteroneFactories'));

    this.get('hormoneGeneration').perform();
  }),

  testosteroneCost: computed('data.endocrine.testosterone', function() {
    return 10;
  }),

  testosteroneDisabled: computed('testosteroneCost', 'data.nutrients.fat', function() {
    return this.get('testosteroneCost') > this.get('data.nutrients.fat');
  }),

  increaseTestosterone(amount) {
    if (this.get('testosteroneDisabled')) return;

    if (this.get('testosteroneCost') * amount > this.get('data.nutrients.fat')) {
      amount = Math.floor(this.get('data.nutrients.fat') / this.get('testosteroneCost'))
    }

    this.decrementProperty('data.nutrients.fat', this.get('testosteroneCost') * amount);
    this.incrementProperty('data.endocrine.testosterone', amount * this.get('data.endocrine.testosteroneMultiplier'));
  },

  testosteroneFactoryCost: computed('data.endocrine.testosteroneFactories', function() {
    return Math.pow(this.get('data.endocrine.testosteroneFactories') + 1, 2) * 500;
  }),

  testosteroneFactoryDisabled: computed('testosteroneFactoryCost', 'data.nutrients.protein', function() {
    return this.get('testosteroneFactoryCost') > this.get('data.nutrients.protein');
  }),

  createTestosteroneFactory() {
    if (this.get('testosteroneFactoryDisabled')) return;

    this.decrementProperty('data.nutrients.protein', this.get('testosteroneFactoryCost'));
    this.incrementProperty('data.endocrine.testosteroneFactories');
  },

  actions: {
    createTestosterone() {
      this.increaseTestosterone(1);
    },

    createTestosteroneFactory() {
      this.createTestosteroneFactory();
    }
  }
});
