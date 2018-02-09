import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['endocrine-panel', 'panel'],

  testosteroneCost: computed('data.endocrine.testosterone', function() {
    return Math.round(this.get('data.endocrine.testosterone') / 1000) + 1;
  }),

  testosteroneDisabled: computed('testosteroneCost', 'data.nutrients.fat', function() {
    return this.get('testosteroneCost') > this.get('data.nutrients.fat');
  }),

  actions: {
    createTestosterone() {
      this.decrementProperty('data.nutrients.fat', this.get('testosteroneCost'));
      this.incrementProperty('data.endocrine.testosterone');
    }
  }
});
