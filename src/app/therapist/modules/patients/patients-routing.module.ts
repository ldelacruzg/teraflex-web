import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ListMyPatientsComponent } from './list-my-patients/list-my-patients.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'my-patients', component: ListMyPatientsComponent
  },
  {
    path: 'register-patients', component: RegisterPatientComponent
  },
  {
    path: "",
    redirectTo: "my-patients",
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
export class PatientsRoutingModule { }