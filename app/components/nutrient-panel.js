import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['nutrient-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('nutrientTick').perform();
  },

  nutrientTick: task(function * () {
    yield timeout(3);

    this.incrementProperty('data.nutrients.fat');

    this.get('nutrientTick').perform();
  })
});
