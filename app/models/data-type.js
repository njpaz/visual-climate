import DS from 'ember-data';

export default DS.Model.extend({
  identifier: DS.attr('string'),
  name: DS.attr('string'),
  min_date: DS.attr('date'),
  max_date: DS.attr('date')
});
 // :identifier, :min_date, :max_date, :name, :data_category_id, :location_id
