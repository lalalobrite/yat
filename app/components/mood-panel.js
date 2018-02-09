import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['mood-panel', 'panel'],

  arousalCost: computed('data.mood.arousal', function() {
    return Math.round(this.get('data.mood.arousal') / 1000) + 1;
  }),

  arousalDisabled: computed('arousalCost', 'data.endocrine.testosterone', 'data.mood.arousal', function() {
    return this.get('data.mood.arousal') >= 100 || this.get('arousalCost') > this.get('data.endocrine.testosterone');
  }),

  increaseArousal() {
    if (this.get('arousalDisabled')) return;

    this.decrementProperty('data.endocrine.testosterone', this.get('arousalCost'));
    this.incrementProperty('data.mood.arousal');
  },

  actions: {
    generateArousal() {
      this.increaseArousal();
    }
  }
});
