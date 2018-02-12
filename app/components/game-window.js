import Component from '@ember/component';
import EmberObject, { computed, get, set, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isNone, isPresent, typeOf } from '@ember/utils';
import schema from 'yat/utils/schema';

export default Component.extend({
  tagName: '',

  store: service(),

  _data: computed(function() {
    const data = this.get('game.gameData');

    if (isNone(data.nutrients)) {
      setProperties(data, {
        mind: {},
        nutrients: {},
        ri: {},
        messages: ['You are testicles. You must procreate.'],
        perks: {
          available: [],
          resolved: []
        }
      });
    }

    return EmberObject.create(data);
  }),

  data: computed(function() {
    return this.attachModels(this.get('schema'), '');
  }),

  attachModels(value, path, options = {}) {
    if (typeOf(value) === 'object') {
      let gameData;
      if (isPresent(path)) {
        gameData = value.doNotStore ? Ember.Object.extend(value).create() : this.get(`game.gameData.${path}`) || this.set(`game.gameData.${path}`, {
          amount: value.amount || 0,
          unlocked: value.unlocked || false
        });
      } else {
        gameData = this.get('_data');
      }

      return Object.keys(value).reduce((accumulator, key) => {
        if (key !== 'amount' && key !== 'unlocked') accumulator.set(key, key === 'source' ? get(value, key) : this.attachModels(get(value, key), isPresent(path) ? `${path}.${key}` : key));

        return accumulator;
      }, isPresent(path) && !value.doNotStore ? EmberObject.extend(options.isArrayItem ? value : {
        gameData,
        amount: alias('gameData.amount'),
        unlocked: alias('gameData.unlocked')
      }).create() : gameData);
    } else if (typeOf(value) === 'array') {
      return value.map((item) => this.attachModels(item, path, { isArrayItem: true }));
    } else if (value === 'passthrough') {
      return this.get(`game.gameData.${path}`);
    } else {
      return value;
    }
  },

  schema: computed(function() {
    return schema(this.get('_data'));
  }),

  createResource(resource, amount) {
    if (resource.max && amount + resource.get('amount') >= resource.get('max.amount')) amount = resource.get('max.amount') - resource.get('amount');

    resource.incrementProperty('amount', this.payResourceCost(resource, amount, resource.get('costs')));
  },

  destroyResource(resource, amount) {
    if (resource.min && resource.get('amount') - amount <= resource.get('min.amount')) amount = resource.get('amount') - resource.get('min.amount');

    amount = this.payResourceCost(resource, amount, resource.get('destroyCosts'));

    resource.decrementProperty('amount', amount);

    this.incrementProperty('data.nutrients.recoveries.amount', amount);
  },

  payResourceCost(resource, amount, costs) {
    if (costs) {
      costs.forEach((cost) => {
        if (get(cost, 'amount') * amount > get(cost, 'source.amount')) {
          amount = Math.floor(get(cost, 'source.amount') / get(cost, 'amount'))
        }
      });

      costs.forEach((cost) => {
        set(cost, 'source.amount', get(cost, 'source.amount') - (amount * get(cost, 'amount')));
        if (amount < 0 && get(cost, 'source.max.amount') < get(cost, 'source.amount')) cost.set('source.amount', get(cost, 'source.max.amount'));
      });
    }

    if (get(resource, 'multiplier')) amount *= get(resource, 'multiplier.amount');

    return amount;
  },

  lockResource(resource, columnKey, panelKey) {
    resource.set('unlocked', false);

    let childPanel;

    const parentPanel = this.get('data.panels.panels').find((panel) => {
      if (panel.get('path') === path) {
        childPanel = panel;
        return true;
      }
    });

    const panel = this.get(`data.columns.${columnKey}.panels.${panelKey}`);
    const column = this.get(`data.columns.${columnKey}`);

    if (Object.keys(panel).every((key) => panel.get(`${key}.unlocked`) !== true)) panel.set('unlocked', false);
    if (Object.keys(column.get('panels')).every((key) => column.get(`panels.${key}.unlocked`) !== true)) column.set('unlocked', false);
  },

  unlockResource(resource, column, panel) {
    resource.set('unlocked', true);

    this.set(`data.columns.${column}.unlocked`, true);
    this.set(`data.columns.${column}.panels.${panel}.unlocked`, true);
  },

  actions: {
    createResource() {
      this.createResource(...arguments);
    },

    destroyResource() {
      this.destroyResource(...arguments);
    },

    lockResource() {
      this.lockResource(...arguments);
    },

    unlockResource() {
      this.unlockResource(...arguments);
    },

    payResourceCost() {
      this.payResourceCost(...arguments);
    }
  }
});
