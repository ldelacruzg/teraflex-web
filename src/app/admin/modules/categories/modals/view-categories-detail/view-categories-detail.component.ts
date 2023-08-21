import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseCreateCategoryI, responseCategoryCreatedI } from 'src/app/admin/interfaces/categories.interface';
import { CategoriesService } from 'src/app/admin/services/categories.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-categories-detail',
  templateUrl: './view-categories-detail.component.html',
  styleUrls: ['./view-categories-detail.component.css']
})
export class ViewCategoriesDetailComponent {
  /*Variables*/
  static categoryID: number = 0;
  categoryDetail: responseCategoryCreatedI = {
    id: 0,
    name: "--",
    description: "--",
    status: true,
    createdById: 0,
    updatedById: 0,
    createdAt: "--",
    updatedAt: "--"
  }

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private headers: DashboardComponent,
    private categoryService: CategoriesService
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.getCategoryDetail();
  }

  /*Método que obtiene el detalle de la categoría por su ID*/
  getCategoryDetail() {
    this.categoryService.getCategoryById(this.headers.getHeaders(), ViewCategoriesDetailComponent.categoryID)
      .subscribe({
        next: (data: ApiResponseCreateCategoryI) => {
          this.categoryDetail = data.data;
        }
      });
  }

  /*Icons to use*/
  iconCategory = iconos.faClipboardList;
  iconArrowRight = iconos.faCaretRight;
}
