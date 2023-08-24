import { Component } from '@angular/core';
import { DashboardComponent } from 'src/app/therapist/modules/home/dashboard/dashboard.component';
import { ApiResponseGetLastTasksCompletedByPatientsI, GetDetailLastTasksCompletedByPatientsI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { ApiResponseGetMyInformationI } from 'src/app/therapist/interfaces/profile.interface';
import { ProfileService } from 'src/app/therapist/services/profile.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewDetailLastTasksCompletedComponent } from '../view-detail-last-tasks-completed/view-detail-last-tasks-completed.component';

@Component({
  selector: 'app-tasks-to-review',
  templateUrl: './tasks-to-review.component.html',
  styleUrls: ['./tasks-to-review.component.css']
})
export class TasksToReviewComponent {
  /*Variables*/
  therapistID: number = 0;
  arrayLastTasksCompletedByPatients: GetDetailLastTasksCompletedByPatientsI[] = [];

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private tasksService: MyTasksService,
    private myProfileService: ProfileService,
    private modal: NgbModal
  ){}

  /*ngOnInit*/
  ngOnInit(){
    this.getMyInformation();
  }

  /*Método que obtiene la información personal de un terapeuta, para mostrar en el perfil*/
  getMyInformation(){
    this.myProfileService.getMyInformation(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseGetMyInformationI) => {
         this.getLastTasksCompletedByPatients(data.data.id);
        }
      })
  }

  /*Método que obtiene el listado con las últimas tareas completadas por los pacientes*/
  getLastTasksCompletedByPatients(therapistID: number){
    this.tasksService.getLastTasksCompletedByPatients(this.headers.getHeaders(), therapistID)
    .subscribe({
      next: (data: ApiResponseGetLastTasksCompletedByPatientsI) => {
        this.arrayLastTasksCompletedByPatients = data.data;
      }
    })
  }

  openModalViewDetailLastTasksCompleted(ViewDetailLastTasksCompleted: any, task: GetDetailLastTasksCompletedByPatientsI){
    this.modal.open(ViewDetailLastTasksCompleted, { size: 'md', centered: true });
    ViewDetailLastTasksCompletedComponent.taskDetailCompletedRecived = task;
  }

  /*Icons to use*/
  iconToReview = iconos.faCalendarCheck;
  iconViewDetails = iconos.faEye;
}
