import Ember from 'ember';

export default Ember.Component.extend({
  dataSorting: ['date:asc'],
  sortedData: Ember.computed.sort('data', 'dataSorting'),

  stationSorting: ['name:asc'],
  sortedStations: Ember.computed.sort('stations', 'stationSorting')
});
