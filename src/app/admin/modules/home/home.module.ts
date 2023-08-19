import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OptionsHomeComponent } from './options-home/options-home.component';
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
  ]
})
export class HomeModule { }
