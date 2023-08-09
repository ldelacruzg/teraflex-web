import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosRoutingModule } from './videos-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListMyVideosComponent } from './list-my-videos/list-my-videos.component';
import { UploadVideoFormComponent } from './upload-video-form/upload-video-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SearchRegistersPipe } from 'src/app/pipes/search-registers.pipe';
import { ViewMyVideosComponent } from './modals/view-my-videos/view-my-videos.component';

@NgModule({
  declarations: [
    ListMyVideosComponent,
    UploadVideoFormComponent,
    SearchRegistersPipe,
    ViewMyVideosComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedComponentsModule,
    MatPaginatorModule,
    VideosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ]
})
export class VideosModule { }
