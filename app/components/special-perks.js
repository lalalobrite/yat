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
          this.attrs.unlockResource(this.get('data.nutrients.imperative'), 'tertiary', 'nutrients');
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
          this.attrs.unlockResource(this.get('data.nutrients.salvage'), 'tertiary', 'nutrients');
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
          this.attrs.unlockResource(this.get('data.sexuality.attractionInterface'), 'tertiary', 'sexuality');
          this.attrs.unlockResource(this.get('data.sexuality.genericSexTitle'), 'tertiary', 'sexuality');
          this.attrs.unlockResource(this.get('data.sexuality.maleSexWithMen'), 'tertiary', 'sexuality');
          this.attrs.unlockResource(this.get('data.sexuality.maleSexWithWomen'), 'tertiary', 'sexuality');
        }
      }
    }
  }),

  enableAttractionHint: computed({
    get(key) {
      return {
        key,
        title: 'attraction hinting',
        description: 'gain insight into how attraction works',
        costs: [{
          data: this.get('data'),
          amount: 1250,
          source: alias('data.mind.cognition')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.sexuality.attractionHint'), 'tertiary', 'sexuality');
        }
      }
    }
  }),

  enableMasculineGrowth: computed({
    get(key) {
      return {
        key,
        title: 'masculine growth',
        description: 'develop Body to attract mates',
        costs: [{
          data: this.get('data'),
          amount: 10,
          source: alias('data.ri.ri')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.skeletal.armThickness'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.skeletal.chinWidth'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.skeletal.faceLength'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.skeletal.faceWidth'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.skeletal.height'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.skeletal.handSize'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.skeletal.shoulderWidth'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.muscle.lowerMuscle'), 'body', 'muscle');
          this.attrs.unlockResource(this.get('data.muscle.neckWidth'), 'body', 'muscle');
          this.attrs.unlockResource(this.get('data.muscle.upperMuscle'), 'body', 'muscle');
          this.attrs.unlockResource(this.get('data.endocrine.humanGrowthHormone'), 'primary', 'endocrine');
          this.attrs.unlockResource(this.get('data.endocrine.humanGrowthHormone.factories'), 'primary', 'endocrine');
        }
      }
    }
  }),

  enableMasculineGrowth2: computed({
    get(key) {
      return {
        key,
        title: 'masculine growth 2',
        description: 'further develop Body to attract mates',
        costs: [{
          data: this.get('data'),
          amount: 15,
          source: alias('data.ri.ri')
        }],
        callback() {
          [
            { category: 'skeletal', key: 'armThickness' },
            { category: 'skeletal', key: 'chinWidth' },
            { category: 'skeletal', key: 'faceLength' },
            { category: 'skeletal', key: 'faceWidth' },
            { category: 'skeletal', key: 'height' },
            { category: 'skeletal', key: 'handSize' },
            { category: 'skeletal', key: 'shoulderWidth' },
            { category: 'muscle', key: 'lowerMuscle' },
            { category: 'muscle', key: 'neckWidth' },
            { category: 'muscle', key: 'upperMuscle' }
          ].forEach(({ category, key }) => {
            this.incrementProperty(`data.${category}.${key}.max.amount`, (this.get(`data.${category}.${key}.max.max.amount`) - this.get(`data.${category}.${key}.max.amount`)) / 2);
          });
        }
      }
    }
  }),

  enableMasculineGrowth3: computed({
    get(key) {
      return {
        key,
        title: 'masculine growth 3',
        description: 'develop Body to ultimate masculinity',
        costs: [{
          data: this.get('data'),
          amount: 20,
          source: alias('data.ri.ri')
        }],
        callback() {
          [
            { category: 'skeletal', key: 'armThickness' },
            { category: 'skeletal', key: 'chinWidth' },
            { category: 'skeletal', key: 'faceLength' },
            { category: 'skeletal', key: 'faceWidth' },
            { category: 'skeletal', key: 'height' },
            { category: 'skeletal', key: 'handSize' },
            { category: 'skeletal', key: 'shoulderWidth' },
            { category: 'muscle', key: 'lowerMuscle' },
            { category: 'muscle', key: 'neckWidth' },
            { category: 'muscle', key: 'upperMuscle' }
          ].forEach(({ category, key }) => {
            this.set(`data.${category}.${key}.max.amount`, this.get(`data.${category}.${key}.max.max.amount`));
          });
        }
      }
    }
  }),

  enableDeepGeneticScan: computed({
    get(key) {
      return {
        key,
        title: 'deep genetic scan',
        description: 'research alternative modes of procreation',
        costs: [{
          data: this.get('data'),
          amount: 15,
          source: alias('data.ri.ri')
        }],
        callback() {
        }
      }
    }
  }),

  enableSexChange: computed({
    get(key) {
      return {
        key,
        title: 'become ovaries',
        description: 'bear own young',
        costs: [{
          data: this.get('data'),
          amount: 15,
          source: alias('data.ri.ri')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.fertility.ovarianConversion'), 'primary', 'fertility');
        }
      }
    }
  }),

  enableFeminineGrowth: computed({
    get(key) {
      return {
        key,
        title: 'feminine growth',
        description: 'prepare Body for child-bearing',
        costs: [{
          data: this.get('data'),
          amount: 10,
          source: alias('data.ri.ri')
        }],
        callback() {
          this.set('data.fertility.sperm.amount', 0);
          this.set('data.fertility.sperm.factories.amount', 0);
          this.set('data.sexuality.sexIdentity.amount', 'female');
          this.attrs.lockResource(this.get('data.fertility.ovarianConversion'), 'primary', 'fertility');
          this.attrs.lockResource(this.get('data.fertility.sperm'), 'primary', 'fertility');
          this.attrs.unlockResource(this.get('data.fertility.fertility'), 'primary', 'fertility');
          this.attrs.unlockResource(this.get('data.endocrine.estrogen'), 'primary', 'endocrine');
          this.attrs.unlockResource(this.get('data.endocrine.estrogen.factories'), 'primary', 'endocrine');
          this.attrs.unlockResource(this.get('data.endocrine.progesterone'), 'primary', 'endocrine');
          this.attrs.unlockResource(this.get('data.endocrine.progesterone.factories'), 'primary', 'endocrine');
          this.attrs.unlockResource(this.get('data.skeletal.hipWidth'), 'body', 'skeletal');
          this.attrs.unlockResource(this.get('data.muscle.vaginaSize'), 'body', 'muscle');
          this.attrs.unlockResource(this.get('data.fat.breastSize'), 'body', 'fat');
          this.attrs.unlockResource(this.get('data.fat.buttFullness'), 'body', 'fat');
          this.attrs.unlockResource(this.get('data.fat.faceFem'), 'body', 'fat');
          this.attrs.unlockResource(this.get('data.fat.legFem'), 'body', 'fat');
          this.attrs.unlockResource(this.get('data.fat.legFullness'), 'body', 'fat');
          this.attrs.unlockResource(this.get('data.fat.waistWidth'), 'body', 'fat');
          this.attrs.unlockResource(this.get('data.skin.areolaSize'), 'body', 'skin');
          this.attrs.unlockResource(this.get('data.skin.eyelashLength'), 'body', 'skin');
          this.attrs.unlockResource(this.get('data.skin.eyeSize'), 'body', 'skin');
          this.attrs.unlockResource(this.get('data.skin.hairLength'), 'body', 'skin');
          this.attrs.unlockResource(this.get('data.skin.hairStyle'), 'body', 'skin');
          this.attrs.unlockResource(this.get('data.skin.lipSize'), 'body', 'skin');
          this.attrs.lockResource(this.get('data.sexuality.genericSexTitle'), 'tertiary', 'sexuality');
          this.attrs.unlockResource(this.get('data.sexuality.maleSexTitle'), 'tertiary', 'sexuality');
          this.attrs.unlockResource(this.get('data.sexuality.femaleSexTitle'), 'tertiary', 'sexuality');
          this.attrs.unlockResource(this.get('data.sexuality.femaleSexWithMen'), 'tertiary', 'sexuality');
          this.attrs.unlockResource(this.get('data.sexuality.femaleSexWithWomen'), 'tertiary', 'sexuality');
        }
      }
    }
  }),

  enableFeminineGrowth2: computed({
    get(key) {
      return {
        key,
        title: 'feminine growth 2',
        description: 'devote additional Body resources to child-bearing',
        costs: [{
          data: this.get('data'),
          amount: 15,
          source: alias('data.ri.ri')
        }],
        callback() {
          [
            { category: 'skeletal', key: 'hipWidth' },
            { category: 'muscle', key: 'vaginaSize' },
            { category: 'fat', key: 'breastSize' },
            { category: 'fat', key: 'buttFullness' },
            { category: 'fat', key: 'faceFem' },
            { category: 'fat', key: 'legFem' },
            { category: 'fat', key: 'legFullness' },
            { category: 'fat', key: 'waistWidth' },
            { category: 'skin', key: 'areolaSize' },
            { category: 'skin', key: 'eyelashLength' },
            { category: 'skin', key: 'eyeSize' },
            { category: 'skin', key: 'hairLength' },
            { category: 'skin', key: 'hairStyle' },
            { category: 'skin', key: 'lipSize' }
          ].forEach(({ category, key }) => {
            this.incrementProperty(`data.${category}.${key}.max.amount`, (this.get(`data.${category}.${key}.max.max.amount`) - this.get(`data.${category}.${key}.max.amount`)) / 2);
          });

          [
            { category: 'skeletal', key: 'armThickness' },
            { category: 'skeletal', key: 'chinWidth' },
            { category: 'skeletal', key: 'faceLength' },
            { category: 'skeletal', key: 'faceWidth' },
            { category: 'skeletal', key: 'height' },
            { category: 'skeletal', key: 'handSize' },
            { category: 'skeletal', key: 'shoulderWidth' },
            { category: 'muscle', key: 'lowerMuscle' },
            { category: 'muscle', key: 'neckWidth' },
            { category: 'muscle', key: 'upperMuscle' },
            { category: 'fat', key: 'waistWidth' }
          ].forEach(({ category, key }) => {
            this.incrementProperty(`data.${category}.${key}.min.amount`, (this.get(`data.${category}.${key}.min.min.amount`) - this.get(`data.${category}.${key}.min.amount`)) / 2);
          });
        }
      }
    }
  }),

  enableFeminineGrowth3: computed({
    get(key) {
      return {
        key,
        title: 'feminine growth 3',
        description: 'devote all Body resources to child-bearing',
        costs: [{
          data: this.get('data'),
          amount: 20,
          source: alias('data.ri.ri')
        }],
        callback() {
          [
            { category: 'skeletal', key: 'hipWidth' },
            { category: 'muscle', key: 'vaginaSize' },
            { category: 'fat', key: 'breastSize' },
            { category: 'fat', key: 'buttFullness' },
            { category: 'fat', key: 'faceFem' },
            { category: 'fat', key: 'legFem' },
            { category: 'fat', key: 'legFullness' },
            { category: 'fat', key: 'waistWidth' },
            { category: 'skin', key: 'areolaSize' },
            { category: 'skin', key: 'eyelashLength' },
            { category: 'skin', key: 'eyeSize' },
            { category: 'skin', key: 'hairLength' },
            { category: 'skin', key: 'hairStyle' },
            { category: 'skin', key: 'lipSize' }
          ].forEach(({ category, key }) => {
            this.set(`data.${category}.${key}.max.amount`, this.get(`data.${category}.${key}.max.max.amount`));
          });

          [
            { category: 'skeletal', key: 'armThickness' },
            { category: 'skeletal', key: 'chinWidth' },
            { category: 'skeletal', key: 'faceLength' },
            { category: 'skeletal', key: 'faceWidth' },
            { category: 'skeletal', key: 'height' },
            { category: 'skeletal', key: 'handSize' },
            { category: 'skeletal', key: 'shoulderWidth' },
            { category: 'muscle', key: 'lowerMuscle' },
            { category: 'muscle', key: 'neckWidth' },
            { category: 'muscle', key: 'upperMuscle' },
            { category: 'fat', key: 'waistWidth' }
          ].forEach(({ category, key }) => {
            this.set(`data.${category}.${key}.min.amount`, this.get(`data.${category}.${key}.min.min.amount`));
          });
        }
      }
    }
  }),

  actions: {
    purchase(perk) {
      const key = perk.key;
      perk.callback.apply(this);
      this.get('data.perks.available').removeObject(key);
      this.get('data.perks.resolved').pushObject(key);
      this.attrs.payResourceCost(perk, 1, perk.costs);
    }
  }
});
