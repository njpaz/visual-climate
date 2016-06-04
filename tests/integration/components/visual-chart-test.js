import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visual-chart', 'Integration | Component | visual chart', {
  integration: true,
  beforeEach() {
    const chartData = [{
    name: 'Minimum',
    color: 'blue',
    data: [{
      date: new Date(2000, 0, 1),
      value: 2.5
    }, {
      date: new Date(2000, 1, 1),
      value: 7
    }, {
      date: new Date(2000, 2, 1),
      value: 4
    }, {
      date: new Date(2000, 3, 1),
      value: 6
    }, {
      date: new Date(2000, 4, 1),
      value: 2
    }, {
      date: new Date(2000, 5, 1),
      value: 1
    }, {
      date: new Date(2000, 6, 1),
      value: 2.4
    }, {
      date: new Date(2000, 7, 1),
      value: 5.4
    }]
  }];

  this.set('chartData', chartData);
  }
});

test('it renders the x axis correctly', function(assert) {
  assert.expect(4);

  this.render(hbs`{{visual-chart chartData=chartData}}`);

  assert.equal(this.$('.x.axis').length, 1, 'it has one x axis');
  assert.equal(this.$('.x.axis .tick text').eq(0).text(), 'Jan 2000', 'it renders the first tick text correctly');
  assert.equal(this.$('.x.axis .tick text').eq(4).text(), 'May 2000', 'it renders other ticks correctly');
  assert.equal(this.$('.x.axis .tick').length, 8, 'it renders all ticks');
});

test('it renders the y axis correctly', function(assert) {
  assert.expect(4);

  this.render(hbs`{{visual-chart chartData=chartData}}`);

  assert.equal(this.$('.y.axis').length, 1, 'it has one x axis');
  assert.equal(this.$('.y.axis .tick text').eq(0).text(), '1.0', 'it renders the first tick text correctly');
  assert.equal(this.$('.y.axis .tick text').eq(4).text(), '3.0', 'it renders other ticks correctly');
  assert.equal(this.$('.y.axis .tick').length, 13, 'it renders all ticks');
});

test('it renders one data line', function(assert) {
  assert.expect(1);

  this.render(hbs`{{visual-chart chartData=chartData}}`);

  assert.equal(this.$('.data-line').length, 1, 'one data line rendered');
});

test('it renders two data lines', function(assert) {
  assert.expect(1);

  const chartData = [{
    name: 'Minimum',
    color: 'blue',
    data: [{
      date: new Date(2000, 0, 1),
      value: 2.5
    }, {
      date: new Date(2000, 1, 1),
      value: 7
    }, {
      date: new Date(2000, 2, 1),
      value: 4
    }, {
      date: new Date(2000, 3, 1),
      value: 6
    }, {
      date: new Date(2000, 4, 1),
      value: 2
    }, {
      date: new Date(2000, 5, 1),
      value: 1
    }, {
      date: new Date(2000, 6, 1),
      value: 2.4
    }, {
      date: new Date(2000, 7, 1),
      value: 5.4
    }]
  }, {
    name: 'Maximum',
    color: 'red',
    data: [{
      date: new Date(2000, 0, 1),
      value: 17
    }, {
      date: new Date(2000, 1, 1),
      value: 15
    }, {
      date: new Date(2000, 2, 1),
      value: 12
    }, {
      date: new Date(2000, 3, 1),
      value: 16
    }, {
      date: new Date(2000, 4, 1),
      value: 10
    }, {
      date: new Date(2000, 5, 1),
      value: 14
    }, {
      date: new Date(2000, 6, 1),
      value: 18.6
    }, {
      date: new Date(2000, 7, 1),
      value: 19.5
    }]
  }];

  this.set('chartData', chartData);
  this.render(hbs`{{visual-chart chartData=chartData}}`);

  assert.equal(this.$('.data-line').length, 2, 'two data lines are rendered');
});

test('it applies the correct color to the data line', function(assert) {
  assert.expect(1);

  this.render(hbs`{{visual-chart chartData=chartData}}`);

  assert.equal(this.$('.data-line').attr('stroke'), 'blue', 'the data line is assigned the correct stroke color');
});

test('it displays a legend', function(assert) {
  assert.expect(2);

  this.render(hbs`{{visual-chart chartData=chartData}}`);

  assert.equal(this.$('.legend rect').attr('fill'), 'blue', 'it displays the data color');
  assert.equal(this.$('.legend text').text(), 'Minimum', 'it lists the data label next to the data color box');
});
