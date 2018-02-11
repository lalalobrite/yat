import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  didInsertElement() {
    this._super(...arguments);

    this.get('generate').perform();
  },

  generate: task(function * () {
    const totalFactories = this.get('resource.factories.amount');

    if (totalFactories > 0) this.attrs.createResource(this.get('resource'), this.get('resource.costs'), 1);

    yield timeout(1000 / ( totalFactories || 1));

    this.get('generate').perform();
  })
});
