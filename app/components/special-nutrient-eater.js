import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import randomNumber from 'yat/utils/random-number';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    this.get('hungerTick').perform();
  },

  hungerStatus: computed('data.mood.hunger.overall.amount', function() {
    const hunger = this.get('data.mood.hunger.overall.amount');
    if (hunger < 33) {
      return 'full';
    } else if (hunger < 66) {
      return 'peckish';
    } else if (hunger < 100) {
      return 'hungry';
    } else {
      return 'starving';
    }
  }),

  hungerTick: task(function * () {
    if (this.incrementProperty('data.mood.hunger.overall.amount') >= randomNumber(60, 125)) {
      this.eat();
    }

    yield timeout(100 / this.get('data.mood.hunger.rate.amount'));

    this.get('hungerTick').perform();
  }),

  eat() {
    const imperative = (this.get('data.nutrients.imperative.amount') / 100) * randomNumber(1000, 3000);

    ['fat', 'minerals', 'protein', 'calories'].forEach((nutrient) => {
      this.incrementProperty(`data.nutrients.${nutrient}.amount`, Math.round(this.get(`data.mood.hunger.${nutrient}.amount`) * imperative));
    });

    this.set('data.mood.hunger.overall.amount', 0);
  }
});
