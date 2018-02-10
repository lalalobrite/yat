import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import randomNumber from 'yat/utils/random-number';

export default Route.extend({
  beforeModel() {
    this.transitionTo('games.game', this.store.createRecord('game', {
      date: Date.now(),
      gameData: {}
    }).save());
  }
});
