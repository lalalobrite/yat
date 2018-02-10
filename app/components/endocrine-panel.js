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

    // this.increaseTestosterone(this.get('data.endocrine.testosterone.factories'));
    this.attrs.createResource(this.get('data.endocrine.testosterone'), this.get('testosteroneCost'), this.get('data.endocrine.testosterone.factories'))

    this.get('hormoneGeneration').perform();
  }),

  testosteroneCost: computed(function() {
    return [{
      name: 'fat',
      unit: 'weight',
      amount: 1,
      source: this.get('data.nutrients.fat')
    }]
  }),

  testosteroneFactoryCost: computed('data.endocrine.testosterone.factories', function() {
    return Math.pow(this.get('data.endocrine.testosterone.factories') + 1, 2) * 500;
  }),

  testosteroneFactoryDisabled: computed('testosteroneFactoryCost', 'data.nutrients.protein', function() {
    return this.get('testosteroneFactoryCost') > this.get('data.nutrients.protein');
  }),

  createTestosteroneFactory() {
    if (this.get('testosteroneFactoryDisabled')) return;

    this.decrementProperty('data.nutrients.protein', this.get('testosteroneFactoryCost'));
    this.incrementProperty('data.endocrine.testosterone.factories');
  },

  actions: {
    createTestosteroneFactory() {
      this.createTestosteroneFactory();
    }
  }
});
