import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewPatientsDetailComponent } from './modals/view-patients-detail/view-patients-detail.component';

@NgModule({
  declarations: [
    ListPatientsComponent,
    ViewPatientsDetailComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    RouterModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    FontAwesomeModule
  ]
})
export class PatientsModule { }
