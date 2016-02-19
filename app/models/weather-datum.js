import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('number'),
  date: DS.attr('date'),

  data_set: DS.belongsTo('data-set', { async: true }),
  station: DS.belongsTo('station', { async: true })
});
