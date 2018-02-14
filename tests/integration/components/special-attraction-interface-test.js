import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('special-attraction-interface', 'Integration | Component | special attraction interface', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{special-attraction-interface}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#special-attraction-interface}}
      template block text
    {{/special-attraction-interface}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
