import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Route.extend({
  router: service(),

  afterModel(model) {
    this._super(...arguments);
    this.get('autosave').perform(model);
  },

  autosave: task(function * (game) {
    yield timeout(1000);

    if (this.get('router.currentRouteName') !== this.get('routeName')) return;

    this.saveGame(game);

    this.get('autosave').perform(game);
  }).restartable(),

  saveGame(game) {
    game.set('date', Date.now());
    game.save();
  },

  actions: {
    willTransition() {
      this.saveGame(this.get('controller.model'));
    }
  }
});
