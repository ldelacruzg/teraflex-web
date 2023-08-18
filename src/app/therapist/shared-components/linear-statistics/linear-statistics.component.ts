import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-linear-statistics',
  templateUrl: './linear-statistics.component.html',
  styleUrls: ['./linear-statistics.component.css', '../tasks-to-review/tasks-to-review.component.css']
})
export class LinearStatisticsComponent {

  /*ngOnit con los datos de información del gráfico*/
  ngOnInit(){
    var options = {
      series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
      chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    };
    var chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();
  }
}
