import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPatientsComponent } from './my-patients/my-patients.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'my-patients', component: MyPatientsComponent
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
  ]
})
export class PatientsRoutingModule { }