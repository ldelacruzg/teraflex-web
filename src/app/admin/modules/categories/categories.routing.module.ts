import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoriesComponent } from './list-categories/list-categories.component';

const routes: Routes = [
    {
        path: 'list-categories', component: ListCategoriesComponent
    },
    {
        path: "",
        redirectTo: "list-categories",
        pathMatch: "full"
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class CategoriesRoutingModule { }