import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPatientsComponent } from './list-patients/list-patients.component';

const routes: Routes = [
    {
        path: 'list-patients', component: ListPatientsComponent
    },
    {
        path: "",
        redirectTo: "list-patients",
        pathMatch: "full"
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class PatientsRoutingModule { }