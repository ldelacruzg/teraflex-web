import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CategoriesRoutingModule } from './categories.routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SweetAlerts } from '../../alerts/alerts.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { ViewCategoriesDetailComponent } from './modals/view-categories-detail/view-categories-detail.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';

@NgModule({
  declarations: [
    ListCategoriesComponent,
    CreateCategoriesComponent,
    ViewCategoriesDetailComponent,
    EditCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FontAwesomeModule,
    RouterModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers: [
    SweetAlerts
  ]
})
export class CategoriesModule { }
