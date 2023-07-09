import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPatientsComponent } from './my-patients/my-patients.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';



@NgModule({
  declarations: [
    MyPatientsComponent,
    RegisterPatientComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MyPatientsComponent,
    RegisterPatientComponent
  ]
})
export class PatientsModule { }
