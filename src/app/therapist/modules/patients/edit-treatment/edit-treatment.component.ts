import { Component } from '@angular/core';
import { DetailTreatmentI, UpdateTreatmentI } from 'src/app/therapist/interfaces/patients.interface';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: [
    './edit-treatment.component.css',
    './../../videos/upload-video-form/upload-video-form.component.css'
  ]
})
export class EditTreatmentComponent {
  static detailTreatment: DetailTreatmentI;
  treatmentForm!: FormGroup;
  spinnerStatus: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private patientsService: PatientsService,
    private headers: DashboardComponent,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createTreatmentForm();
  }

  getDetailTreatment(): DetailTreatmentI {
    return EditTreatmentComponent.detailTreatment;
  }

  createTreatmentForm() {
    this.treatmentForm = this.formBuilder.group({
      treatmentId: [this.getDetailTreatment().id],
      title: [this.getDetailTreatment().title, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
      startDate: [this.getDetailTreatment().startDate],
      description: [this.getDetailTreatment().description, Validators.required],
    });
  }

  updateTreatment() {
    if (!this.treatmentForm.valid) {
      this.treatmentForm.markAllAsTouched();
      return;
    }

    this.spinnerStatus = false;
    const treatmentId = this.treatmentForm.get('treatmentId')?.value;
    const payload: UpdateTreatmentI = {
      title: this.treatmentForm.get('title')?.value,
      description: this.treatmentForm.get('description')?.value,
    }

    this.patientsService.updateTreatment(this.headers.getHeaders(), treatmentId, payload)
      .subscribe({
        next: (_) => {
          this.spinnerStatus = true;
          this.showToastSuccess('Tratamiento actualizado con éxito', 'Éxito');
          this.router.navigateByUrl('/therapist/home/dashboard/patients/treatments');
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError('Error', error.error.message);
        }
      });
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

  /*Icons */
  iconEdit = iconos.faEdit;
}
