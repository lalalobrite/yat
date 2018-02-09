import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import randomNumber from 'yat/utils/random-number';

export default Component.extend({
  classNames: ['nutrient-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('nutrientTick').perform();
  },

  nutrientTick: task(function * () {
    yield timeout(3300);

    const imperative = (this.get('data.ri.nutrientImperative') / 100) * randomNumber(1000, 3000);

    ['fat', 'minerals', 'protein', 'calories'].forEach((nutrient) => {
      this.incrementProperty(`data.nutrients.${nutrient}`, Math.round(this.get(`data.mood.hunger.${nutrient}`) * imperative));
    });

    this.get('nutrientTick').perform();
  })
});
