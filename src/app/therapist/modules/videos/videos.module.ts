import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosRoutingModule } from './videos-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListMyVideosComponent } from './list-my-videos/list-my-videos.component';
import { UploadVideoFormComponent } from './upload-video-form/upload-video-form.component';



@NgModule({
  declarations: [
    ListMyVideosComponent,
    UploadVideoFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedComponentsModule,
    MatPaginatorModule,
    VideosRoutingModule
  ]
})
export class VideosModule { }
