import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTherapistsComponent } from './list-therapists/list-therapists.component';

const routes: Routes = [
    {
        path: 'list-therapists', component: ListTherapistsComponent
    },
    {
        path: "",
        redirectTo: "list-therapists",
        pathMatch: "full"
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class TherapistsRoutingModule { }