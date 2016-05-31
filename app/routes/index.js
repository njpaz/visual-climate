import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('data', model.data);
    controller.set('dataTypes', model.dataTypes);
    controller.set('stations', model.stations);
  },
  model: function() {
    return Ember.RSVP.hash({
      data: this.store.query('weather-datum', { station_identifier: ['GHCND:AYM00089606', 'GHCND:USC00042319'], data_type_identifier: ['EMNT', 'EMXT'] }),
      stations: this.store.query('station', { identifier: ['GHCND:AYM00089606', 'GHCND:USC00042319']}),
      dataTypes: this.store.query('data-type', { identifier: ['EMNT', 'EMXT'] })
    });
  }
});
