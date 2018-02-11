import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('panel-stat-info', 'Integration | Component | panel stat info', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{panel-stat-info}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#panel-stat-info}}
      template block text
    {{/panel-stat-info}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
