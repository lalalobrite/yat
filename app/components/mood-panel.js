import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['mood-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('moodGeneration').perform();
  },

  moodGeneration: task(function * () {
    yield timeout(502);

    this.increaseArousal(this.get('data.mood.arousalFactories'));

    this.get('moodGeneration').perform();
  }),

  arousalCost: computed('data.mood.arousal', function() {
    return 1;
  }),

  arousalDisabled: computed('arousalCost', 'data.endocrine.testosterone', 'data.mood.arousal', function() {
    return this.get('data.mood.arousal') >= 100 || this.get('arousalCost') > this.get('data.endocrine.testosterone');
  }),

  increaseArousal(amount) {
    if (this.get('arousalDisabled')) return;

    if (this.get('arousalCost') * amount > this.get('data.endocrine.testosterone')) {
      amount = Math.floor(this.get('data.endocrine.testosterone') / this.get('arousalCost'))
    }

    this.decrementProperty('data.endocrine.testosterone', this.get('arousalCost') * amount);
    this.incrementProperty('data.mood.arousal', amount);
  },

  arousalFactoryCost: computed('data.mood.arousalFactories', function() {
    return Math.round((this.get('data.mood.arousalFactories') + 1) * 500);
  }),

  arousalFactoryDisabled: computed('arousalFactoryCost', 'data.nutrients.protein', function() {
    return this.get('arousalFactoryCost') > this.get('data.nutrients.protein');
  }),

  createArousalFactory() {
    if (this.get('arousalFactoryDisabled')) return;

    this.decrementProperty('data.nutrients.protein', this.get('arousalFactoryCost'));
    this.incrementProperty('data.mood.arousalFactories');
  },

  actions: {
    generateArousal() {
      this.increaseArousal(1);
    },

    createArousalFactory() {
      this.createArousalFactory();
    }
  }
});
