import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('number'),
  date: DS.attr('date'),
  in_fahrenheit: DS.attr('number'),
  in_celsius: DS.attr('number'),

  data_set: DS.belongsTo('data-set', { async: true }),
  data_type: DS.belongsTo('data-type', { async: true }),
  station: DS.belongsTo('station', { async: true })
});
