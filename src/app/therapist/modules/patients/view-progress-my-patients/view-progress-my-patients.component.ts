import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ViewDetailProgressMyPatientsComponent } from '../modals/view-detail-progress-my-patients/view-detail-progress-my-patients.component';
import { ApiResponseListTasksAssignsToPatientI } from 'src/app/therapist/interfaces/assigments.interface';
import { ApiResponseGetMyPatientsI, MyPatientDetailI } from 'src/app/therapist/interfaces/patients.interface';
import { MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { AssigmentsService } from 'src/app/therapist/services/assignments.service';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlerts } from 'src/app/therapist/alerts/alerts.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-progress-my-patients',
  templateUrl: './view-progress-my-patients.component.html',
  styleUrls: ['./view-progress-my-patients.component.css', './../../tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ViewProgressMyPatientsComponent {
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
  arrayAssignsTasks: any[] = [];
  filteredAssignsTasks: any[] = [];
  tasksToSearch: MyTasksI[] = [];

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
  }

  /*Método que crea el formulario para buscar y cargar los datos del paciente*/
  createFormPatient() {
    this.patientForm = this.formBuilder.group({
      names: ['',
        [
          Validators.required,
        ]
      ]
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
    if (this.finalPage > this.arrayAssignsTasks.length) {
      this.finalPage = this.arrayAssignsTasks.length;
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

  /*Método que obtiene el listado de las tareas que tiene asignadas un paciente*/
  getInfoTasksAssigns(idPatient: number) {
    this.idPatient = idPatient;
    this.spinnerStatus = false;
    this.assigmentsService.getListTasksAssingToPatient(this.headers.getHeaders(), idPatient)
      .subscribe({
        next: (data: ApiResponseListTasksAssignsToPatientI) => {
          this.arrayAssignsTasks = data.data;
          this.spinnerStatus = true;
          if (this.arrayAssignsTasks.length == 0)
            this.showToastInfo("Información", "El paciente no tiene tareas asignadas");
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo obtener el listado de tareas asignadas");
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

  /*Método que abre el modal para ver el detalle de la tarea asignada*/
  openModalViewTaskDetailAssign(viewTaskDetailAssign: any, idTaskAssign: number) {
    this.modal.open(viewTaskDetailAssign, { size: 'lg', centered: true });
    ViewDetailProgressMyPatientsComponent.taskDetailAssignId = idTaskAssign;
  }

  /*Método que elimina una tarea asignada al paciente seleccionado*/
  deleteTask(idAssignment: number, nameAssignment: string) {
    this.sweetAlerts.alertConfirmCancel("Eliminar asignación", "¿Está seguro de eliminar la tarea \"" + nameAssignment + "\", asignada al paciente?").then(respuesta => {
      if (respuesta.value == true) {
        this.spinnerStatus = false;
        let arrayAssigments: number[] = [idAssignment]
        this.assigmentsService.deleteTaskAssignToPatient(this.headers.getHeaders(), arrayAssigments)
          .subscribe({
            next: (data: string) => {
              this.getInfoTasksAssigns(this.idPatient)
              this.showToastSuccess("La asignación fue eliminada con éxito", "Asignación eliminada");
              this.spinnerStatus = true;
            },
            error: (error) => {
              this.spinnerStatus = true;
              this.showToastError("Error", "No se pudo eliminar la asignación");
            }
          })
      }
    });
  }

  /*Función que formatea la fecha colocandole día*/
  formatDate(inputDate: string): string {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const days = [
      'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
    ];

    const date = new Date(inputDate);
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = "23";
    const minutes = "59";

    return `${dayOfWeek}, ${month} ${day} ${year}, ${hours}:${minutes}:${minutes} pm`;
  }

  /*Método que verifica si se pasó o no la fecha de vencimiento*/
  isTaskVencida(dueDateRecived: string): boolean {
    const dueDate = new Date(dueDateRecived);
    const currentlyDate = new Date();
    return dueDate < currentlyDate;
  }

  /*Icons to use*/
  iconViewProgress = iconos.faChartSimple;
  iconDelete = iconos.faTrashCan;
  iconBack = iconos.faArrowLeft;
  iconViewDetails = iconos.faEye;
  iconInformation = iconos.faInfoCircle;
}
