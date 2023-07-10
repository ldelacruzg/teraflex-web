import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLoginComponent } from './info-login/info-login.component';
import { SliderVideosComponent } from './slider-videos/slider-videos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    InfoLoginComponent,
    SliderVideosComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    InfoLoginComponent,
    SliderVideosComponent
  ]
})
export class SharedComponentsModule { }
