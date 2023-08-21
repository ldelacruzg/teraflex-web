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
          path: 'categories',
          loadChildren:()=>import("../categories/categories.module").then(m=>m.CategoriesModule)
        },
        {
          path: 'patients',
          loadChildren:()=>import("../patients/patients.module").then(m=>m.PatientsModule)
        },
        {
          path: 'options-home', component: OptionsHomeComponent
        },
        {
          path: 'help', 
          loadChildren:()=>import("../help/help.module").then(m=>m.HelpModule)
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