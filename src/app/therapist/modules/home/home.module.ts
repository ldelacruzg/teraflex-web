import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TasksModule } from '../tasks/tasks.module';
import { OptionsHomeComponent } from './options-home/options-home.component';
import { PatientsModule } from '../patients/patients.module';
import { HelpModule } from '../help/help.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProfileModule } from '../profile/profile.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    OptionsHomeComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FontAwesomeModule,
    AppRoutingModule,
    TasksModule,
    PatientsModule,
    HelpModule,
    ProfileModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class HomeModule { }
