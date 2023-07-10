import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialVideosComponent } from './tutorial-videos/tutorial-videos.component';


//Rutas hijas
const routes:Routes =[
  {
    path: 'help',
    children: [
      { path: 'tutorial-videos', component: TutorialVideosComponent},
      { path: '**', redirectTo:'tutorial-videos'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HelpRoutingModule { }