import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseGetMyPatientByIdI, ApiResponseGetOutPatientsI, ApiResponseRegisterPatientI, GetOutPatientsI, MyPatientDetailByIdI, RegisterPatientI } from 'src/app/therapist/interfaces/patients.interface';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewCredentialsLoginComponent } from '../modals/view-credentials-login/view-credentials-login.component';

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
    private router: Router,
    private modal: NgbModal
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
    this.spinnerStatus = false;
    this.myPatientsService.getOutPatients(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseGetOutPatientsI) => {
          this.arrayPatients = data.data;
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          alert("No se pudo obtener el listado de pacientes")
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
    this.spinnerStatus = false;
    this.idPatientToLink = idPatient;
    this.myPatientsService.getMyPatientById(this.headers.getHeaders(), idPatient)
      .subscribe({
        next: (data: ApiResponseGetMyPatientByIdI) => {
          this.infoPatientById = data.data;
          this.patientForm.get('docNumber')?.setValue(this.infoPatientById.docNumber);
          this.patientForm.get('phone')?.setValue(this.infoPatientById.phone);
          this.patientForm.get('description')?.setValue(this.infoPatientById.description);
          if (this.infoPatientById?.birthDate) {
            const isoDate = new Date(this.infoPatientById.birthDate);
            const formattedDate = isoDate.toISOString().substr(0, 10);
            this.patientForm.get('birthDate')?.setValue(formattedDate);
          }
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudieron obtener los datos del paciente")
        }
      })
  }

  /*Método que crea el formulario*/
  createPatientForm() {
    this.patientForm = this.formBuilder.group({
      fullNamesLink: [''],
      lastName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
        ]
      ],
      firstName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
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
  registerOrLinkMyPatient(viewPatientCredentials: any) {
    if (this.linkPatient2)
      this.linkMyPatient(this.idPatientToLink);
    else
      this.registerMyPatient(viewPatientCredentials);
  }

  /*Método que manda a registrar desde cero los datos de un paciente*/
  registerMyPatient(viewPatientCredentials: any) {
    this.spinnerStatus = false;
    const dataToRegister = this.getInfoPatientRegister();
    this.myPatientsService.registerMyPatient(this.headers.getHeaders(), dataToRegister)
      .subscribe({
        next: (data: ApiResponseRegisterPatientI) => {
          this.showToastSuccess(data.message, 'Éxito');
          this.spinnerStatus = true;
          this.modal.open(viewPatientCredentials, { size: 'md', centered: true });
          ViewCredentialsLoginComponent.user = this.patientForm.get('docNumber')?.value,
          ViewCredentialsLoginComponent.password = this.patientForm.get('docNumber')?.value
          //this.router.navigateByUrl('/therapist/home/dashboard/patients/my-patients');
        },
        error: (error) => {
          this.spinnerStatus = true;
          const message = error.error?.message as string;
          const repeat = message.includes(dataToRegister.docNumber.toString());

          if (repeat) {
            this.showToastError("Error", `El paciente con cédula ${dataToRegister.docNumber} ya existe`);
            return;
          }

          this.showToastError("Error", "No se pudo registrar el paciente");          
        }
      })
  }

  /*Método que manda a vincular un paciente según su id*/
  linkMyPatient(patientID: number) {
    if (this.patientForm.get('fullNamesLink')?.value == '' || this.patientForm.get('fullNamesLink')?.value == 'Sin resultados') {
      this.showToastWarning("Inválido", "Primero debe seleccionar un paciente");
    }
    else {
      this.spinnerStatus = false;
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
  }

  /*Método que obtiene la data del formulario para armar el body a registrar*/
  getInfoPatientRegister(){
    let body:RegisterPatientI = {
      lastName: this.patientForm.get('lastName')?.value,
      firstName: this.patientForm.get('firstName')?.value,
      docNumber: this.patientForm.get('docNumber')?.value,
      birthDate: this.patientForm.get('birthDate')?.value,
      phone: this.patientForm.get('phone')?.value,
      description: this.patientForm.get('description')?.value
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

  /*Método que muestra un toast con mensaje de ADVERTENCIA*/
  showToastWarning(title: string, message: string) {
    this.toastr.warning(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconAddPatient = iconos.faUserPlus;
}
