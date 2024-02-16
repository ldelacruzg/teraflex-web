import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterMyPatientsComponent } from './register-my-patients/register-my-patients.component';
import { ListMyPatientsComponent } from './list-my-patients/list-my-patients.component';
import { EditMyPatientsComponent } from './edit-my-patients/edit-my-patients.component';
import { ViewProgressMyPatientsComponent } from './view-progress-my-patients/view-progress-my-patients.component';
import { ListTreatmentsMyPatientsComponent } from './list-treatments-my-patients/list-treatments-my-patients.component';
import { RegisterTreatmentMyPatientsComponent } from './register-treatment-my-patients/register-treatment-my-patients.component';
import { EditTreatmentComponent } from './edit-treatment/edit-treatment.component';


//Rutas hijas
const routes: Routes = [
  {
    path: 'edit-treatment', component: EditTreatmentComponent
  },
  {
    path: 'register-treatment', component: RegisterTreatmentMyPatientsComponent
  },
  {
    path: 'treatments', component: ListTreatmentsMyPatientsComponent
  },
  {
    path: 'my-patients', component: ListMyPatientsComponent
  },
  {
    path: 'register-patients', component: RegisterMyPatientsComponent
  },
  {
    path: 'edit-patient', component: EditMyPatientsComponent
  },
  {
    path: 'view-progress', component: ViewProgressMyPatientsComponent
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