import Ember from 'ember';

export default Ember.Controller.extend({
  data: Ember.computed.alias('model.data'),
  dataTypes: Ember.computed.alias('model.dataTypes'),
  stations: Ember.computed.alias('model.stations'),

  dataSorting: ['date:asc'],
  sortedData: Ember.computed.sort('data', 'dataSorting'),

  stationSorting: ['name:asc'],
  sortedStations: Ember.computed.sort('stations', 'stationSorting')
});
