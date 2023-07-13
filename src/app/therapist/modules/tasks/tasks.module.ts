import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';


@NgModule({
  declarations: [
    MyTasksComponent,
    AssignTasksComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatPaginatorModule,
    SharedComponentsModule
  ],
  exports: [
    MyTasksComponent,
    AssignTasksComponent
  ]
})
export class TasksModule { }
