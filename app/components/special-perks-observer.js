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
    greaterThan: 24
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
    greaterThan: 20
  }]
}, {
  key: 'enableNutrientImperative',
  message: 'Body gives too little support. Demand more resources for reproduction.',
  criteria: [{
    source: 'data.ri.ri.amount',
    greaterThan: 0
  }, {
    source: 'data.nutrients.fat.amount',
    lessThan: 100
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
