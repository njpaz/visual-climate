import Ember from 'ember';

export default Ember.Component.extend({
  sortedData: [],
  sortedStations: [],

  chartDefault: {
    chart: {
      type: 'spline'
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    title: {
      text: null
    },
    xAxis: {
      type: 'datetime',
      title: 'Date'
    },
    yAxis: {
      title: {}
    }
  },

  selectedValue: 'in_fahrenheit',

  selectValues: [{
    value: 'in_fahrenheit', label: 'Fahrenheit'
  }, {
    value: 'in_celsius', label: 'Celsius'
  }],

  chartData: Ember.computed('sortedData.[]', 'selectedValue', 'selectedStation', function() {
    const MIN_DATA_TYPE = 'EMNT';
    const MAX_DATA_TYPE = 'EMXT';

    let data = this.get('sortedData');
    let selectedValue = this.get('selectedValue');
    let stationId = this.get('selectedStation');

    let minTemps = data.filter(function(datum) { return datum.get('data_type.identifier') === MIN_DATA_TYPE && datum.get('station.id') === stationId; });
    let maxTemps = data.filter(function(datum) { return datum.get('data_type.identifier') === MAX_DATA_TYPE && datum.get('station.id') ===  stationId; });

    let minDataValues = minTemps.map(function(datum) { return [datum.get('date').getTime(), datum.get(selectedValue)]; });
    let maxDataValues = maxTemps.map(function(datum) { return [datum.get('date').getTime(), datum.get(selectedValue)]; });

    return [{
      name: 'Minimum',
      color: 'blue',
      data: minDataValues
    }, {
      name: 'Maximum',
      color: 'red',
      data: maxDataValues
    }];
  }),

  chartOptions: Ember.computed('selectedValue', function() {
    const TITLE_MAPPINGS = {
      in_fahrenheit: 'F',
      in_celsius: 'C'
    };
    let currentTemp = TITLE_MAPPINGS[this.get('selectedValue')];
    let options = this.get('chartDefault');

    options['yAxis']['title']['text'] = `Temperature (${currentTemp})`;

    return options;
  }),

  selectedStation: Ember.computed('sortedStations.[]', {
    get() {
      return this.get('sortedStations.firstObject.id');
    },

    set(key, value) {
      return value;
    }
  }),

  title: Ember.computed('selectedStation.titlecase_name', function() {
    let selectedStation = this.get('sortedStations').findBy('id', this.get('selectedStation'));

    if (Ember.isEmpty(selectedStation)) {
      return 'Monthly Temperatures';
    } else {
      let stationName = selectedStation.get('titlecase_name');
      return `Monthly Temperatures at ${stationName}`;
    }
  })
});
