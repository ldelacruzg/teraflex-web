import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';



@NgModule({
  declarations: [
    MyTasksComponent,
    AssignTasksComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyTasksComponent,
    AssignTasksComponent
  ]
})
export class TasksModule { }
