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
    yield timeout(1000);

    const overallHunger = Math.round(this.get('data.mood.hunger.overall'));

    if (overallHunger > randomNumber(0, 100)) {
      this.incrementProperty('data.nutrients.carbs', this.get('data.mood.hunger.carbs') * overallHunger);
      this.incrementProperty('data.nutrients.fat', this.get('data.mood.hunger.fat') * overallHunger);
      this.incrementProperty('data.nutrients.minerals', this.get('data.mood.hunger.minerals') * overallHunger);
      this.incrementProperty('data.nutrients.protein', this.get('data.mood.hunger.protein') * overallHunger);
      this.set('data.mood.hunger.overall', 0);
    } else {
      this.incrementProperty('data.mood.hunger.overall', this.get('data.mood.hunger.rate') / 1000);
    }

    this.get('nutrientTick').perform();
  })
});
