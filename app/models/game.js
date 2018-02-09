import DS from 'ember-data';
import { LokiJSModelMixin } from 'ember-lokijs';

export default DS.Model.extend(LokiJSModelMixin, {
  gameData: DS.attr(),
  date: DS.attr('date')
});
