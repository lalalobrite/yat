import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  attraction: computed('data.sexuality.orientation.amount', 'data.social.currentEncounter.masculinity', function() {
    return Math.max(0, ((100 - Math.abs(this.get('data.sexuality.orientation.amount') - this.get('data.social.currentEncounter.masculinity'))) - 90) * 10);
  }),

  theirAttraction: computed('data.social.currentEncounter.attractionRange.amount', 'data.sexuality.masculinity.amount', function() {
    const [attractionMin, attractionMax] = this.get('data.social.currentEncounter.attractionRange.amount');
    const masculinity = this.get('data.sexuality.masculinity.amount');

    if (masculinity < attractionMin) {
      return (masculinity / attractionMin) * 100;
    } else if (masculinity > attractionMax) {
      return ((100 - masculinity) / (100 - attractionMax)) * 100;
    } else return 100;
  }),

  actions: {
    attract() {
      const encounterMasculinity = this.get('data.social.currentEncounter.masculinity');
      const orientation = this.get('data.sexuality.orientation.amount');
      const direction = encounterMasculinity > orientation ? 0.1 : -0.1;

      this.incrementProperty('data.sexuality.orientation.amount', direction);
    },

    repulse() {
      const encounterMasculinity = this.get('data.social.currentEncounter.masculinity');
      const orientation = this.get('data.sexuality.orientation.amount');
      const direction = encounterMasculinity > orientation ? 0.1 : -0.1;

      this.decrementProperty('data.sexuality.orientation.amount', direction);
    }
  }
});
