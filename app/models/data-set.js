import DS from 'ember-data';

export default DS.Model.extend({
  identifier: DS.attr('string'),
  name: DS.attr('string'),
  min_date: DS.attr('date'),
  max_date: DS.attr('date'),

  weather_data: DS.hasMany('weather-datum', { async: true })
});
