import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import randomNumber from 'yat/utils/random-number';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    this.get('considerGettingOff').perform();
  },

  arousal: alias('data.mood.arousal'),

  considerGettingOff: task(function * () {
    if (this.get('arousal.amount') > randomNumber(50, 125) && this.get('data.fertility.sperm.amount') >= 100) {
      const ejaculate = Math.min(this.get('data.fertility.sperm.amount'), randomNumber(500, 2000));
      this.decrementProperty('data.fertility.sperm.amount', ejaculate);
      this.incrementProperty('data.ri.ri.amount');
      this.set('arousal.amount', 0);
    }

    yield timeout(1000);

    this.get('considerGettingOff').perform();
  })
});
