import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import randomNumber from 'yat/utils/random-number';

const hairColors = {
  black: {
    hairHue: 0,
    hairLightness: 0,
    hairSaturation: 0
  },
  brown: {
    hairHue: 0,
    hairLightness: 25,
    hairSaturation: 25
  },
  red: {
    hairHue: 0,
    hairLightness: 25,
    hairSaturation: 100
  },
  blonde: {
    hairHue: 45,
    hairLightness: 60,
    hairSaturation: 100
  },
  gray: {
    hairHue: 360,
    hairLightness: 50,
    hairSaturation: 0
  },
  white: {
    hairHue: 360,
    hairLightness: 100,
    hairSaturation: 0
  }
}

export default Route.extend({
  model() {
    return this.store.createRecord('game', {
      date: Date.now(),
      gameData: {
        name: '',
        skin: {
          hairHue: {
            amount: 0
          },
          hairLightness: {
            amount: 0
          },
          hairSaturation: {
            amount: 0
          },
          skin: {
            amount: 13
          },
          hairColor: computed({
            get() {
              return Object.keys(hairColors).find((key) => ['hairHue', 'hairLightness', 'hairSaturation'].every((quality) => this[quality].amount === hairColors[key][quality]));
            },
            set(key, value) {
              ['hairHue', 'hairLightness', 'hairSaturation'].forEach((quality) => this[quality].amount = hairColors[value][quality]);

              return value;
            }
          })
        }
      }
    });
  },

  actions: {
    begin(model) {
      model.save();

      this.transitionTo('games.game', model);
    }
  }
});
