import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import randomNumber from 'yat/utils/random-number';

export default Component.extend({
  classNames: ['nutrient-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('nutrientTick').perform();
  },

  nutrientTick: task(function * () {
    const imperative = (this.get('data.ri.nutrientImperative') / 100) * randomNumber(1000, 3000);

    ['fat', 'minerals', 'protein', 'calories'].forEach((nutrient) => {
      this.incrementProperty(`data.nutrients.${nutrient}.amount`, Math.round(this.get(`data.mood.hunger.${nutrient}`) * imperative));
    });

    yield timeout(3300);

    this.get('nutrientTick').perform();
  }),

  imperativeCost: computed('data.ri.nutrientImperative', function() {
    return Math.pow(this.get('data.ri.nutrientImperative'), 2);
  }),

  imperativeDisabled: computed('imperativeCost', 'data.ri.ri', function() {
    return this.get('imperativeCost') > this.get('data.ri.ri');
  }),

  increaseImperative() {
    if (this.get('imperativeDisabled')) return;

    this.decrementProperty('data.ri.ri', this.get('imperativeCost'));
    this.incrementProperty('data.ri.nutrientImperative', 1);
  },

  actions: {
    increaseImperative() {
      this.increaseImperative();
    }
  }
});
