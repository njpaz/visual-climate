import Ember from 'ember';

export default Ember.Controller.extend({
  data: Ember.computed.alias('model.data'),
  dataTypes: Ember.computed.alias('model.dataTypes'),
  stations: Ember.computed.alias('model.stations'),

  title: Ember.computed('selectedStation.titlecase_name', function() {
    var selectedStation = this.get('stations').findBy('id', this.get('selectedStation'));
    var stationName = selectedStation.get('titlecase_name');

    return 'Monthly Temperatures at ' + stationName;
  }),

  dataSorting: ['date:asc'],
  sortedData: Ember.computed.sort('data', 'dataSorting'),

  stationSorting: ['name:asc'],
  sortedStations: Ember.computed.sort('stations', 'stationSorting'),

  selectedStation: Ember.computed('sortedStations.[]', {
    get() {
      return this.get('sortedStations.firstObject.id');
    },

    set(key, value) {
      return value;
    }
  }),

  selectedOption: 'in_fahrenheit',
  selectOptions: [{
    value: 'in_fahrenheit', label: 'Fahrenheit'
   }, {
    value: 'in_celsius', label: 'Celsius'
   }],

  chartOptions: Ember.computed('selectedOption', function() {
    var titleMappings = {
      in_fahrenheit: 'F',
      in_celsius: 'C'
    };
    var currentTemp = titleMappings[this.get('selectedOption')];

    var options = {
      xAxis: {
        type: 'datetime',
        title: 'Date'
      },
      yAxis: {
        title: {}
      }
    };

    options['yAxis']['title']['text'] = `Temperature (${currentTemp})`;

    return options;
  }),

  chartData: Ember.computed('sortedData.[]', 'selectedOption', 'selectedStation', function() {
    var data = this.get('sortedData');
    var selectedOption = this.get('selectedOption');
    var stationId = this.get('selectedStation');

    var minTemps = data.filter(function(datum) { return datum.get('data_type.identifier') === 'EMNT' && datum.get('station.id') === stationId; });
    var maxTemps = data.filter(function(datum) { return datum.get('data_type.identifier') === 'EMXT' && datum.get('station.id') ===  stationId; });

    var minDataValues = minTemps.map(function(datum) {
      return [datum.get('date').getTime(), datum.get(selectedOption)];
    });
    var maxDataValues = maxTemps.map(function(datum) {
      return [datum.get('date').getTime(), datum.get(selectedOption)];
    });

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
