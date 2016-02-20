import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      data: this.store.query('weather-datum', { station_id: 96154, data_type_id: [384, 386] }),
      dataTypes: this.store.query('data-type', { ids: [384, 386] })
    });
  }
});
