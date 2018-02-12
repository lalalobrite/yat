import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['perks'],

  perks: computed('data.perks.available.[]', function() {
    return this.get('data.perks.available').map((perk) => {
      return this.get(perk);
    });
  }),

  enableSpermFactories: computed(function() {
    return {
      key: 'enableSpermFactories',
      title: 'spermatogonia',
      description: 'generate sperm automatically',
      costs: [{
        data: this.get('data'),
        amount: 20,
        source: alias('data.endocrine.testosterone')
      }],
      callback() {
        this.set('data.fertility.sperm.factories.unlocked', true);
      }
    }
  }),

  actions: {
    purchase(perk) {
      const key = perk.key;
      this.get('data.perks.available').removeObject(key);
      this.get('data.perks.resolved').pushObject(key);
      perk.callback.apply(this);
    }
  }
});
