import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['endocrine-panel', 'panel'],

  estrogenCosts: computed(function() {
    return [{
      name: 'fat',
      unit: 'weight',
      amount: 1,
      source: this.get('data.nutrients.fat')
    }]
  }),

  estrogenFactoryCosts: computed('data.endocrine.estrogen.factories.amount', function() {
    const totalResourcce = this.get('data.endocrine.estrogen.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  }),

  humanGrowthHormoneCosts: computed(function() {
    return [{
      name: 'fat',
      unit: 'weight',
      amount: 1,
      source: this.get('data.nutrients.fat')
    }]
  }),

  humanGrowthHormoneFactoryCosts: computed('data.endocrine.humanGrowthHormone.factories.amount', function() {
    const totalResourcce = this.get('data.endocrine.humanGrowthHormone.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  }),

  progesteroneCosts: computed(function() {
    return [{
      name: 'fat',
      unit: 'weight',
      amount: 1,
      source: this.get('data.nutrients.fat')
    }]
  }),

  progesteroneFactoryCosts: computed('data.endocrine.progesterone.factories.amount', function() {
    const totalResourcce = this.get('data.endocrine.progesterone.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  }),

  prolactinCosts: computed(function() {
    return [{
      name: 'fat',
      unit: 'weight',
      amount: 1,
      source: this.get('data.nutrients.fat')
    }]
  }),

  prolactinFactoryCosts: computed('data.endocrine.prolactin.factories.amount', function() {
    const totalResourcce = this.get('data.endocrine.prolactin.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  }),

  testosteroneCosts: computed(function() {
    return [{
      name: 'fat',
      unit: 'weight',
      amount: 1,
      source: this.get('data.nutrients.fat')
    }]
  }),

  testosteroneFactoryCosts: computed('data.endocrine.testosterone.factories.amount', function() {
    const totalResourcce = this.get('data.endocrine.testosterone.factories.amount');

    return [{
      name: 'protein',
      unit: 'weight',
      amount: Math.pow(totalResourcce, 2) + 1,
      source: this.get('data.nutrients.protein')
    }]
  })
});
