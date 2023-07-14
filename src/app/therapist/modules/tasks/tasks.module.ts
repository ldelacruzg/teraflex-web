import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    MyTasksComponent,
    AssignTasksComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatPaginatorModule,
    SharedComponentsModule,
    AppRoutingModule
  ],
  exports: [
    MyTasksComponent,
    AssignTasksComponent
  ]
})
export class TasksModule { }
