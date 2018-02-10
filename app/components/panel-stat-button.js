import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['panel-stat'],

  disabled: computed('costs.@each.amount', 'costs.@each.source.amount', function() {
    return this.get('costs').every((cost) => cost.amount > cost.source.amount);
  }),

  actions: {
    onClick() {
      this.attrs.onClick(this.get('resource'), this.get('costs'), 1);
    }
  }
});
