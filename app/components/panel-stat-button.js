import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['panel-stat'],

  createSources: computed('resource.costs.@each.source', function() {
    return this.get('resource.costs').map((cost) => cost.source);
  }),

  createDisabled: computed('resource.costs.@each.amount', 'createSources.@each.amount', 'resource.max.amount', function() {
    if (this.get('resource.max') && this.get('resource.amount') >= this.get('resource.max.amount')) return true;

    this.get('createSources'); //need to initialize
    return this.get('resource.costs').every((cost) => get(cost, 'amount') > get(cost, 'source.amount'));
  }),

  destroySources: computed('resource.destroyCosts.@each.source', function() {
    return this.get('resource.destroyCosts').map((cost) => cost.source);
  }),

  destroyDisabled: computed('resource.destroyCosts.@each.amount', 'destroySources.@each.amount', 'resource.min.amount', function() {
    if (this.get('resource.min') && this.get('resource.amount') <= this.get('resource.min.amount')) return true;

    this.get('destroySources'); //need to initialize
    return this.get('resource.destroyCosts').every((cost) => get(cost, 'amount') > get(cost, 'source.amount'));
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
