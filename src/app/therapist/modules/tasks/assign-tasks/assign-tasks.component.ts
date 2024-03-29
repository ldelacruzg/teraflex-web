import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router'
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { EditTaskToAssignComponent } from '../modals/edit-task-to-assign/edit-task-to-assign.component';
import { ApiResponseGetMyPatientsI, MyPatientDetailI, ApiResponseGetMyPatientByIdI, MyPatientDetailByIdI, DetailTreatmentI } from 'src/app/therapist/interfaces/patients.interface';
import { ApiResponseMyTasksI, MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { APIResponseListTreatmentByPatientI, AssignTasksToPatientI, BodyTaskToAssignI, ListTreatmentI } from 'src/app/therapist/interfaces/assigments.interface';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { AssigmentsService } from 'src/app/therapist/services/assignments.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css', './../create-task/create-task.component.css', './../list-my-tasks/list-my-tasks.component.css']
})
export class AssignTasksComponent {
  /*Variables*/
  @ViewChild('stepper') stepper!: MatStepper;
  optionFilter: string = environment.TITLE;
  patientForm!: FormGroup;
  assignTasksForm!: FormGroup;
  /*Para el input search de buscar paciente*/
  control = new FormControl('');
  infoPatientById!: MyPatientDetailByIdI;
  spinnerStatus: boolean = false;
  isMobileView: boolean = false;
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  arrayTasks: MyTasksI[] = [];
  tasksToSearch: MyTasksI[] = [];
  arrayPatients: MyPatientDetailI[] = []; //Array que almacena los pacientes que me devuelve el servicio
  filteredPatientsNames: MyPatientDetailI[] = []; //Array para filtrarlos en la búsqueda
  selectedCheckboxes: { [key: number]: boolean } = {}; /*Array que contiene temporalmente el valor de los checks*/
  arrayTasksId: number[] = []; /*Array que contiene los id de los videos*/
  //Donde se guardará la data a enviar finalmente en la asignación
  static arrayTasksDetailToSend: BodyTaskToAssignI[] = [];
  idPatientToAssignTasks!: number;
  minDate: string ="";
  categories: string[] = [];

