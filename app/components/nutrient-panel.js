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

    const appetite = this.get('data.mood.hunger.appetite') * randomNumber(5000000, 15000000);

    this.incrementProperty('data.nutrients.fat', this.get('data.mood.hunger.fat') * appetite);
    this.incrementProperty('data.nutrients.minerals', this.get('data.mood.hunger.minerals') * appetite);
    this.incrementProperty('data.nutrients.protein', this.get('data.mood.hunger.protein') * appetite);
    this.incrementProperty('data.nutrients.caleries', (this.get('data.mood.hunger.carbs') * appetite) / 4);

    const maxProtein = 9000000000;
    if (this.get('data.nutrients.protein') > maxProtein) {
      this.incrementProperty('data.nutrients.caleries', ((this.get('data.nutrients.protein') - maxProtein) / 4));
      this.set('data.nutrients.protein', maxProtein);
    }

    const maxMinerals = 9000000000;
    if (this.get('data.nutrients.minerals') > maxMinerals) {
      this.set('data.nutrients.minerals', maxMinerals);
    }

    const maxCaleries = 9000000000;
    if (this.get('data.nutrients.caleries') > maxCaleries) {
      this.incrementProperty('data.nutrients.fat', ((this.get('data.nutrients.caleries') - maxCaleries) / 9));
      this.set('data.nutrients.caleries', maxCaleries);
    }

    this.get('nutrientTick').perform();
  })
});
