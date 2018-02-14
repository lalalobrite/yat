import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import randomNumber from 'yat/utils/random-number';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    this.get('considerGettingOff').perform();
  },

  arousal: alias('data.mood.arousal'),

  considerGettingOff: task(function * () {
    if (this.get('arousal.amount') > randomNumber(50, 125) && (this.get('data.social.sexIdentity.amount') === 'female' || this.get('data.fertility.sperm.amount') >= 100)) {
      this.getOff();
    }

    yield timeout(3000);

    this.get('considerGettingOff').perform();
  }),

  getOff() {
    const encounterIsMale = this.get('data.social.currentEncounter.isMale');
    const encounterMasculinity = this.get('data.social.currentEncounter.masculinity');

    if (encounterIsMale !== undefined) {
      this.resolveEncounter();
    } else {
      this.resolveSelfLove()
    }
  },

  resolveSelfLove() {
    this.sexualCompletion(1);
  },

  resolveEncounter() {
    const encounterMasculinity = this.get('data.social.currentEncounter.masculinity');

    if (100 - Math.abs(this.get('data.sexuality.orientation.amount') - encounterMasculinity) > 97.5) {
      const [encounterAttractionMin, encounterAttractionMax] = this.get('data.social.currentEncounter.attractionRange.amount');
      const totalMasculinity = this.get('data.sexuality.masculinity.amount');

      if (totalMasculinity <= encounterAttractionMax && totalMasculinity >= encounterAttractionMin) {
        this.haveSex();
      }
      else this.resolveSelfLove();
    } else this.resolveSelfLove();

    this.set('data.social.currentEncounter.shouldChange', true);
  },

  haveSex() {
    const isMale = this.get('data.social.currentEncounter.isMale');
    const genderExtremeness = this.get('data.social.currentEncounter.genderExtremeness.amount')
    let sexType = `${this.get('data.sexuality.sexIdentity.amount')}SexWith`;
    let riIncrement = 1;
    if (isMale) {
      sexType += 'Men';
      if (this.get('data.sexuality.sexIdentity.amount') === 'female') riIncrement += genderExtremeness / 10;
    } else {
      sexType += 'Women';
      if (this.get('data.sexuality.sexIdentity.amount') === 'male') riIncrement += genderExtremeness / 10;
    }

    this.incrementProperty(`data.sexuality.${sexType}.amount`);
    this.sexualCompletion(riIncrement);
  },

  sexualCompletion(riIncrement) {
    const ejaculate = Math.min(this.get('data.fertility.sperm.amount'), randomNumber(500, 2000));
    this.decrementProperty('data.fertility.sperm.amount', ejaculate);
    this.incrementProperty('data.ri.ri.amount', riIncrement);
    this.set('arousal.amount', 0);
  }
});
