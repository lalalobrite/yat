import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['panel-stat'],

  createSources: computed('resource.costs.@each.source', function() {
    return this.get('resource.costs').map((cost) => cost.get('source'));
  }),

  createDisabled: computed('resource.costs.@each.amount', 'createSources.@each.amount', 'resource.max.amount', function() {
    if (!this.get('resource.costs')) return true;
    if (this.get('resource.max') && Math.ceil(this.get('resource.amount')) >= this.get('resource.max.amount')) return true;

    this.get('createSources'); //need to initialize
    return this.get('resource.costs').any((cost) => cost.get('amount') > cost.get('source.amount'));
  }),

  destroySources: computed('resource.destroyCosts.@each.source', function() {
    return this.get('resource.destroyCosts').map((cost) => cost.get('source'));
  }),

  destroyDisabled: computed('resource.destroyCosts.@each.amount', 'destroySources.@each.amount', 'resource.min.amount', function() {
    if (!this.get('resource.destroyCosts')) return true;
    if (this.get('resource.min') && Math.floor(this.get('resource.amount')) <= this.get('resource.min.amount')) return true;

    this.get('destroySources'); //need to initialize
    return this.get('resource.destroyCosts').any((cost) => cost.get('amount') > cost.get('source.amount'));
  }),

  actions: {
    createResource() {
      this.attrs.createResource(this.get('resource'), 1);
    },

    destroyResource() {
      this.attrs.destroyResource(this.get('resource'), 1);
    }
  }
});
