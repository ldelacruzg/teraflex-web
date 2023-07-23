import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMyVideosComponent } from './list-my-videos/list-my-videos.component';
import { UploadVideoFormComponent } from './upload-video-form/upload-video-form.component';

//Rutas hijas
const routes: Routes = [
  {
    path: 'list-videos', component: ListMyVideosComponent
  },
  {
    path: 'upload-video', component: UploadVideoFormComponent
  },
  {
    path: "",
    redirectTo: "upload-video",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VideosRoutingModule { }