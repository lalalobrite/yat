import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['panel-stat'],

  sources: computed('costs.@each.source', function() {
    return this.get('costs').map((cost) => cost.source);
  }),

  disabled: computed('costs.@each.amount', 'sources.@each.amount', 'resource.max.amount', function() {
    if (this.get('resource.max') && this.get('resource.amount') >= this.get('resource.max.amount')) return true;

    this.get('sources'); //need to initialize
    return this.get('costs').every((cost) => cost.amount > cost.source.amount);
  }),

  actions: {
    onClick() {
      this.attrs.createResource(this.get('resource'), this.get('costs'), 1);
    }
  }
});
