import Route from '@ember/routing/route';

export default Route.extend({
  afterModel(model) {
    model.destroyRecord();
    this.transitionTo('games.index');
  }
});
