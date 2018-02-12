import Component from '@ember/component';

const observations = [{
  key: 'enableSpermFactories',
  criteria: [{
    source: 'data.fertility.sperm.amount',
    greaterThan: 20
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

          return true;
        });

        if (passed) {
          this.get('data.perks.available').unshiftObject(observation.key);
          this.removeObserver(...observation.criteria.map((criterion) => criterion.source), this, observer);
        }
      }

      this.addObserver(...observation.criteria.map((criterion) => criterion.source), this, observer);
    })
  }
});
