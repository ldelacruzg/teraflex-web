import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPatientsComponent } from './my-patients/my-patients.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientsRoutingModule } from './patients-routing.module';

@NgModule({
  declarations: [
    MyPatientsComponent,
    RegisterPatientComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ],
  exports:[
    MyPatientsComponent,
    RegisterPatientComponent
  ]
})
export class PatientsModule { }
