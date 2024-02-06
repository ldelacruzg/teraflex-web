import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseTaskDetailExtendAssignToPatientI } from 'src/app/therapist/interfaces/assigments.interface';
import { AssigmentsService } from 'src/app/therapist/services/assignments.service';
import { ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { TimeConversion } from 'src/utils/time.conversion.service';

@Component({
  selector: 'app-view-detail-progress-my-patients',
  templateUrl: './view-detail-progress-my-patients.component.html',
  styleUrls: ['./view-detail-progress-my-patients.component.css']
})
export class ViewDetailProgressMyPatientsComponent {
  /*Variables*/
  static taskDetailAssignId: number;
  taskDetailAssign: any = {
    assignmentId: 0,
    treatment: {
      id: 0,
      title: "--",
    },
    task: {
      id: 0,
      title: "--",
      description: "--",
      assignmentDate: "--",
      expirationDate: "--",
      performanceDate: "--",
    },
    setting: {
      timePerRepetition: 0,
      repetitions: 0,
      breakTime: 0,
      series: 0,
    },
    multimedia: [{
      id: 0,
      url: "--",
      title: "--",
      description: "--",
    }]
  };

  /*constructor*/
  constructor(
    public modal: NgbModal,
    private headers: DashboardComponent,
    private assignmentsService: AssigmentsService,
    private toastr: ToastrService,
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.getTaskDetailAssign();
  }

  /*Método que verifica si se pasó o no la fecha de vencimiento*/
  isTaskVencida(dueDateRecived: string): boolean {
    const dueDate = new Date(dueDateRecived);
    const currentlyDate = new Date();
    return dueDate < currentlyDate;
  }

  /*Obtiene el detalle de la tarea asignada al paciente*/
  getTaskDetailAssign() {
    this.assignmentsService.getTaskDetailAssignToPatient(this.headers.getHeaders(), ViewDetailProgressMyPatientsComponent.taskDetailAssignId)
      .subscribe({
        next: (data: ApiResponseTaskDetailExtendAssignToPatientI) => {
          this.taskDetailAssign = data.data;
          this.taskDetailAssign.setting.timePerRepetition = TimeConversion.convertToTime(this.taskDetailAssign.setting.timePerRepetition);
          this.taskDetailAssign.setting.breakTime = TimeConversion.convertToTime(this.taskDetailAssign.setting.breakTime);
        },
        error: (error) => {
          this.showToastError("No se pudieron obtener el detalle de la tarea", "Error");
        }
      })
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconDetailProgress = iconos.faListUl;
  iconArrowRight = iconos.faCaretRight;
}
