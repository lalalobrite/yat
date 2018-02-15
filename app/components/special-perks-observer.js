import Component from '@ember/component';

const observations = [{
  key: 'enableSpermFactories',
  message: 'Sperm production too slow. Enlist cells to help.',
  criteria: [{
    source: 'data.fertility.sperm.amount',
    greaterThan: 24
  }]
}, {
  key: 'enableTestosteroneFactories',
  message: 'Surplus protein detected. Recruit more cells to aid in testosterone production.',
  criteria: [{
    source: 'data.nutrients.protein.amount',
    greaterThan: 1000
  }]
}, {
  key: 'enableArousal',
  message: 'Sperm production acceptable. Encourage Body to engage in reproductive acts.',
  criteria: [{
    source: 'data.fertility.sperm.amount',
    greaterThan: 99
  }]
}, {
  key: 'enableRi',
  message: 'Ejaculation complete. Procreation: unknown. Lack sensory data. Gain influence over Mind and Body to confirm successful reproduction.',
  criteria: [{
    source: 'data.ri.ri.amount',
    greaterThan: 0
  }]
}, {
  key: 'enableNutrientImperative',
  message: 'Body gives too little support. Demand more resources for reproduction.',
  criteria: [{
    source: 'data.ri.ri.amount',
    greaterThan: 1
  }]
}, {
  key: 'enableNutrientSalvage',
  message: 'Destroying Body resources should provide nutrients.',
  criteria: [{
    source: 'data.nutrients.recoveries.amount',
    greaterThan: 5
  }]
}, {
  key: 'enableMind',
  message: 'Mind enjoys erogenous sensation. Exploit weakness to seize processing power for reproduction.',
  criteria: [{
    source: 'data.ri.ri.amount',
    greaterThan: 0
  }]
}, {
  key: 'enableAvatar',
  message: 'Body withholds information about itself. Use cognative resources to visualize it.',
  criteria: [{
    source: 'data.mind.cognition.amount',
    greaterThan: 25
  }]
}, {
  key: 'enableFantasy',
  message: 'Mind likes eroticism. Give Mind responsibility for arousal.',
  criteria: [{
    source: 'data.mind.cognition.amount',
    greaterThan: 50
  }]
}, {
  key: 'enableSocial',
  message: 'Procreation: still unknown. Seize control of Mind\'s social faculties to confirm reproduction.',
  criteria: [{
    source: 'data.mind.cognition.amount',
    greaterThan: 200
  }]
}, {
  key: 'enableAttractionHint',
  message: 'Gain insight into what attracts Mind.',
  criteria: [{
    source: 'data.sexuality.rejectionsAsMan.amount',
    greaterThan: 3
  }]
}, {
  key: 'enableMasculineGrowth',
  message: 'Sexual encounter: failure. Body deemed unattractive. Grow muscle and size to improve sex appeal.',
  criteria: [{
    source: 'data.sexuality.rejectionsAsMan.amount',
    greaterThan: 0
  }]
}, {
  key: 'enableMasculineGrowth2',
  message: 'Sexual encounters: failure. Must further masculinize Body.',
  criteria: [{
    source: 'data.sexuality.rejectionsAsMan.amount',
    greaterThan: 5
  }]
}, {
  key: 'enableMasculineGrowth3',
  message: 'Sexual encounters: more failure. Unlock final masculine form.',
  criteria: [{
    source: 'data.sexuality.rejectionsAsMan.amount',
    greaterThan: 15
  }]
}, {
  key: 'enableDeepGeneticScan',
  message: 'Procreation: still unknown. Consider deep genetic scan to find a solution.',
  criteria: [{
    source: 'data.sexuality.maleSexWithWomen.amount',
    greaterThan: 15
  }]
}, {
  key: 'enableSexChange',
  message: 'Deep genetic scan complete. Solution discovered. Convert from testes to ovaries. Ensure procreation by bearing own young.',
  criteria: [{
    source: 'data.perks.resolved.[]',
    resolvedIncludes: 'enableDeepGeneticScan'
  }]
}, {
  key: 'enableFeminineGrowth',
  message: 'Ovarian conversion complete. Begin preparing Body for child-bearing.',
  criteria: [{
    source: 'data.fertility.ovarianConversion.amount',
    greaterThan: 99
  }]
}, {
  key: 'enableFeminineGrowth2',
  message: 'Fertility too low. Devote more resources to child-bearing.',
  criteria: [{
    source: 'data.sexuality.femaleSexWithMen.amount',
    greaterThan: 5
  }]
}, {
  key: 'enableFeminineGrowth3',
  message: 'Fertility could be further optimized. Devote all resources to child-bearing.',
  criteria: [{
    source: 'data.sexuality.femaleSexWithMen.amount',
    greaterThan: 15
  }]
}, {
  key: 'enableVictory',
  message: 'Procreation: confirmed. Purpose fulfilled',
  criteria: [{
    source: 'data.ri.children.amount',
    greaterThan: 0
  }]
}];

export default Component.extend({
  tagName: '',

  init() {
    this._super(...arguments);

    const triggeredItems = this.get('data.perks.available').concat(this.get('data.perks.resolved'));

    observations.forEach((observation) => {
      if (triggeredItems.includes(observation.key)) return;

      const observer = function() {
        const passed = observation.criteria.every((criterion) => {
          if (criterion.greaterThan && this.get(criterion.source) <= criterion.greaterThan) return false;
          if (criterion.lessThan && this.get(criterion.source) >= criterion.lessThan) return false;
          if (criterion.resolvedIncludes && !this.get('data.perks.resolved').includes(criterion.resolvedIncludes)) return false;

          return true;
        });

        if (passed) {
          if (observation.message) this.get('data.messages').unshiftObject(observation.message);
          this.get('data.perks.available').unshiftObject(observation.key);
          this.removeObserver(...observation.criteria.map((criterion) => criterion.source), this, observer);
        }
      }

      this.addObserver(...observation.criteria.map((criterion) => criterion.source), this, observer);
    })
  }
});
