import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      data: this.store.query('weather-datum', { station_id: [96154, 39153], data_type_id: [384, 386] }),
      stations: this.store.query('station', { id: [96154, 39153] }),
      dataTypes: this.store.query('data-type', { id: [384, 386] })
    });
  }
});
