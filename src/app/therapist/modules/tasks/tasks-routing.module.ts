import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'my-tasks', component: MyTasksComponent
  },
  {
    path: 'create-task', component: CreateTaskComponent
  },
  {
    path: 'assign-tasks', component: AssignTasksComponent
  },
  {
    path: "",
    redirectTo: "my-tasks",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule { }