import Ember from 'ember';
import d3 from 'npm:d3';

export default Ember.Component.extend({
  tagName: 'svg',
  width: 1000,
  height: 500,

  didInsertElement() {
    this._insertChart();
  },

  chartDates: Ember.computed('chartData.@each.data', function() {
    let chartData = this.get('chartData');
    return chartData.reduce(function(reducedDates, curData) {
      curData.data.forEach(function(cd) {
        reducedDates.push(new Date(cd.date));
      });

      return reducedDates;
    }, []);
  }),
  chartValues: Ember.computed('chartData.@each.data', function() {
    let chartData = this.get('chartData');
    return chartData.reduce(function(reducedValues, curData) {
      curData.data.forEach(function(cd) {
        reducedValues.push(new Date(cd.value));
      });

      return reducedValues;
    }, []);
  }),

  _insertChart() {
    const margin = {top: 20, right: 20, bottom: 20, left: 50};
    let width = this.get('width');
    let height = this.get('height');
    let chartData = this.get('chartData');
    let chartDates = this.get('chartDates');
    let chartValues = this.get('chartValues');

    let x = d3.time.scale()
        .domain([d3.min(chartDates), d3.max(chartDates)])
        .range([margin.left, width - margin.right]);

    let y = d3.scale.linear()
        .domain([d3.min(chartValues), d3.max(chartValues)])
        .range([height - margin.top, margin.bottom]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.time.format('%b %Y'))
        .orient('bottom');

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    let chart = d3.select(`#${this.get('elementId')}`)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    chart.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

    let line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); })
        .interpolate('basis');

    chartData.forEach(function(ad) {
      chart.append('path')
          .attr('d', line(ad.data))
          .attr('stroke', ad.color)
          .attr('stroke-width', 2)
          .attr('fill', 'none');

    });
  }
});
