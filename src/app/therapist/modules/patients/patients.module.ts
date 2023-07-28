import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { ListMyPatientsComponent } from './list-my-patients/list-my-patients.component';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    RegisterPatientComponent,
    ListMyPatientsComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule,
    MatPaginatorModule
  ],
  exports:[
    RegisterPatientComponent
  ]
})
export class PatientsModule { }
