import Ember from 'ember';

export default Ember.Component.extend({
  chartData: [],
  chartOptions: {},

  didInsertElement: function() {
    var chart = {
      chart: {
        type: 'spline'
      },
      title: {
        text: null
      },
      series: this.get('chartData')
    };

    chart = Ember.merge(chart, this.get('chartOptions'));

    this.$().highcharts(chart);
  }
});
