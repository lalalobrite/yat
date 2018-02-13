import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('special-social-visualizer-encounter', 'Integration | Component | special social visualizer encounter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{special-social-visualizer-encounter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#special-social-visualizer-encounter}}
      template block text
    {{/special-social-visualizer-encounter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
