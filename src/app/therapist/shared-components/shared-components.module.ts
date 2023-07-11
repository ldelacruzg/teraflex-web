import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoLoginComponent } from './info-login/info-login.component';
import { LastLoginsComponent } from './last-logins/last-logins.component';
import { TasksToReviewComponent } from './tasks-to-review/tasks-to-review.component';
import { SliderVideosComponent } from './slider-videos/slider-videos.component';
import { ChatIAComponent } from './chat-ia/chat-ia.component';

@NgModule({
  declarations: [
    InfoLoginComponent,
    SliderVideosComponent,
    LastLoginsComponent,
    TasksToReviewComponent,
    ChatIAComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    InfoLoginComponent,
    LastLoginsComponent,
    TasksToReviewComponent,
    SliderVideosComponent,
    ChatIAComponent
  ]
})
export class SharedComponentsModule { }
