import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoLoginComponent } from './info-login/info-login.component';
import { LastLoginsComponent } from './last-logins/last-logins.component';
import { TasksToReviewComponent } from './tasks-to-review/tasks-to-review.component';
import { SliderVideosComponent } from './slider-videos/slider-videos.component';
import { ChatIAComponent } from './chat-ia/chat-ia.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchRegistersPipe } from './pipes/search-registers.pipe';
import { CreditsInfoComponent } from './credits-info/credits-info.component';
import { CircleStatisticsComponent } from './circle-statistics/circle-statistics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LinearStatisticsComponent } from './linear-statistics/linear-statistics.component'

@NgModule({
  declarations: [
    InfoLoginComponent,
    SliderVideosComponent,
    LastLoginsComponent,
    TasksToReviewComponent,
    ChatIAComponent,
    SpinnerComponent,
    SearchRegistersPipe,
    CreditsInfoComponent,
    CircleStatisticsComponent,
    LinearStatisticsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule
  ],
  exports:[
    InfoLoginComponent,
    LastLoginsComponent,
    TasksToReviewComponent,
    SliderVideosComponent,
    ChatIAComponent,
    SpinnerComponent,
    SearchRegistersPipe,
    CreditsInfoComponent,
    CircleStatisticsComponent,
    LinearStatisticsComponent
  ]
})
export class SharedComponentsModule { }
