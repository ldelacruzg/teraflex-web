import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseGetTaskByIdI, TaskDetailByIdI } from 'src/app/therapist/interfaces/my-tasks.interface';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-task-detail',
  templateUrl: './view-task-detail.component.html',
  styleUrls: ['./view-task-detail.component.css']
})
export class ViewTaskDetailComponent {

  /*Variables*/
  static taskID: number = 0;
  taskDetail: TaskDetailByIdI = {
    id: 0,
    title: "--",
    description: "--",
    estimatedTime: 0,
    isPublic: true,
    createdAt: "--",
    updatedAt: "--",
    categories: [
      {
        id: 0,
        name: "--",
      }
    ],
    files: [
      {
        id: 0,
        url: "--",
        type: "--"
      }
    ]
  };

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private tasksService: MyTasksService,
    private headers: DashboardComponent
  ) { }

  /*ngOnInit*/
  ngOnInit(){
    this.getTaskDetailById();
  }

  /*Método que obtiene el detalle de una tarea según el ID*/
  getTaskDetailById(){
    this.tasksService.getTaskDetailById(this.headers.getHeaders(), ViewTaskDetailComponent.taskID)
    .subscribe({
      next: (data: ApiResponseGetTaskByIdI) => {
        this.taskDetail = data.data;
      }
    });   
  }

  /*Icons to use*/
  iconTask = iconos.faFileLines;
  iconArrowRight = iconos.faCaretRight;
  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;
}