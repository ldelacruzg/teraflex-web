import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';

const routes: Routes = [
    {
        path: 'list-categories', component: ListCategoriesComponent
    },
    {
        path: 'create-category', component: CreateCategoriesComponent
    },
    {
        path: 'edit-category', component: EditCategoriesComponent
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