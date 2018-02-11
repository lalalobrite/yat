import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('special-nutrient-eater', 'Integration | Component | special nutrient eater', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{special-nutrient-eater}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#special-nutrient-eater}}
      template block text
    {{/special-nutrient-eater}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
