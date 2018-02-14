import Component from '@ember/component';
import { computed, get, observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import attraction from 'yat/utils/attraction-schema';
import randomNumber from 'yat/utils/random-number';
import randomElement from 'yat/utils/random-element';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: '',

  shouldChangeAvatar: observer('data.social.currentEncounter.shouldChange', function() {
    if (this.get('data.social.currentEncounter.shouldChange')) {
      this.set('data.social.currentEncounter.shouldChange', false);
      this.notifyPropertyChange('avatar');
    }
  }),

  avatar: computed(function() {
    const orientation = this.get('data.sexuality.orientation.amount');
    const orientationVariance = this.get('data.sexuality.orientationVariance.amount');
    const gender = randomNumber(orientation - orientationVariance, orientation + orientationVariance) < 50 ? 'femme' : 'masc';
    const attractionKeys = Object.keys(attraction);
    const extremeLimit = randomNumber(1, attractionKeys.length);
    const extremeParts = Array(extremeLimit).fill(null).reduce((parts) => {
      let part = randomElement(attractionKeys);
      while(parts.includes(part)) {
        part = randomElement(attractionKeys);
      }

      parts.push(part);

      return parts;
    }, []);
    let totalMasculinity = 0;
    let totalWeight = 0;
    const basedim = attractionKeys.reduce((basedim, key) => {
      let masculinity = randomNumber(orientation - orientationVariance, orientation + orientationVariance);
      masculinity = gender === 'femme' ? masculinity * 2 : (masculinity - 50) * 2;
      masculinity = Math.max(0, Math.min(100, masculinity));
      if (!extremeParts.includes(key) && (masculinity < 25 || masculinity > 75)) masculinity = masculinity < 50 ? masculinity + ((50 - masculinity) / 2) : 50 + ((masculinity - 50) / 2);
      else if (!extremeParts.includes(key)) masculinity = masculinity < 50 ? masculinity / 2 : masculinity;

      totalMasculinity += masculinity * attraction[key][gender].weight;
      totalWeight += attraction[key][gender].weight;

      if (attraction[key].isFemme) masculinity = 100 - masculinity;
      else if (attraction[key].isAndro) masculinity = randomNumber(0, 100);

      const min = attraction[key][gender].min;
      const max = attraction[key][gender].max;
      const delta = max - min;
      const ratio = 100 / delta;

      basedim[key] = attraction[key][gender].options ? randomElement(attraction[key][gender].options) : Math.round((masculinity / ratio) + min);

      return basedim;
    }, {});

    next(() => {
      const averageMasculinity = totalMasculinity / totalWeight;
      this.set('data.social.currentEncounter.isMale', gender === 'masc');
      this.set('data.social.currentEncounter.masculinity', (averageMasculinity + (gender === 'masc' ? 100 : 0)) / 2);
    });

    return new da.Player({
      name: '',
      basedim,
      clothes: [],
      decorativeParts: [],
      faceParts: [],
      parts: [
        da.Part.create(da.Part.VaginaHuman),
        da.Part.create(da.Part.TesticlesHuman),
        da.Part.create(da.Part.PenisHuman)
      ],
      Mods: {
        browBotCurl: 6,
        eyeTilt: 5,
        eyeTopSize: 0,
        lipTopCurve: 30,
        lipTopSize: 10,
        lipBotSize: 0,
        lipWidth: -100,
        lipCupidsBow: -10,
        breastPerkiness: 7,
        eyeBotSize: 4,
        arousal: 0,
      },
    });
  })
});
