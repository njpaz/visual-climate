import Ember from 'ember';

export default Ember.Component.extend({
  dataSorting: ['date:asc'],
  sortedData: Ember.computed.sort('data', 'dataSorting'),

  stationSorting: ['name:asc'],
  sortedStations: Ember.computed.sort('stations', 'stationSorting'),

  selectedValue: 'in_celsius',
  selectedStation: Ember.computed.alias('sortedStations.firstObject.id'),

  chartData: Ember.computed('sortedData.[]', 'selectedValue', 'selectedStation', function() {
    const EXTREME_MIN_TEMP = 'EMNT';
    const EXTREME_MAX_TEMP = 'EMXT';

    let data = this.get('sortedData');
    let selectedValue = this.get('selectedValue');
    let stationId = this.get('selectedStation');

    let minTemps = data.filter(function(datum) { return datum.get('data_type.identifier') === EXTREME_MIN_TEMP && datum.get('station.id') === stationId; });
    let maxTemps = data.filter(function(datum) { return datum.get('data_type.identifier') === EXTREME_MAX_TEMP && datum.get('station.id') ===  stationId; });

    let minDataValues = minTemps.map(function(datum) { return { date: datum.get('date'), value: datum.get(selectedValue) }; });
    let maxDataValues = maxTemps.map(function(datum) { return { date: datum.get('date'), value: datum.get(selectedValue) }; });

    return [{
      name: 'Minimum',
      color: 'blue',
      data: minDataValues
    }, {
      name: 'Maximum',
      color: 'red',
      data: maxDataValues
    }];
  })
});
