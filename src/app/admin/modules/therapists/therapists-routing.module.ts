import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTherapistsComponent } from './list-therapists/list-therapists.component';
import { CreateTherapistComponent } from './create-therapist/create-therapist.component';

const routes: Routes = [
    {
        path: 'list-therapists', component: ListTherapistsComponent
    },
    {
        path: 'create-therapist', component: CreateTherapistComponent
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