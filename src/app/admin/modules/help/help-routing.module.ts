import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListVideosHelpComponent } from './list-videos-help/list-videos-help.component';
import { ViewVideosHelpComponent } from 'src/app/therapist/modules/help/view-videos-help/view-videos-help.component';

const routes: Routes = [
    {
        path: 'tutorial-videos', component: ListVideosHelpComponent
    },
    {
        path: 'video-detail', component: ViewVideosHelpComponent
    },
    {
        path: "",
        redirectTo: "tutorial-videos",
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
export class HelpRoutingModule { }