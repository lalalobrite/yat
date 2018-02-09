import { LokiJSAdapter } from 'ember-lokijs';

export default LokiJSAdapter.extend({
  databaseName: 'yat-games',
  lokiOptions: {
    adapter: new LokiIndexedAdapter(),
    autosave: true
  }
});
