import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    this.get('developFetus').perform();
  },

  pregnancy: alias('data.fertility.pregnancy'),

  developFetus: task(function * () {
    const amount = this.get('data.fertility.pregnancy.amount');
    if (amount >= 100) {
      this.birth();
    } else if (amount > 0) {
      this.develop(amount);
    }

    yield timeout(3000);

    this.get('developFetus').perform();
  }),

  birth() {
    this.attrs.createResource(this.get('data.ri.children'), 1);
    this.set('data.fertility.pregnancy.amount', 0);
    this.attrs.lockResource(this.get('data.fertility.pregnancy'), 'primary', 'fertility');
  },

  develop(amount) {
    this.attrs.createResource(this.get('data.fertility.pregnancy'), 1);
    this.attrs.destroyResource(this.get('data.nutrients.fat'), amount * 25);
  }
});
