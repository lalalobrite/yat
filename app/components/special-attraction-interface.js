import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  attraction: computed('data.social.currentEncounter.playerAttraction.amount', function() {
    return this.get('data.social.currentEncounter.playerAttraction.amount');
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

  attractionDirection: computed('data.social.currentEncounter.masculinity', 'data.sexuality.orientation.amount', function() {
    const encounterMasculinity = this.get('data.social.currentEncounter.masculinity');
    const orientation = this.get('data.sexuality.orientation.amount');
    return encounterMasculinity > orientation ? 1 : -1;
  }),

  actions: {
    attract() {
      this.attrs.createResource(this.get('data.sexuality.orientation'), this.get('attractionDirection'));
    },

    repulse() {
      this.attrs.destroyResource(this.get('data.sexuality.orientation'), this.get('attractionDirection'));
    }
  }
});
