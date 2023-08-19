import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTherapistsComponent } from './list-therapists/list-therapists.component';
import { TherapistsRoutingModule } from './therapists-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ListTherapistsComponent
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
  ]
})
export class TherapistsModule { }
