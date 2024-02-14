import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ViewDetailProgressMyPatientsComponent } from '../modals/view-detail-progress-my-patients/view-detail-progress-my-patients.component';
import { APIResponseListTreatmentByPatientI, ApiResponseListTasksAssignsToPatientI, ListTreatmentI } from 'src/app/therapist/interfaces/assigments.interface';
import { ApiResponseGetMyPatientsI, MyPatientDetailI } from 'src/app/therapist/interfaces/patients.interface';
import { MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { AssigmentsService } from 'src/app/therapist/services/assignments.service';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlerts } from 'src/app/therapist/alerts/alerts.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ViewDetailTreatmentComponent } from '../modals/view-detail-treatment/view-detail-treatment.component';

@Component({
  selector: 'app-list-treatments-my-patients',
  templateUrl: './list-treatments-my-patients.component.html',
  styleUrls: [
    './list-treatments-my-patients.component.css',
    './../../tasks/list-my-tasks/list-my-tasks.component.css'
  ]
})
export class ListTreatmentsMyPatientsComponent {
  /*Variables*/
  optionFilter: string = environment.TITLE;
  itemsForPage: number = environment.ITEMS_FOR_PAGE;
  initialPage: number = environment.INITIAL_PAGE;
  finalPage: number = environment.ITEMS_FOR_PAGE;
  patientForm!: FormGroup;
  spinnerStatus: boolean = false;
  idPatient: number = 0;
  arrayPatients: MyPatientDetailI[] = [];
  filteredPatientsNames: MyPatientDetailI[] = []; //Array para filtrarlos en la búsqueda
  arrayTreatments: ListTreatmentI[] = [];

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private assigmentsService: AssigmentsService,
    private myPatientsService: PatientsService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private sweetAlerts: SweetAlerts
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createFormPatient();
    this.getMyPatients();
    this.filteredPatientsNames = this.arrayPatients;

    const miAlerta = document.getElementById('miAlerta');
    setTimeout(() => {
        if (miAlerta) {
            miAlerta.style.display = 'none';
        }
    }, 20000);
  }

  /*Método que crea el formulario para buscar y cargar los datos del paciente*/
  createFormPatient() {
    this.patientForm = this.formBuilder.group({
      names: ['', [ Validators.required ]]
    });
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

  /*Método que cambias las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayTreatments.length) {
      this.finalPage = this.arrayTreatments.length;
    }
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
          this.showToastError("Error", "No se pudo obtener el listado de pacientes")
        }
      })
  }

  /*Método que obtiene el listado de los tratamientos del paciente*/
  getTreatments(idPatient: number) {
    this.idPatient = idPatient;
    this.spinnerStatus = false;
    this.assigmentsService.getTreatments(this.headers.getHeaders(), idPatient)
      .subscribe({
        next: (data: APIResponseListTreatmentByPatientI) => {
          this.spinnerStatus = true;
          this.arrayTreatments = data.data;
          if (this.arrayTreatments.length == 0)
            this.showToastInfo("Información", "El paciente no tiene tratamientos asignados");
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo obtener el listado de tratamientos");
        }
      })
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de INFORMACIÓN*/
  showToastInfo(title: string, message: string) {
    this.toastr.info(message, title, {
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

  /*Método que abre el modal para ver el detalle del tratamiento*/
  openModalViewDetailTreatment(viewTreatment: any, treatmentId: number) {
    const treatmentSummary = this.arrayTreatments.find(treatment => treatment.id == treatmentId);
    
    if (treatmentSummary) {
      this.modal.open(viewTreatment, { size: 'lg', centered: true });
      ViewDetailTreatmentComponent.treatmentId = treatmentId;
      ViewDetailTreatmentComponent.treatmentSummary = treatmentSummary;
    }
  }

  /*Método que muestra una alerta para confirmar que desea dar por terminado el tratamiento*/
  showAlertEndTreatment(treatmentId: number) {
    this.sweetAlerts.alertConfirmCancel("Finalizar tratamiento", "¿Estás seguro de que deseas finalizar el tratamiento?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.endTreatment(treatmentId);
        }
      });
  }

  /*Método que hace la petición para finalizar el tratamiento */
  endTreatment(treatmentId: number) {
    this.myPatientsService.finishTreatment(this.headers.getHeaders(), treatmentId)
      .subscribe({
        next: (data: any) => {
          this.showToastSuccess(data.message, "Éxito");
          this.getTreatments(this.idPatient);
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo finalizar el tratamiento");
        }
      })
  }

  /*Icons to use*/
  iconAdd = iconos.faPlusCircle;
  iconListAlt = iconos.faListAlt;
  iconDelete = iconos.faTrashCan;
  iconBack = iconos.faArrowLeft;
  iconViewDetails = iconos.faEye;
  iconInformation = iconos.faInfoCircle;
  iconFinish = iconos.faCheckCircle;
  iconEdit = iconos.faEdit;
}
