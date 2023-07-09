import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TasksModule } from '../tasks/tasks.module';
import { OptionsHomeComponent } from './options-home/options-home.component';
import { PatientsModule } from '../patients/patients.module';
import { HelpModule } from '../help/help.module';



@NgModule({
  declarations: [
    DashboardComponent,
    OptionsHomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TasksModule,
    PatientsModule,
    HelpModule
  ]
})
export class HomeModule { }
