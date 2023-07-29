import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListMyPatientsComponent } from './list-my-patients/list-my-patients.component';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterMyPatientsComponent } from './register-my-patients/register-my-patients.component';

@NgModule({
  declarations: [
    RegisterMyPatientsComponent,
    ListMyPatientsComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    RegisterMyPatientsComponent
  ]
})
export class PatientsModule { }
