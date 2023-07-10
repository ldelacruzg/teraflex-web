import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';

//Rutas hijas
const routes:Routes =[
  {
    path: 'tasks',
    children: [
      { path: 'my-tasks', component: MyTasksComponent},
      { path: 'assign-tasks', component: AssignTasksComponent},
      { path: '**', redirectTo:'my-tasks'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TasksRoutingModule { }