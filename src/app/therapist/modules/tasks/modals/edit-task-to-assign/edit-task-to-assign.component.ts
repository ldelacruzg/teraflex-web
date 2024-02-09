import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignTasksComponent } from '../../assign-tasks/assign-tasks.component';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import {
  ApiResponseGetTaskByIdI,
  TaskDetailByIdI,
} from 'src/app/therapist/interfaces/my-tasks.interface';
import { BodyTaskToAssignI } from 'src/app/therapist/interfaces/assigments.interface';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-task-to-assign',
  templateUrl: './edit-task-to-assign.component.html',
  styleUrls: ['./edit-task-to-assign.component.css'],
})
export class EditTaskToAssignComponent {
  /*Variables*/
  static taskID: number;
  taskDetailForm!: FormGroup;
  taskDetail!: TaskDetailByIdI;
  expRegTime = /^([0-5]?[0-9]):([0-5][0-9])$/;

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private tasksService: MyTasksService,
    public modal: NgbModal
  ) {}

  /*ngOnInit*/
  ngOnInit() {
    this.createFormTaskDetail();
    this.getTaskDetailById();
  }

  /*Método que obtiene el detalle de una tarea según el ID*/
  getTaskDetailById() {
    this.tasksService
      .getTaskDetailById(
        this.headers.getHeaders(),
        EditTaskToAssignComponent.taskID
      )
      .subscribe({
        next: (data: ApiResponseGetTaskByIdI) => {
          this.taskDetail = data.data;
          this.taskDetailForm
            .get('title')
            ?.setValue(this.taskDetail.task.title);
          this.taskDetailForm
            .get('description')
            ?.setValue(this.taskDetail.task.description);
        },
      });
  }

  /*Método que crea el formulario*/
  createFormTaskDetail() {
    this.taskDetailForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      dueDate: [this.getToday(), [Validators.required]],
      repetitions: [1, [Validators.required, Validators.min(1)]],
      timePerRepetition: ['00:00', [Validators.required, Validators.pattern(this.expRegTime)]],
      series: [1, [Validators.required, Validators.min(1)]],
      breakTime: ['00:00', [Validators.pattern(this.expRegTime)]],
      description: ['', [Validators.required]],
    });
  }

  /*Método que obtiene los datos de la tarea editada y los manda al componente de asignar*/
  addTaskEdited() {
    if (this.taskDetailForm.invalid) {
      this.taskDetailForm.markAllAsTouched();
      return;
    }

    let taskDetailTemp: BodyTaskToAssignI = {
      description: this.taskDetailForm.get('description')?.value,
      estimatedTime: Number(this.taskDetailForm.get('estimatedTime')?.value),
      id: this.taskDetail.task.id,
    };
    // Buscar el índice del elemento en el vector
    const existingIndex = AssignTasksComponent.arrayTasksDetailToSend.findIndex(
      (item) => item.id === taskDetailTemp.id
    );
    // Si la tarea existe en el vector, eliminarla
    if (existingIndex !== -1) {
      AssignTasksComponent.arrayTasksDetailToSend.splice(existingIndex, 1);
      AssignTasksComponent.arrayTasksDetailToSend.push(taskDetailTemp);
    } else {
      // Si la tarea no existe, agregarla al vector
      AssignTasksComponent.arrayTasksDetailToSend.push(taskDetailTemp);
    }
    this.modal.dismissAll();
  }

  getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  /*Icons to use*/
  iconTask = iconos.faFileLines;
}
