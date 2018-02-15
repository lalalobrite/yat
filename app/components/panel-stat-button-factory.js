import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  didInsertElement() {
    this._super(...arguments);

    this.get('generate').perform();
  },

  generate: task(function * () {
    let resources = 1;
    let totalFactories = this.get('resource.factories.amount') || 0;
    if (totalFactories > 500) {
      resources += (totalFactories - 500) / 500;
      totalFactories = 500;
    }

    if (totalFactories > 0) this.attrs.createResource(this.get('resource'), resources);

    yield timeout(1000 / (totalFactories || 1));

    this.get('generate').perform();
  })
});
