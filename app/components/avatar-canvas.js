import Component from '@ember/component';
import { get } from '@ember/object';
import { assign } from '@ember/polyfills';
import { isPresent, typeOf } from '@ember/utils';

export default Component.extend({
  classNames: ['avatar-canvas'],

  didInsertElement() {
    this._super(...arguments);
    this.set('canvasGroup', da.getCanvasGroup(this.element.id, {
      width: this.element.clientHeight * 0.4,
      height: this.element.clientHeight,
    }));

    this.set('daInstance', new da.Player(assign({
      parts: [
        da.Part.create(da.Part.VaginaHuman),
        da.Part.create(da.Part.TesticlesHuman),
        da.Part.create(da.Part.PenisHuman)
      ]
    }, this.get('avatar'))));

    this.setupObservers();
    this.draw();
  },

  draw() {
    da.draw(this.get('canvasGroup'), this.get('daInstance'));
  },

  setupObservers(...paths) {
    const joinedPath = paths.join('.');
    Object.keys(this.get(isPresent(joinedPath) ? `avatar.${joinedPath}` : 'avatar')).forEach((childPath) => {
      const fullJoinedPath = [...paths, childPath].join('.');
      const childElement = this.get(`avatar.${fullJoinedPath}`);

      switch (typeOf(childElement)) {
        case 'object': return this.setupObservers(...paths, childPath);
        case 'array': return this.addObserver(`avatar.${fullJoinedPath}.[]`, () => {
          switch (childPath) {
            case 'clothes': {
              const daInstance = this.get('daInstance');
              daInstance.clothes.forEach((instance) => {
                 daInstance.removeClothing(instance);
              });
              this.get('avatar.clothes').forEach((item) => {
                const instance = da.Clothes.create(get(da, item.type), get(da, item.options));
                daInstance.wearClothing(instance);
              });
              return this.draw();
            }
          }
        });
        default: return this.addObserver(`avatar.${fullJoinedPath}`, () => {
          this.set(`daInstance.${fullJoinedPath}`, this.get(`avatar.${fullJoinedPath}`));
          this.draw();
        });
      }
    });
  }
});
