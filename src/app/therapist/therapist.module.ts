import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './modules/home/home-routing.module';
import { TasksRoutingModule } from './modules/tasks/tasks-routing.module';
import { PatientsRoutingModule } from './modules/patients/patients-routing.module';
import { HelpRoutingModule } from './modules/help/help-routing.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthRoutinModule } from '../auth/auth-rounting.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    TasksRoutingModule,
    PatientsRoutingModule,
    HelpRoutingModule,
    ProfileModule,
    SharedComponentsModule
  ]
})
export class TherapistModule { }
