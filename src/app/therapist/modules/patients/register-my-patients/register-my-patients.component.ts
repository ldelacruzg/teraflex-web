import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseGetMyPatientByIdI, ApiResponseGetOutPatientsI, ApiResponseRegisterPatientI, GetOutPatientsI, MyPatientDetailByIdI } from 'src/app/therapist/interfaces/patients.interface';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-my-patients',
  templateUrl: './register-my-patients.component.html',
  styleUrls: ['./register-my-patients.component.css', './../../videos/upload-video-form/upload-video-form.component.css']
})
export class RegisterMyPatientsComponent {
  /*Variables*/
  patientForm!: FormGroup;
  titleModule: string = "";
  idPatientToLink: number = 0;
  static linkPatient: boolean = false;
  linkPatient2: boolean = false;
  spinnerStatus: boolean = false;
  infoPatientById!: MyPatientDetailByIdI;
  arrayPatients: GetOutPatientsI[] = []; //Array que almacena los pacientes que me devuelve el servicio
  filteredPatientsNames: GetOutPatientsI[] = []; //Array para filtrarlos en la búsqueda

  /*constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private myPatientsService: PatientsService,
    private headers: DashboardComponent,
    private toastr: ToastrService,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.linkPatient2 = RegisterMyPatientsComponent.linkPatient;
    this.spinnerStatus = true;
    this.createPatientForm();
    this.getMyPatients();
  }

  /*Método que obtiene el listado de los pacientes externos*/
  getMyPatients() {
    this.myPatientsService.getOutPatients(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseGetOutPatientsI) => {
          this.arrayPatients = data.data;
        },
        error: (error) => {
          alert("No se pudieron obtener los pacientes")
        }
      })
  }

  /*Método para buscar el paciente, entre las opciones del select*/
  onSearch(event: any) {
    const value = event.target.value;
    const searchTerm = value.trim().toLowerCase();
    this.filteredPatientsNames = this.arrayPatients.filter(
      patientName => (patientName.lastName + ' ' + patientName.firstName).toLowerCase().includes(searchTerm)
    );
  }

  /*Método para mostrar por defecto todos los pacientes y que no se muestre de primero el "Sin resultados..."*/
  onFocus() {
    this.filteredPatientsNames = this.arrayPatients;
  }

  /*Método que obtiene el detalle de los datos del paciente existente según el paciente seleccionado (ID)*/
  getInfoDetailPatient(idPatient: number) {
    this.idPatientToLink = idPatient;
    this.myPatientsService.getMyPatientById(this.headers.getHeaders(), idPatient)
      .subscribe({
        next: (data: ApiResponseGetMyPatientByIdI) => {
          this.infoPatientById = data.data;
          this.patientForm.get('docNumber')?.setValue(this.infoPatientById.docNumber);
          this.patientForm.get('phone')?.setValue(this.infoPatientById.phone);
          this.patientForm.get('description')?.setValue(this.infoPatientById.description);
          this.patientForm.get('birthDate')?.setValue(this.infoPatientById.birthDate);
        },
        error: (error) => {
          this.showToastError("Error", "No se pudieron obtener los datos del paciente")
        }
      })
  }

  /*Método que crea el formulario*/
  createPatientForm() {
    this.patientForm = this.formBuilder.group({
      lastName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      firstName: ['',
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
    })
  }

  /*Método que verifica si se va a registrar un paciente o se va a vincular*/
  registerOrLinkMyPatient() {
    if (this.linkPatient2)
      this.linkMyPatient(this.idPatientToLink);
    else
      this.registerMyPatient();
  }

  /*Método que manda a registrar desde cero los datos de un paciente*/
  registerMyPatient() {
    this.spinnerStatus = false;
    this.myPatientsService.registerMyPatient(this.headers.getHeaders(), this.patientForm.value)
      .subscribe({
        next: (data: ApiResponseRegisterPatientI) => {
          this.showToastSuccess(data.message, 'Éxito');
          this.spinnerStatus = true;
          this.router.navigateByUrl('/therapist/home/dashboard/patients/my-patients');
        },
        error: () => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo registrar el paciente");
        }
      })
  }

  /*Método que manda a vincular un paciente según su id*/
  linkMyPatient(patientID: number) {
    this.spinnerStatus = false;
    console.log(this.headers.getHeaders());
    this.myPatientsService.linkMyPatient(this.headers.getHeaders(), patientID)
      .subscribe({
        next: (data: any) => {
          this.showToastSuccess("Paciente vinculado con éxito", 'Éxito');
          this.spinnerStatus = true;
          this.router.navigateByUrl('/therapist/home/dashboard/patients/my-patients');
        },
        error: () => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo vincular el paciente");
        }
      })
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
  iconAddPatient = iconos.faUserPlus;
}
