import Ember from 'ember';

export default Ember.Controller.extend({
  data: Ember.computed.alias('model.data'),
  dataTypes: Ember.computed.alias('model.dataTypes'),
  sorting: ['date:asc'],
  sortedData: Ember.computed.sort('data', 'sorting'),

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

  chartData: Ember.computed('sortedData.[]', 'selectedOption', function() {
    var data = this.get('sortedData');
    var selectedOption = this.get('selectedOption');

    var minTemps = data.filter(function(datum) { return datum.get('data_type.id') === '384'; });
    var maxTemps = data.filter(function(datum) { return datum.get('data_type.id') === '386'; });

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