  arrayTreatments: DetailTreatmentI[] = [];
  filteredTreatmentTitles: DetailTreatmentI[] = [];
  selectedTreatmentId: number = 0;

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private assigmentsService: AssigmentsService,
    private myPatientsService: PatientsService,
    private myTasksService: MyTasksService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private router: Router
  ) {
    this.isMobileView = window.innerWidth <= 760;
    this.minDate = this.calculateMinDate();
  }

  /*Verifica el tamaño de la pantalla para cambiar a móvil*/
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = window.innerWidth <= 760;
  }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createFormPatient();
    this.createFormAssignTasks();
    this.getMyPatients();
    /*Una vez lleno el array mediante el método, se asignan esos valores al filteresPatientsNames*/
    this.filteredPatientsNames = this.arrayPatients;
    this.getListMyTasks();
  }

  /*Método que obtiene el listado de los tratamientos activos del paciente */
  getTreatmentsByPatient() {
    this.spinnerStatus = false;
    this.assigmentsService.getTreatments<DetailTreatmentI>(
        this.headers.getHeaders(), 
        this.idPatientToAssignTasks,
        true
      )
      .subscribe({
        next: (data: APIResponseListTreatmentByPatientI<DetailTreatmentI>) => {
          this.spinnerStatus = true;
          this.arrayTreatments = data.data;
          this.filteredTreatmentTitles = this.arrayTreatments;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudieron obtener los tratamientos del paciente");
        }
      })
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

  /*Método para buscar el paciente, entre las opciones del select*/
  onSearch(event: any) {
    const value = event.target.value;
    const searchTerm = value.trim().toLowerCase();
    this.filteredPatientsNames = this.arrayPatients.filter(
      patientName => (patientName.lastName + ' ' + patientName.firstName).toLowerCase().includes(searchTerm)
    );
  }

  onSearchTreatment(event: any) {
    const value = event.target.value;
    const searchTerm = value.trim().toLowerCase();
    this.filteredTreatmentTitles = this.arrayTreatments.filter(
      treatment => treatment.title.toLowerCase().includes(searchTerm)
    );
  }

  /*Método para mostrar por defecto todos los pacientes y que no se muestre de primero el "Sin resultados..."*/
  onFocus() {
    this.filteredPatientsNames = this.arrayPatients;
  }

  onFocusTreatment() {
    this.filteredTreatmentTitles = this.arrayTreatments;
  }

  /*Método que obtiene el detalle de los datos del paciente según el paciente seleccionado (ID)*/
  getInfoDetailPatient(idPatient: number) {
    this.idPatientToAssignTasks = idPatient;
    this.myPatientsService.getMyPatientById(this.headers.getHeaders(), idPatient)
      .subscribe({
        next: (data: ApiResponseGetMyPatientByIdI) => {
          this.infoPatientById = data.data;
          this.patientForm.get('docNumber')?.setValue(this.infoPatientById.docNumber);
          this.patientForm.get('phone')?.setValue(this.infoPatientById.phone);
          this.patientForm.get('description')?.setValue(this.infoPatientById.description);
          this.patientForm.get('age')?.setValue(this.calculateAge(this.infoPatientById.birthDate) + " años");
        },
        error: (error) => {
          this.showToastError("Error", "No se pudieron obtener los datos del paciente")
        }
      })
  }

  /*Método que calcula la edad del pacientes*/
  calculateAge(birthDate: string) {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const ageTime = today.getTime() - birthDateObj.getTime();
    const ageDate = new Date(ageTime); // Epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  /*Método que crea el formulario para buscar y cargar los datos del usuario*/
  createFormPatient() {
    this.patientForm = this.formBuilder.group({
      names: ['',
        [
          Validators.required,
        ],
      ],
      docNumber: ['',
        [Validators.required],
      ],
      age: ['',
        [Validators.required],
      ],
      phone: [''],
      description: [''],
    });
  }

  /*Método que crea el formulario para asignar las tareas (Solo contiene el fecha de vencimiento)*/
  createFormAssignTasks() {
    this.assignTasksForm = this.formBuilder.group({
      dueDate: ['',
        Validators.required]
    });
  }

  /*Método que para avanzar al siguiente paso del stepper*/
  nextStepAssignTasks() {
    this.getTreatmentsByPatient();
    this.stepper.next();
  }

  /*Método que mantiene marcados los inputs check cuando cambio entre página*/
  toogleAssignedTask(task: MyTasksI) {
    const index = this.arrayTasksId.indexOf(task.id);
    if (index === -1) {
      this.arrayTasksId.push(task.id);
      task.disabled = false;
    } else {
      this.arrayTasksId.splice(index, 1);
      task.disabled = true;
    }
  }

  removeTaskToAssign(taskId: number) {
    const existingIndex = AssignTasksComponent.arrayTasksDetailToSend.findIndex(
      (item) => item.taskId === taskId
    );
    AssignTasksComponent.arrayTasksDetailToSend.splice(existingIndex, 1);
  }


  /*Método que cambias las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayTasks.length) {
      this.finalPage = this.arrayTasks.length;
    }
  }

  /*Método que obtiene el listado de las tareas que ha creado un terapeuta*/
  getListMyTasks() {
    this.spinnerStatus = false;
    this.myTasksService.getAllMyTasks(this.headers.getHeaders(), true).subscribe((data: ApiResponseMyTasksI) => {
      data.data.forEach(element => {
        let tempTask: MyTasksI = {
          id: element.id,
          title: element.title,
          description: element.description,
          estimatedTime: element.estimatedTime,
          isPublic: element.isPublic,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          disabled: true,
          categories: element.categories,
          categoryIds: element.categoryIds,
          categoriesNames: element.categories.map((category) => category.name)
        }
        this.arrayTasks.push(tempTask);
      })
      this.spinnerStatus = true;
    }, (error) => {
      this.spinnerStatus = true;
    });
  }

  /*Método que muestra modal para editar la tarea que se va a asignar*/
  openModalEditTaskToAssign(viewTaskDetail: any, taskID: number) {
    this.modal.open(viewTaskDetail, { size: 'lg', centered: true, backdrop: 'static' });
    EditTaskToAssignComponent.taskID = taskID;

    const isAssignedTask = AssignTasksComponent.arrayTasksDetailToSend
      .find((item) => item.taskId === taskID);

    if (isAssignedTask) {
      EditTaskToAssignComponent.assignedTask = isAssignedTask;
    }
  }

  /*Método que agrega las tareas a un vector temporal para enviar a guardar*/
  addArrayToSend(task: MyTasksI) {
    // Buscar el índice del elemento en el vector
    const existingIndex = AssignTasksComponent.arrayTasksDetailToSend.findIndex((item) => item.taskId === task.id);
    // Si el elemento existe en el vector, eliminarlo
    if (existingIndex !== -1) {
      AssignTasksComponent.arrayTasksDetailToSend.splice(existingIndex, 1);
    } else {
      // Si el elemento no existe, agregarlo al vector
      let taskAdd: any = {
        description: task.description,
        estimatedTime: task.estimatedTime,
        id: task.id,
      };
      AssignTasksComponent.arrayTasksDetailToSend.push(taskAdd);
    }
  }

  /*Método que consume el servicio que finalmente asigna las tareas seleccionadas, al usuario*/
  registerAssignTaskToUser() {
    if (this.selectedTreatmentId <= 0) {
      this.showToastError("Error", "Debe seleccionar un tratamiento");
      return;
    }

    if (AssignTasksComponent.arrayTasksDetailToSend.length <= 0) {
      this.showToastError("Error", "Debe seleccionar al menos una tarea");
      return;
    }

    const body: AssignTasksToPatientI = {
      tasks: AssignTasksComponent.arrayTasksDetailToSend,
    }
    
    this.spinnerStatus = false;
    this.assigmentsService.registerTasksAssignToPatient(this.headers.getHeaders(), this.selectedTreatmentId, body)
      .subscribe({
        next: (data: any) => {
          this.showToastSuccess(data.message, "Éxito");
          this.spinnerStatus = true;
          AssignTasksComponent.arrayTasksDetailToSend = [];
          this.router.navigateByUrl('/therapist/home/dashboard/options-home');
        },
        error: (error: any) => {
          this.spinnerStatus = true;
          AssignTasksComponent.arrayTasksDetailToSend = [];
          this.showToastError("Error", "No se pudieron asignar las tareas");
        },
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

  /*Método que calcula el minDate para dejar habilitado de la fecha actual en adelante*/
  calculateMinDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Agrega un día
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /*Icons to use*/
  iconAssignTasks = iconos.faCalendarDay;
  iconSearch = iconos.faSearch;
  iconEdit = iconos.faEdit;
  iconBack = iconos.faArrowLeft;
  iconNext = iconos.faArrowRight;
}
