import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialVideosComponent } from './tutorial-videos/tutorial-videos.component';



@NgModule({
  declarations: [
    TutorialVideosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TutorialVideosComponent
  ]
})
export class HelpModule { }
