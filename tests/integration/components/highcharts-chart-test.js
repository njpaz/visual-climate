import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('highcharts-chart', 'Integration | Component | highcharts chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{highcharts-chart}}`);

  assert.equal(this.$().text().trim(), 'Created with Highcharts 4.2.3Highcharts.com');
});
