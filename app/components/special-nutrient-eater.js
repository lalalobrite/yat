import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import randomNumber from 'yat/utils/random-number';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    this.get('hungerTick').perform();
  },

  hungerTick: task(function * () {
    if (this.incrementProperty('data.mood.hunger.overall.amount') >= randomNumber(60, 125)) {
      this.get('digest').perform((this.get('data.nutrients.imperative.amount') / 100) * randomNumber(500, 1500));

      this.set('data.mood.hunger.overall.amount', 0);
    }

    yield timeout(100 / this.get('data.mood.hunger.rate.amount'));

    this.get('hungerTick').perform();
  }),

  digest: task(function * (totalNutrients) {
    const absorption = Math.round(totalNutrients / 10);

    if (absorption === 0) return;

    ['fat', 'minerals', 'protein'].forEach((nutrient) => {
      this.incrementProperty(`data.nutrients.${nutrient}.amount`, Math.round(this.get(`data.mood.hunger.${nutrient}.amount`) * absorption));
    });

    yield timeout(75);

    this.get('digest').perform(totalNutrients - absorption);
  })
});
