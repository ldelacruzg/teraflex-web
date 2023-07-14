import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OptionsHomeComponent } from './options-home/options-home.component';
import { MyTasksComponent } from '../tasks/my-tasks/my-tasks.component';
import { CreateTaskComponent } from '../tasks/create-task/create-task.component';
import { AssignTasksComponent } from '../tasks/assign-tasks/assign-tasks.component';
import { MyPatientsComponent } from '../patients/my-patients/my-patients.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
        {
          path: 'my-tasks', component: MyTasksComponent
        },
        {
          path: 'assign-tasks', component: AssignTasksComponent,
        },
        {
          path: 'my-patients', component: MyPatientsComponent,
        },
        {
          path: 'options-home', component: OptionsHomeComponent
        }
      ]
      }
    ] 
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }