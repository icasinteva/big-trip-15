import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderChart = (container, { labels, data, formatter, title }) => new Chart(container, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels,
    datasets: [{
      data,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter,
      },
    },
    title: {
      display: true,
      text: title,
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    dataset: {
      barThickness: 44,
      minBarLength: 80,
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});

export { renderChart };
