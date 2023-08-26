import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLoginComponent } from './info-login/info-login.component';
import { SliderVideosComponent } from './slider-videos/slider-videos.component';
import { LastLoginsComponent } from './last-logins/last-logins.component';
import { LastTasksCompletedComponent } from './last-tasks-completed/last-tasks-completed.component';
import { ChatIAComponent } from './chat-ia/chat-ia.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchRegistersPipe } from './pipes/search-registers.pipe';
import { CircleStatisticsComponent } from './circle-statistics/circle-statistics.component';
import { LinearStatisticsComponent } from './linear-statistics/linear-statistics.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CreditsInfoDetailsComponent } from './credits-info-details/credits-info-details.component';
import { ViewDetailLastTasksCompletedComponent } from './view-detail-last-tasks-completed/view-detail-last-tasks-completed.component';
import { LastPatientsComponent } from './last-patients/last-patients.component';

@NgModule({
  declarations: [
    InfoLoginComponent,
    SliderVideosComponent,
    LastLoginsComponent,
    LastTasksCompletedComponent,
    ChatIAComponent,
    SpinnerComponent,
    SearchRegistersPipe,
    CreditsInfoDetailsComponent,
    CircleStatisticsComponent,
    LinearStatisticsComponent,
    ViewDetailLastTasksCompletedComponent,
    LastPatientsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule
  ],
  exports:[
    InfoLoginComponent,
    LastLoginsComponent,
    LastTasksCompletedComponent,
    SliderVideosComponent,
    ChatIAComponent,
    SpinnerComponent,
    SearchRegistersPipe,
    CreditsInfoDetailsComponent,
    CircleStatisticsComponent,
    LinearStatisticsComponent,
    LastPatientsComponent
  ]
})
export class SharedComponentsModule { }
