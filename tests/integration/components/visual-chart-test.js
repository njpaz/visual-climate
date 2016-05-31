import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visual-chart', 'Integration | Component | visual chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visual-chart}}`);

  assert.equal(this.$().find('.highcharts-container').length, 1, 'a chart rendered');
});
