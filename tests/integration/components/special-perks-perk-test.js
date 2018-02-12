import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('special-perks-perk', 'Integration | Component | special perks perk', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{special-perks-perk}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#special-perks-perk}}
      template block text
    {{/special-perks-perk}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
