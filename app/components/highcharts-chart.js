import Ember from 'ember';

export default Ember.Component.extend({
  chartData: [],
  chartOptions: {},

  setChart: Ember.observer('chartOptions.@each', 'chartData.@each', function() {
    let chart = this.get('chartOptions');
    chart.series = this.get('chartData');
    this.$().highcharts(chart);
  }).on('didInsertElement')
});
