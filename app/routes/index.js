import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('dataTypes', model.dataTypes);
    controller.set('stations', model.stations);
  },
  model: function() {
    return Ember.RSVP.hash({
      stations: this.store.findAll('station'),
      dataTypes: this.store.query('data-type', { identifier: ['EMNT', 'EMXT'] })
    });
  },

  actions: {
    getStationInfo(stationId, dataTypeId) {
      this.store.query('weather-datum', { station_id: stationId, data_type_id: dataTypeId }).then((data) => {
        this.set('controller.data', data);
      });
    }
  }
});
