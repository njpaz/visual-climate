import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('weather-chart', 'Unit | Component | weather chart', {
  needs: ['component:ember-dropdown', 'component:visual-chart'],
  unit: true
});

test('it sets the title based on the selected station', function(assert) {
  assert.expect(1);

  const stations = [
    Ember.Object.create({ id: 1, titlecase_name: 'Everytown' }),
    Ember.Object.create({ id: 2, titlecase_name: 'Town Central' })
  ];

  let component = this.subject();

  component.set('stations', stations);
  component.set('selectedStation', stations[0].id);

  assert.equal(component.get('title'), 'Monthly Temperatures at Everytown');
});

test('it calculates and formats the chart data', function(assert) {
  assert.expect(6);

  const data = [
    Ember.Object.create({ date: new Date(2000, 0, 1), in_c: 2, in_f: 8, station: { id: 1 }, data_type: { identifier: 'EMNT' } }),
    Ember.Object.create({ date: new Date(2000, 0, 1), in_c: 5, in_f: 10, station: { id: 1 }, data_type: { identifier: 'EMXT' } }),
    Ember.Object.create({ date: new Date(2000, 1, 1), in_c: 3, in_f: 9, station: { id: 1 }, data_type: { identifier: 'EMNT' } })
  ];
  const selectedValue = 'in_c';

  let component = this.subject();

  component.set('selectedStation', 1);
  component.set('selectedValue', selectedValue);
  component.set('data', data);

  assert.equal(component.get('chartData.firstObject.name'), 'Minimum', 'it set the minimum data name correctly');
  assert.equal(component.get('chartData.lastObject.name'), 'Maximum', 'it set the maximum data name correctly');
  assert.equal(component.get('chartData.firstObject.data.length'), 2, 'it assigned all the minimum data');
  assert.equal(component.get('chartData.lastObject.data.length'), 1, 'it assigned all the maximum data');
  assert.equal(component.get('chartData.firstObject.data.firstObject.date'), data[0].date, 'it assigned the data date');
  assert.equal(component.get('chartData.firstObject.data.firstObject.value'), data[0][selectedValue], 'it assigned the correct value');
});
