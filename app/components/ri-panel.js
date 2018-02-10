import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import randomNumber from 'yat/utils/random-number';

export default Component.extend({
  classNames: ['ri-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('considerGettingOff').perform();
  },

  considerGettingOff: task(function * () {
    yield timeout(10000);

    const totalAvailableSperm = [0, 1, 2, 3, 4, 5].reduce((sum, index) => sum + this.get(`data.fertility.sperm.available.${index}`), 0);

    if (this.get('data.mood.arousal') > randomNumber(5, 125) && (totalAvailableSperm > 0 || this.get('data.fertility.sperm.dead') > 0)) {
      for (let x = 0; x < 5; ++x) {
        this.set(`data.fertility.sperm.available.${x}`, 0);
      }
      this.incrementProperty('data.ri.ri', Math.ceil((this.get('data.fertility.sperm.dead') / 5000000) + (totalAvailableSperm / 2000000)));
      this.set('data.fertility.sperm.dead', 0);

      this.decrementProperty('data.mood.arousal', randomNumber(50, 100));
      if (this.get('data.mood.arousal') < 0) this.set('data.mood.arousal', 0);

      this.set('data.ri.childrenUncertain', true);

      this.get('data.messages').unshiftObject('You have ejaculated. You lack the sensory information to know where.')
    }

    this.get('considerGettingOff').perform();
  })
});
