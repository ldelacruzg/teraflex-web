import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseEditCategoryI, bodyCreateCategoryI } from 'src/app/admin/interfaces/categories.interface';
import { CategoriesService } from 'src/app/admin/services/categories.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class EditCategoriesComponent {
  /*Variables*/
  editCategoryForm!: FormGroup;
  spinnerStatus: boolean = false;
  optionStatusSelected: string = "";
  static categoryDetail: any = {
    name: "",
    status: true,
    description: ""
  };

  /*constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createCategoryForm();
    this.getCategoryDetail();
  }

  /*Método que crea el formulario*/
  createCategoryForm() {
    this.editCategoryForm = this.formBuilder.group({
      name: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      status: ['',
        [
          Validators.required,
        ]
      ],
      description: ['',
        [
          Validators.required,
        ]
      ],
      createdByUser: ['ADMIN']
    })
  }

  /*Método que obtiene la información de la categoría para mostrarla en el form*/
  getCategoryDetail() {
    this.editCategoryForm.get('name')?.setValue(EditCategoriesComponent.categoryDetail.name);
    this.optionStatusSelected = EditCategoriesComponent.categoryDetail.status;
    this.editCategoryForm.get('description')?.setValue(EditCategoriesComponent.categoryDetail.description);
  }

  /*Método que edita la categoría*/
  editCategory() {
    this.spinnerStatus = false;
    this.categoriesService.editCategory(this.headers.getHeaders(), this.getDataToEdit(), EditCategoriesComponent.categoryDetail.id)
      .subscribe({
        next: (data: ApiResponseEditCategoryI) => {
          this.spinnerStatus = true;
          this.showToastSuccess(data.message, "Éxito")
          this.router.navigateByUrl("/admin/home/dashboard/categories/list-categories")
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo editar la categoría");
        }
      });
  }

  /*Método que obtiene la data del formulario, para editarla*/
  getDataToEdit() {
    let bodyCategory: bodyCreateCategoryI = {
      name: this.editCategoryForm.get('name')?.value,
      status: this.optionStatusSelected == "true" ? true : false,
      description: this.editCategoryForm.get('description')?.value,
    }
    return bodyCategory;
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }
  
  /*Icons to use*/
  iconCategory = iconos.faFilePen;
}
