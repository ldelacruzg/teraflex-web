import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SweetAlerts } from '../../alerts/alerts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatStepperIntl, MatStepperModule } from '@angular/material/stepper';

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
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MyTasksComponent,
    AssignTasksComponent
  ],
  providers:[
    SweetAlerts,
   /*  {provide: MatStepperIntl, useClass: MyIntl}, */
  ]
})
export class TasksModule { }