import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

//Rutas hijas
const routes:Routes =[
  {
    path: 'home',
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: '**', redirectTo:'dashboard'}
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