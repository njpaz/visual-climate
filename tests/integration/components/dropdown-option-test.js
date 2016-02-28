import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dropdown-option', 'Integration | Component | dropdown option', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{dropdown-option}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it displays the custom option path properties', function(assert) {
  var item = {label: 'Option Label', value: 'option_value'};

  this.set('item', item);
  this.render(hbs`{{dropdown-option item=item optionValuePath='value' optionLabelPath='label'}}`);

  assert.equal(this.$().text().trim(), item.label);
  assert.equal(this.$().find('option').val(), item.value);
});
