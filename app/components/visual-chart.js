import Ember from 'ember';
import d3 from 'npm:d3';

export default Ember.Component.extend({
  tagName: 'svg',
  width: 1000,
  height: 500,
  margins: {top: 20, right: 20, bottom: 20, left: 25},
  chart: null,
  chartX: null,
  chartY: null,
  chartLine: null,
  chartTip: null,
  chartLegend: null,

  didInsertElement() {
    Ember.run.once('afterRender', () => {
      this._initChart();
      this._setChartAxes();
      this._populateChart();
    });
  },

  resetChartOnDataChange: Ember.observer('chartData.@each.data', function() {
    let chart = this.get('chart');

    chart.selectAll('g.axis').remove();
    chart.selectAll('path').remove();
    chart.selectAll('circle').remove();
    chart.selectAll('.axis-label').remove();

    Ember.run.once(() => {
      this._initChart();
      this._setChartAxes();
      this._populateChart();
    });
  }),

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
  labelText: Ember.computed('selectedValueLabel', function() {
    let valueLabel = this.get('selectedValueLabel');
    let labelText = 'Temperatures';

    if (valueLabel) {
      labelText += ` (in °${valueLabel.charAt(0)})`;
    }

    return labelText;
  }),
  formatTime: Ember.computed(function() {
    return d3.time.format('%b %Y');
  }),

  _initChart() {
    let margins = this.get('margins');
    let width = this.get('width');
    let height = this.get('height');

    let tip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    let chart = d3.select(`#${this.get('elementId')}`)
        .attr('width', width + margins.left + margins.right)
        .attr('height', height + margins.top + margins.bottom)
      .append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    let legend = chart.append('g')
        .attr('class', 'legend')
        .attr('width', 100)
        .attr('height', 100)
        .attr('transform', 'translate(-260,20)');

    this.set('chart', chart);
    this.set('chartTip', tip);
    this.set('chartLegend', legend);
  },
  _setChartAxes() {
    let chart = this.get('chart');
    let chartDates = this.get('chartDates');
    let chartValues = this.get('chartValues');
    let margins = this.get('margins');
    let width = this.get('width');
    let height = this.get('height');
    let labelText = this.get('labelText');

    let x = d3.time.scale()
        .domain([d3.min(chartDates), d3.max(chartDates)])
        .range([margins.left, width - margins.right]);

    let y = d3.scale.linear()
        .domain([d3.min(chartValues), d3.max(chartValues)])
        .range([height - margins.top, margins.bottom]);

    let line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); })
        .interpolate('basis');

    let xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.time.format('%b %Y'))
        .orient('bottom');

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    chart.append('text')
        .attr('class', 'y axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', (0 - margins.left))
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text(labelText);

    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    chart.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${margins.left},0)`)
        .call(yAxis);

    this.set('chartY', y);
    this.set('chartX', x);
    this.set('chartLine', line);
  },
  _populateChart() {
    let chart = this.get('chart');
    let chartData = this.get('chartData');
    let formatTime = this.get('formatTime');
    let legend = this.get('chartLegend');
    let line = this.get('chartLine');
    let tip = this.get('chartTip');
    let x = this.get('chartX');
    let y = this.get('chartY');
    let width = this.get('width');
    const legendBoxDimension = 10;
    const legendPadding = 14;
    const leftTipPad = 14;
    const topTipPad = 28;

    legend.selectAll('rect')
        .data(chartData)
      .enter().append('rect')
        .attr('class', 'legend-box')
        .attr('x', width / 3)
        .attr('y', function(d, i) { return i * (legendBoxDimension * 2); })
        .attr('width', legendBoxDimension)
        .attr('height', legendBoxDimension)
        .attr('fill', function(d) { return d.color; });

    legend.selectAll('text')
        .data(chartData)
      .enter().append('text')
        .attr('x', (width / 3) + legendPadding)
        .attr('y', function(d, i) { return (i * (legendBoxDimension * 2)) + (legendBoxDimension - 1); })
        .text(function(d) { return d.name; });

    chartData.forEach(function(ad) {
      chart.append('path')
          .attr('class', 'data-line')
          .attr('d', line(ad.data))
          .attr('stroke', ad.color);

      chart.selectAll('dot')
          .data(ad.data)
        .enter().append('circle')
          .attr('r', 3.5)
          .attr('cx', function(d) { return x(d.date); })
          .attr('cy', function(d) { return y(d.value); })
          .style('fill', ad.color)
          .on('mouseover', function(d) {
            let formattedTip = `<strong>${formatTime(d.date)}</strong><br />${d.value}°`;

            d3.select(this).attr('r', 7).style('opacity', 0.5);

            tip.transition()
                .duration(200)
                .style('opacity', 0.9);
            tip.html(formattedTip)
                .style('left', (d3.event.pageX + leftTipPad) + 'px')
                .style('top', (d3.event.pageY - topTipPad) + 'px');
          })
          .on('mouseout', function() {
            d3.select(this).attr('r', 3.5).style('opacity', 1);

            tip.transition()
                .duration(500)
                .style('opacity', 0);
          });
    });
  }
});
