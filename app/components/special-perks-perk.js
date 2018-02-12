import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',

  source: computed('perk.costs.@each.source', function() {
    return this.get('perk.costs').map((cost) => get(cost, 'source'));
  }),

  disabled: computed('perk.costs.@each.amount', 'source.@each.amount', 'perk.max.amount', function() {
    this.get('source'); //need to initialize
    return this.get('perk.costs').any((cost) => get(cost, 'amount') > get(cost, 'source.amount'));
  })
});
