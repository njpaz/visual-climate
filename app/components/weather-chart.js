import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'panel-default'],
  dataTypes: [],

  dataSorting: ['date:asc'],
  sortedData: Ember.computed.sort('data', 'dataSorting'),

  stationSorting: ['name:asc'],
  sortedStations: Ember.computed.sort('stations', 'stationSorting'),

  obsStation: Ember.observer('selectedStation', 'selectedDataType', function() {
    this.sendAction(this.get('getStationInfo'), this.get('selectedStation'), this.get('selectedDataType'));
  }),

  selectedValue: 'in_fahrenheit',
  selectedStation: Ember.computed('sortedStations.[]', function(key, value) {
    return value;
  }),
  selectedDataType: Ember.computed('dataTypes.[]', function(key, value) {
    return value;
  }),
  selectedValueLabel: Ember.computed('selectedValue', function() {
    let selectedValue = this.get('selectedValue');
    let value = this.get('selectValues').findBy('value', selectedValue);
    if (value) {
      return value.label;
    }
  }),
  selectValues: [{
    value: 'in_fahrenheit', label: 'Fahrenheit'
  }, {
    value: 'in_celsius', label: 'Celsius'
  }],

  title: Ember.computed('selectedStation.titlecase_name', function() {
    let selectedStation = this.get('sortedStations').findBy('id', this.get('selectedStation'));

    if (Ember.isEmpty(selectedStation)) {
      return 'Monthly Temperatures';
    } else {
      let stationName = selectedStation.get('titlecase_name');
      return `Monthly Temperatures at ${stationName}`;
    }
  }),

  chartData: Ember.computed('sortedData.@each.id', 'selectedValue', function() {
    let selectedValue = this.get('selectedValue');
    let selectedStation = this.get('selectedStation');
    let selectedDataType = this.get('selectedDataType');
    let dataType = this.get('dataTypes').findBy('id', selectedDataType);
    let data = this.get('sortedData');
    let color;

    let temps = data.filter(function(datum) { return (datum.get('data_type.id') === selectedDataType) && (datum.get('station.id') === selectedStation); });
    let tempValues = temps.map(function(datum) { return { date: datum.get('date'), value: datum.get(selectedValue) }; });

    if (dataType) {
      dataType = dataType.get('name');
    }

    if (!Ember.isEmpty(tempValues)) {
      color = '#000';
    }

    return [{
      name: dataType,
      color: color,
      data: tempValues
    }];
  })
});
