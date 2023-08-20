import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OptionsHomeComponent } from './options-home/options-home.component';


const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
        {
          path: 'therapists',
          loadChildren:()=>import("../therapists/therapists.module").then(m=>m.TherapistsModule)
        },
        {
          path: 'options-home', component: OptionsHomeComponent
        },
      ]
      },
    ] 
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }