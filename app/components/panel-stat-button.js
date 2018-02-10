import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['panel-stat'],

  didInsertElement() {
    this._super(...arguments);

    this.get('sources'); //need to initialize
  },

  sources: computed('costs.@each.source', function() {
    return this.get('costs').map((cost) => cost.source);
  }),

  disabled: computed('costs.@each.amount', 'sources.@each.amount', 'resource.max', function() {
    if (this.get('resource.max') && this.get('resource.amount') >= this.get('resource.max')) return true;

    return this.get('costs').every((cost) => cost.amount > cost.source.amount);
  }),

  actions: {
    onClick() {
      this.attrs.onClick(this.get('resource'), this.get('costs'), 1);
    }
  }
});
