import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTherapistsComponent } from './list-therapists/list-therapists.component';
import { TherapistsRoutingModule } from './therapists-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewTherapistsDetailComponent } from './modals/view-therapists-detail/view-therapists-detail.component';
import { CreateTherapistComponent } from './create-therapist/create-therapist.component';
import { ViewCredentialsLoginComponent } from './modals/view-credentials-login/view-credentials-login.component';
import { SweetAlerts } from '../../alerts/alerts.component';
import { EditTherapistComponent } from './edit-therapist/edit-therapist.component';
import { GenerateTempPasswordComponent } from './modals/generate-temp-password/generate-temp-password.component';

@NgModule({
  declarations: [
    ListTherapistsComponent,
    ViewTherapistsDetailComponent,
    CreateTherapistComponent,
    ViewCredentialsLoginComponent,
    EditTherapistComponent,
    GenerateTempPasswordComponent,
  ],
  imports: [
    CommonModule,
    TherapistsRoutingModule,
    SharedComponentsModule,
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers:[
    SweetAlerts
  ]
})
export class TherapistsModule { }
