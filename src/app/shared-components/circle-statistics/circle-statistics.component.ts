import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'circle-app-statistics',
  templateUrl: './circle-statistics.component.html',
  styleUrls: ['./circle-statistics.component.css', '../tasks-to-review/tasks-to-review.component.css']
})
export class CircleStatisticsComponent {

  /*ngOnInit con los datos de información del gráfico*/
  ngOnInit(){
    var options = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 410,
        type: 'pie',
      },
      labels: ['Pacientes', 'Tareas', 'Recursos locales', 'Rocarsos Externos', 'Asignaciones'],
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
