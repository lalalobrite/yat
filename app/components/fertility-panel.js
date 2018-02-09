import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, sum } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['fertility-panel', 'panel'],

  didInsertElement() {
    this._super(...arguments);

    this.get('spermMaturation').perform();
  },

  spermMaturation: task(function * () {
    yield timeout(10007);

    this.incrementProperty('data.fertility.sperm.dead', this.get('data.fertility.sperm.available.0'));

    for (let x = 0; x < 5; ++x) {
      this.set(`data.fertility.sperm.available.${x}`, this.get(`data.fertility.sperm.available.${x + 1}`));
    }

    this.set('data.fertility.sperm.available.5', this.get('data.fertility.sperm.immature.0'));

    for (let x = 0; x < 5; ++x) {
      this.set(`data.fertility.sperm.immature.${x}`, this.get(`data.fertility.sperm.immature.${x + 1}`));
    }

    this.set('data.fertility.sperm.immature.5', 0);

    this.get('spermMaturation').perform();
  }),

  spermCost: computed('data.fertility.sperm', function() {
    return 1
  }),

  spermDisabled: computed('spermCost', 'data.endocrine.testosterone', function() {
    return this.get('spermCost') > this.get('data.endocrine.testosterone');
  }),

  increaseSperm() {
    if (this.get('spermDisabled')) return;

    this.decrementProperty('data.endocrine.testosterone', this.get('spermCost'));
    this.incrementProperty('data.fertility.sperm.immature.5');
  },

  totalSpermAvailable: computed('data.fertility.sperm.available.0', 'data.fertility.sperm.available.1', 'data.fertility.sperm.available.2', 'data.fertility.sperm.available.3', 'data.fertility.sperm.available.4', 'data.fertility.sperm.available.5', function() {
    return ['data.fertility.sperm.available.0', 'data.fertility.sperm.available.1', 'data.fertility.sperm.available.2', 'data.fertility.sperm.available.3', 'data.fertility.sperm.available.4', 'data.fertility.sperm.available.5'].reduce((sum, source) => sum + this.get(source), 0);
  }),

  totalSpermImmature: computed('data.fertility.sperm.immature.0', 'data.fertility.sperm.immature.1', 'data.fertility.sperm.immature.2', 'data.fertility.sperm.immature.3', 'data.fertility.sperm.immature.4', 'data.fertility.sperm.immature.5', function() {
    return ['data.fertility.sperm.immature.0', 'data.fertility.sperm.immature.1', 'data.fertility.sperm.immature.2', 'data.fertility.sperm.immature.3', 'data.fertility.sperm.immature.4', 'data.fertility.sperm.immature.5'].reduce((sum, source) => sum + this.get(source), 0);
  }),

  totalSpermDead: alias('data.fertility.sperm.dead'),

  actions: {
    createSperm() {
      this.increaseSperm();
    }
  }
});
