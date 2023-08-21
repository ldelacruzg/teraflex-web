import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseCreateCategoryI, bodyCreateCategoryI } from 'src/app/admin/interfaces/categories.interface';
import { CategoriesService } from 'src/app/admin/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class CreateCategoriesComponent {
  /*Variables*/
  categoryForm!: FormGroup;
  spinnerStatus: boolean = false;
  optionStatusSelected: string = "";

  /*constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private categoryService: CategoriesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  /*ngOnInit()*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createCategoryForm();
  }

  /*Método que crea el formulario*/
  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
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

  /*Método que manda a registrar la categoría*/
  registerCategory() {
    this.spinnerStatus = false;
    this.categoryService.createCategory(this.headers.getHeaders(), this.getInfoFormRegisterCategory())
      .subscribe({
        next: (data: ApiResponseCreateCategoryI) => {
          this.showToastSuccess(data.message, "Éxito");
          this.spinnerStatus = true;
          this.router.navigateByUrl("/admin/home/dashboard/categories/list-categories");
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No ha podido registrar la categoría");
        }
      });
  }

  /*Método que obtiene la data del formulario para mandarla a registrar*/
  getInfoFormRegisterCategory() {
    let bodyCategory: bodyCreateCategoryI = {
      name: this.categoryForm.get('name')?.value,
      status: this.optionStatusSelected == "true" ? true : false,
      description: this.categoryForm.get('description')?.value,
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
  iconCategory = iconos.faClipboardList;
}
