import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoCreditsComponent } from './info-credits/info-credits.component';

const routes: Routes = [
    {
        path: 'credits-info', component: InfoCreditsComponent
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
export class CreditsRoutingModule { }