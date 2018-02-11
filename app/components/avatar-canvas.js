import Component from '@ember/component';
import { get } from '@ember/object';
import { isPresent, typeOf } from '@ember/utils';

export default Component.extend({
  classNames: ['avatar-canvas'],

  didInsertElement() {
    this._super(...arguments);
    this.set('canvasGroup', da.getCanvasGroup(this.element.id, {
      width: this.element.clientHeight * 0.4,
      height: this.element.clientHeight,
    }));

    this.set('daInstance', new da.Player({
      name: '',
      basedim: {},
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
    }));

    this.setupObservers();
    this.draw();
  },

  draw() {
    da.draw(this.get('canvasGroup'), this.get('daInstance'));
  },

  setupObservers(...paths) {
    ['fat', 'muscle', 'skeletal', 'skin'].forEach((category) => {
      Object.keys(this.get(`data.${category}`)).forEach((attribute) => {
        this.set(`daInstance.basedim.${attribute}`, this.get(`data.${category}.${attribute}.amount`));

        this.addObserver(`data.${category}.${attribute}.amount`, () => {
          this.set(`daInstance.basedim.${attribute}`, this.get(`data.${category}.${attribute}.amount`));
          this.draw();
        });
      });
    });
  }
});
