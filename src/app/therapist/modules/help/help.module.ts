import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialVideosComponent } from './tutorial-videos/tutorial-videos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    TutorialVideosComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    TutorialVideosComponent
  ]
})
export class HelpModule { }
