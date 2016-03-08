import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('extremes-chart', 'Integration | Component | extremes chart', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{extremes-chart}}`);

  assert.equal(this.$().find('.highcharts-container').length, 1, 'a chart rendered');
});
