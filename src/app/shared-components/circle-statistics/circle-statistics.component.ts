import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ApiResponseGetCircleStatistics } from 'src/app/shared-components/interfaces/statistics.interface';
import { DashboardComponent } from 'src/app/therapist/modules/home/dashboard/dashboard.component';
import { StatisticsService } from 'src/app/shared-components/services/statistics.service';

@Component({
  selector: 'circle-app-statistics',
  templateUrl: './circle-statistics.component.html',
  styleUrls: ['./circle-statistics.component.css', '../last-tasks-completed/last-tasks-completed.component.css']
})
export class CircleStatisticsComponent {
  /*Variables*/
  arrayTagAgeRange: string[] = [];
  arrayQuantity: number[] = [];

  /*constructor*/
  constructor(
    private statisticsService: StatisticsService,
    private headers: DashboardComponent
  ){}


  /*ngOnInit*/
  ngOnInit(){
   this.getCircleStatisticsAgePatients();
   this.createCircleChart();
  }

  /*Método que consume el servicio, para obtener los valores que se mostraran en el gráfico*/
  getCircleStatisticsAgePatients() {
    this.statisticsService.getCircleStatisticsAgePatients(this.headers.getHeaders())
    .subscribe({
      next: (data: ApiResponseGetCircleStatistics) => {
        data.data.forEach(element => {
          this.arrayTagAgeRange.push(element.tag);
          this.arrayQuantity.push(element.quantity);
        });
        this. createCircleChart();
      }
    })
  }

  /*Método que arma el gráfico circular*/
  createCircleChart() {
    var options = {
      series: this.arrayQuantity,
      chart: {
        width: 410,
        type: 'pie',
      },
      labels: this.arrayTagAgeRange,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%', // Cambiar el ancho a ocupar el 100% del contenedor
            height: 'auto', // Altura automática para que se ajuste correctamente
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false, // Ocultar las etiquetas
                },
              },
            },
          },
        }
      }]
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
}
