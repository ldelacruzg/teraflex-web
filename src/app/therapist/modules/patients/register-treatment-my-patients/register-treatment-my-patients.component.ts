import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseGetMyPatientsI, MyPatientDetailI, RegisterTreatmentI } from 'src/app/therapist/interfaces/patients.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-treatment-my-patients',
  templateUrl: './register-treatment-my-patients.component.html',
  styleUrls: [
    './register-treatment-my-patients.component.css',
    './../../videos/upload-video-form/upload-video-form.component.css'
  ]
})
export class RegisterTreatmentMyPatientsComponent {
  treatmentForm!: FormGroup;
  spinnerStatus: boolean = true;
  arrayPatients: MyPatientDetailI[] = [];
  filteredPatients: MyPatientDetailI[] = [];
  seletedPatientId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private myPatientsService: PatientsService,
    private headers: DashboardComponent,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createTreatmentForm();
    this.getMyPatients();
    this.filteredPatients = this.arrayPatients;
  }

  /*Método que obtiene el listado de los pacientes*/
  getMyPatients() {
    this.myPatientsService.getMyPatients(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseGetMyPatientsI) => {
          data.data.forEach(element => {
            this.arrayPatients.push(element.patient);
          })
        },
        error: (error) => {
         this.showToastError("Error", "No se pudieron obtener los pacientes. Recargue la página")
        }
      })
  }

  /*Método para mostrar por defecto todos los pacientes y que no se muestre de primero el "Sin resultados..."*/
  onFocusPatient() {
    this.filteredPatients = this.arrayPatients;
  }

  /*Método para buscar el paciente, entre las opciones del select*/
  onSearchPatient(event: any) {
    const value = event.target.value;
    const searchTerm = value.trim().toLowerCase();
    this.filteredPatients = this.arrayPatients.filter(
      patientName => (patientName.lastName + ' ' + patientName.firstName).toLowerCase().includes(searchTerm)
    );
  }

  createTreatmentForm() {
    this.treatmentForm = this.formBuilder.group({
      patientId: [-1],
      patientName: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
      startDate: [this.getToday(), Validators.required],
      description: ['', Validators.required],
    });
  }

  registerTreatment() {
    if (!this.treatmentForm.valid) {
      this.treatmentForm.markAllAsTouched();
      return;
    }

    this.myPatientsService.registerTreatment(this.headers.getHeaders(), this.getTreatmentFormData())
      .subscribe({
        next: (data) => {
          this.showToastSuccess(data.message, "Éxito");
          this.router.navigateByUrl(
            '/therapist/home/dashboard/patients/treatments'
          );
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo registrar el tratamiento");
        }
      })
  }

  getTreatmentFormData(): RegisterTreatmentI {
    return {
      patientId: this.treatmentForm.get('patientId')?.value,
      title: this.treatmentForm.get('title')?.value,
      startDate: this.treatmentForm.get('startDate')?.value,
      description: this.treatmentForm.get('description')?.value,
    }
  }

  setPatientId(id: number) {
    this.seletedPatientId = id;
    this.treatmentForm.get('patientId')?.setValue(id);
  }

  getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconAddPatient = iconos.faListAlt;
}
