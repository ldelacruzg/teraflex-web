import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseCategoriesI, GetCategoryI } from 'src/app/therapist/interfaces/categories.interface';
import { ApiResponseEditTherapistI, TherapistDetailI, bodyEditTherapistI } from 'src/app/admin/interfaces/therapists.interface';
import { CategoriesService } from 'src/app/admin/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { TherapistsService } from 'src/app/admin/services/therapists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-therapist',
  templateUrl: './edit-therapist.component.html',
  styleUrls: ['./edit-therapist.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class EditTherapistComponent {
  /*Variables*/
  static therapistDetail: TherapistDetailI;
  editTherapistForm!: FormGroup;
  spinnerStatus: boolean = false;
  optionCategorySelected: number = 0;
  arrayCategories: GetCategoryI[] = [];

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private therapistService: TherapistsService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createEditTherapistForm();
    this.getAllCategories();
    this.getTherapistDetail();
  }

  /*Método que crea el formulario*/
  createEditTherapistForm() {
    this.editTherapistForm = this.formBuilder.group({
      firstName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      lastName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      docNumber: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
      birthDate: ['',
        [
          Validators.required,
        ]
      ],
      phone: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
      description: ['',
        [
          Validators.required,
        ]
      ],
      categoryID: ['',
        [
          Validators.required,
        ]
      ],
    })
  }

  /*Método que obtiene el listado de todas las categorías disponibles*/
  getAllCategories() {
    this.categoriesService.getAllCategories(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseCategoriesI) => {
          this.arrayCategories = data.data;
          this.arrayCategories.sort((a, b) => a.name.localeCompare(b.name));
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo cargar la lista de categorías");
        }
      });
  }

  /*Método que rellena los campos del form con la data del terapeuta para editar*/
  getTherapistDetail() {
    this.editTherapistForm.get('firstName')?.setValue(EditTherapistComponent.therapistDetail.firstName);
    this.editTherapistForm.get('lastName')?.setValue(EditTherapistComponent.therapistDetail.lastName);
    this.editTherapistForm.get('docNumber')?.setValue(EditTherapistComponent.therapistDetail.docNumber);
    this.editTherapistForm.get('birthDate')?.setValue(EditTherapistComponent.therapistDetail.birthDate);
    this.editTherapistForm.get('phone')?.setValue(EditTherapistComponent.therapistDetail.phone);
    if (EditTherapistComponent.therapistDetail.category.id != null)
      this.optionCategorySelected = EditTherapistComponent.therapistDetail.category.id;
    else
      this.optionCategorySelected = 0;
    this.editTherapistForm.get('description')?.setValue(EditTherapistComponent.therapistDetail.description);
  }

  /*Método que manda a editar un terapeuta*/
  editTherapist() {
    this.spinnerStatus = false;
    this.therapistService.editTherapist(this.headers.getHeaders(), this.getDataToEdit(), EditTherapistComponent.therapistDetail.id)
      .subscribe({
        next: (data: ApiResponseEditTherapistI) => {
          this.spinnerStatus = true;
          this.showToastSuccess("Terapeuta editado con éxito", "Éxito")
          this.router.navigateByUrl("/admin/home/dashboard/therapists/list-therapists")
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo editar la información del terapeuta");
        }
      });
  }

  /*Método que obtiene la data para armar el body y editar*/
  getDataToEdit(){
    let bodyTherapist: bodyEditTherapistI = {
      firstName: this.editTherapistForm.get('firstName')?.value,
      lastName: this.editTherapistForm.get('lastName')?.value,
      birthDate: this.editTherapistForm.get('birthDate')?.value,
      phone: this.editTherapistForm.get('phone')?.value,
      description: this.editTherapistForm.get('description')?.value,
    }
    return bodyTherapist;
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

  /*Icons to user*/
  iconEditTherapist = iconos.faUserEdit;
}
