import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ApiResponseGetTasksByCategories } from '../interfaces/statistics.interface';
import { DashboardComponent } from 'src/app/admin/modules/home/dashboard/dashboard.component';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-linear-statistics',
  templateUrl: './linear-statistics.component.html',
  styleUrls: ['./linear-statistics.component.css', '../tasks-to-review/tasks-to-review.component.css']
})
export class LinearStatisticsComponent {
  /*Variables*/
  arrayCategories: string[] = [];
  arrayValueCategories: number[] = [];
  
  /*constrcutor*/
  constructor(
    private headers: DashboardComponent,
    private statisticsService: StatisticsService
  ){}

  /*ngOnit con los datos de información del gráfico*/
  ngOnInit() {
    this.getTasksByCategories();
  }

  /*Método que consume el servicio que obtiene la cantidad de tareas por categorías*/
  getTasksByCategories(){
    this.statisticsService.getLinearStatisticsTasks(this.headers.getHeaders())
    .subscribe({
      next: (data: ApiResponseGetTasksByCategories) => {
        data.data.forEach((element, index) => {
          if (index < 4) {  
            this.arrayCategories.push(element.categoryName);
            this.arrayValueCategories.push(element.totalTask);
          }
        });
        this.createLinearChart();
      }
    })
  }
  

  /*Método que crea el gráfico de barras con la información*/
  createLinearChart(){
    var options = {
      series: [{
        data: this.arrayValueCategories,
      }],
      chart: {
        type: 'bar',
        height: 250
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.arrayCategories
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();
  }
}
