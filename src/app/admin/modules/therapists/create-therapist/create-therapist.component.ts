import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewCredentialsLoginComponent } from '../modals/view-credentials-login/view-credentials-login.component';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseRegisterTherapistI, RegisterTherapistI } from 'src/app/admin/interfaces/therapists.interface';
import { ApiResponseCategoriesI, GetCategoryI } from 'src/app/therapist/interfaces/categories.interface';
import { TherapistsService } from 'src/app/admin/services/therapists.service';
import { CategoriesService } from 'src/app/admin/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-therapist',
  templateUrl: './create-therapist.component.html',
  styleUrls: ['./create-therapist.component.css', '../../../../therapist/modules/tasks/list-my-tasks/list-my-tasks.component.css']
})
export class CreateTherapistComponent {
  /*Variables*/
  therapistForm!: FormGroup;
  spinnerStatus: boolean = false;
  created: boolean = false;
  optionCategorySelected: string = "";
  arrayCategories: GetCategoryI[] = [];

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private therapistService: TherapistsService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createTherapistForm();
    this.getAllCategories();
  }

  /*Método que obtiene el listado de todas las categorías disponibles*/
  getAllCategories() {
    this.categoriesService.getAllCategories(this.headers.getHeaders())
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

  /*Método que crea el formulario*/
  createTherapistForm() {
    this.therapistForm = this.formBuilder.group({
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

  /*Método que consume el servicio que manda a registrar un terapeuta*/
  registerTherapist(viewtherapistCredentials: any) {
    this.spinnerStatus = false;
    this.therapistService.registerTherapist(this.headers.getHeaders(), this.getInfoFormRegisterTherapist())
      .subscribe({
        next: (data: ApiResponseRegisterTherapistI) => {
          this.showToastSuccess(data.message, "Éxito");
          this.spinnerStatus = true;
          this.modal.open(viewtherapistCredentials, { size: 'md', centered: true });
          ViewCredentialsLoginComponent.user = this.therapistForm.get('docNumber')?.value,
          ViewCredentialsLoginComponent.password = this.therapistForm.get('docNumber')?.value
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No ha podido registrar su tarea");
        }
      });
  }

  /*Método que obtiene la información del formulario para armar el body*/
  getInfoFormRegisterTherapist() {
    let body: RegisterTherapistI = {
      firstName: this.therapistForm.get('firstName')?.value,
      lastName: this.therapistForm.get('lastName')?.value,
      docNumber: this.therapistForm.get('docNumber')?.value,
      birthDate: this.therapistForm.get('birthDate')?.value,
      phone: this.therapistForm.get('phone')?.value,
      categoryId: Number(this.therapistForm.get('categoryID')?.value),
      description: this.therapistForm.get('description')?.value,
    }
    return body;
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
  iconAddTherapist = iconos.faUserPlus;
}
