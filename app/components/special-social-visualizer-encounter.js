import Component from '@ember/component';

export default Component.extend({
  classNames: ['avatar-canvas'],

  didInsertElement() {
    this._super(...arguments);
    this.set('canvasGroup', da.getCanvasGroup(this.element.id, {
      width: this.element.clientHeight * 0.4,
      height: this.element.clientHeight,
    }));

    this.draw();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.get('canvasGroup')) this.draw();
  },

  draw() {
    da.draw(this.get('canvasGroup'), this.get('avatar'));
  }
});
