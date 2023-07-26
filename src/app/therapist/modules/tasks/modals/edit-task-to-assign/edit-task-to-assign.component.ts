import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseGetTaskByIdI, TaskDetailByIdI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { AssignTasksComponent } from '../../assign-tasks/assign-tasks.component';

@Component({
  selector: 'app-edit-task-to-assign',
  templateUrl: './edit-task-to-assign.component.html',
  styleUrls: ['./edit-task-to-assign.component.css']
})
export class EditTaskToAssignComponent {
  /*Variables*/
  static taskID: number;
  taskDetail!: TaskDetailByIdI;
  taskDetailForm!: FormGroup;

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private tasksService: MyTasksService,
    private headers: DashboardComponent,
    private formBuilder: FormBuilder,
  ) { }

  /*ngOnInit*/
  ngOnInit(){
    this.createFormTaskDetail();
    this.getTaskDetailById();
  }

  /*Método que obtiene el detalle de una tarea según el ID*/
  getTaskDetailById(){
    this.tasksService.getTaskDetailById(this.headers.getHeaders(), EditTaskToAssignComponent.taskID)
    .subscribe({
      next: (data: ApiResponseGetTaskByIdI) => {
        this.taskDetail = data.data;
        this.taskDetailForm.get('title')?.setValue(this.taskDetail.title);
        this.taskDetailForm.get('estimatedTime')?.setValue(this.taskDetail.estimatedTime);
        this.taskDetailForm.get('description')?.setValue(this.taskDetail.description);
      }
    });   
  }

  /*Método que crea el formulario*/
  createFormTaskDetail(){
    this.taskDetailForm = this.formBuilder.group({
      title: [''],
      estimatedTime: [''],
      description: ['',],
    });
  }

  /*Método que obtiene los datos de la tarea editada y los manda al componente de asignar*/
  addTaskEdited(){
    let taskDetailTemp: any = {
      id: this.taskDetail.id,
      title: this.taskDetailForm.get('title')?.value,
      estimatedTime: this.taskDetailForm.get('estimatedTime')?.value,
      description: this.taskDetailForm.get('description')?.value,
    } 

    console.log("DETALLE DE TAREA EDITADOOOO");
    console.log(taskDetailTemp);
    AssignTasksComponent.arrayTasksDetailToSend.push(taskDetailTemp);
  }

  /*Icons to use*/
  iconTask = iconos.faFileLines;

}
