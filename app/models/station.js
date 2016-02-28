import DS from 'ember-data';

export default DS.Model.extend({
  identifier: DS.attr('string'),
  name: DS.attr('string'),
  titlecase_name: DS.attr('string'),
  elevation_unit: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  min_date: DS.attr('date'),
  max_date: DS.attr('date')
});
