import DS from 'ember-data';
import { LokiJSModelMixin } from 'ember-lokijs';

export default DS.Model.extend(LokiJSModelMixin, {
  date: DS.attr('date'),
  gameData: DS.attr()
});
