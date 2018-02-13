import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['perks'],

  perks: computed('data.perks.available.[]', function() {
    return this.get('data.perks.available').map((perk) => {
      return this.get(perk);
    });
  }),

  enableSpermFactories: computed({
    get(key) {
      return {
        key,
        title: 'spermatogonia',
        description: 'generate sperm automatically',
        costs: [{
          data: this.get('data'),
          amount: 20,
          source: alias('data.endocrine.testosterone')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.fertility.sperm.factories'), 'primary', 'fertility');
        }
      }
    }
  }),

  enableTestosteroneFactories: computed({
    get(key) {
      return {
        key,
        title: 'Leydig cells',
        description: 'generate testosterone automatically',
        costs: [{
          data: this.get('data'),
          amount: 250,
          source: alias('data.nutrients.protein')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.endocrine.testosterone.factories'), 'primary', 'endocrine');
        }
      }
    }
  }),

  enableArousal: computed({
    get(key) {
      return {
        key,
        title: 'arousal',
        description: 'encourage reproductive acts',
        costs: [{
          data: this.get('data'),
          amount: 50,
          source: alias('data.endocrine.testosterone')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.mood.arousal'), 'primary', 'mood');
        }
      }
    }
  }),

  enableRi: computed({
    get(key) {
      return {
        key,
        title: 'reproductive imperative',
        description: 'procreation is paramount',
        costs: [{
          data: this.get('data'),
          amount: 50,
          source: alias('data.mood.arousal')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.ri.ri'), 'tertiary', 'ri');
          this.attrs.unlockResource(this.get('data.ri.children'), 'tertiary', 'ri');
        }
      }
    }
  }),

  enableNutrientImperative: computed({
    get(key) {
      return {
        key,
        title: 'nutrient imperative',
        description: 'demand more resources',
        costs: [{
          data: this.get('data'),
          amount: 5,
          source: alias('data.ri.ri')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.nutrients.imperative'), 'tertiary', 'nutrieints');
        }
      }
    }
  }),

  enableNutrientSalvage: computed({
    get(key) {
      return {
        key,
        title: 'nutrient salvage',
        description: 'recover nutrients when decreasing resources',
        costs: [{
          data: this.get('data'),
          amount: 5,
          source: alias('data.ri.ri')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.nutrients.salvage'), 'tertiary', 'nutrieints');
        }
      }
    }
  }),

  enableMind: computed({
    get(key) {
      return {
        key,
        title: 'mind',
        description: 'seize control of neural resources',
        costs: [{
          data: this.get('data'),
          amount: 5,
          source: alias('data.ri.ri')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.mind.cognition'), 'tertiary', 'mind');
          this.attrs.unlockResource(this.get('data.mind.cognition.factories'), 'tertiary', 'mind');
          this.attrs.unlockResource(this.get('data.mind.cognition.max'), 'tertiary', 'mind');
        }
      }
    }
  }),

  enableAvatar: computed({
    get(key) {
      return {
        key,
        title: 'somatosensation',
        description: 'visualize the Body',
        costs: [{
          data: this.get('data'),
          amount: 250,
          source: alias('data.mind.cognition')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.avatar.avatar'), 'avatar', 'avatar');
        }
      }
    }
  }),

  enableFantasy: computed({
    get(key) {
      return {
        key,
        title: 'erotic fantasy',
        description: 'generate arousal automatically',
        costs: [{
          data: this.get('data'),
          amount: 400,
          source: alias('data.mind.cognition')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.mood.arousal.factories'), 'primary', 'mood');
        }
      }
    }
  }),

  enableSocial: computed({
    get(key) {
      return {
        key,
        title: 'social awareness',
        description: 'gain awareness of social interactions',
        costs: [{
          data: this.get('data'),
          amount: 750,
          source: alias('data.mind.cognition')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.social.visualizer'), 'social', 'social');
        }
      }
    }
  }),

  actions: {
    purchase(perk) {
      const key = perk.key;
      this.get('data.perks.available').removeObject(key);
      this.get('data.perks.resolved').pushObject(key);
      this.attrs.payResourceCost(perk, 1, perk.costs);
      perk.callback.apply(this);
    }
  }
});
