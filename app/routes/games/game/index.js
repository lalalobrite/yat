import Route from '@ember/routing/route';
import { task, timeout } from 'ember-concurrency';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.get('autosave').perform();
  },

  autosave: task(function * () {
    yield timeout(1000);

    this.saveGame();

    this.get('autosave').perform();
  }),

  saveGame() {
    const game = this.get('controller.model');
    game.set('date', Date.now());
    game.save();
  },

  actions: {
    willTransition() {
      this.saveGame();
    }
  }
});
