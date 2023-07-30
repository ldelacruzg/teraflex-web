import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ViewTaskDetailComponent } from './modals/view-task-detail/view-task-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditTaskToAssignComponent } from './modals/edit-task-to-assign/edit-task-to-assign.component';
import { EditMyTasksComponent } from './edit-my-tasks/edit-my-tasks.component';
import { ListMyTasksComponent } from './list-my-tasks/list-my-tasks.component';

@NgModule({
  declarations: [
    ListMyTasksComponent,
    AssignTasksComponent,
    CreateTaskComponent,
    ViewTaskDetailComponent,
    EditTaskToAssignComponent,
    EditMyTasksComponent
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
    ToastrModule.forRoot(),
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    ListMyTasksComponent,
    AssignTasksComponent
  ],
  providers:[
    SweetAlerts,
   /*  {provide: MatStepperIntl, useClass: MyIntl}, */
  ]
})
export class TasksModule { }
