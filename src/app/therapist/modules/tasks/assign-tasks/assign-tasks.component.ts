import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseGetMyPatientsI, MyPatientDetailI, ApiResponseGetMyPatientByIdI, MyPatientDetailByIdI } from 'src/app/therapist/interfaces/patients.interface';
import { ApiResponseMyTasksI, MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { PageEvent } from '@angular/material/paginator';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskToAssignComponent } from '../modals/edit-task-to-assign/edit-task-to-assign.component';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css', './../create-task/create-task.component.css', './../my-tasks/my-tasks.component.css']
})
export class AssignTasksComponent {

  /*Variables*/
  spinnerStatus: boolean = false;
  patientForm!: FormGroup;
  assignTasksForm!: FormGroup;
  @ViewChild('stepper') stepper!: MatStepper;
  infoPatientById!: MyPatientDetailByIdI;
  /*Para el input search de buscar paciente*/
  control = new FormControl('');
  arrayPatients: MyPatientDetailI[] = []; //Array que almacena los pacientes que me devuelve el servicio
  filteredPatientsNames: MyPatientDetailI[] = []; //Array para filtrarlos en la búsqueda

  arrayTasks: MyTasksI[] = [];
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  selectedCheckboxes: { [key: number]: boolean } = {}; /*Array que contiene temporalmente el valor de los checks*/
  arrayTasksId: number[] = []; /*Array que contiene los id de los videos*/

  //Donde se guardará la data a enviar finalmente en la asignación
  static arrayTasksDetailToSend: any[] = [];

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private myPatientsService: PatientsService,
    private headers: DashboardComponent,
    private myTasksService: MyTasksService,
    private modal: NgbModal
  ) { }

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

  asignarTareaFinal(){
    console.log("DATA RECIBIDA CORRECTAMENTE")
    console.log(AssignTasksComponent.arrayTasksDetailToSend);
  }

  
  /*Método que obtiene el listado de los pacientes*/
  getMyPatients(){
    this.myPatientsService.getMyPatients(this.headers.getHeaders())
    .subscribe({
      next: (data: ApiResponseGetMyPatientsI) => {
        data.data.forEach(element => {
          this.arrayPatients.push(element.patient);
        })
        console.log("Viendo data");
        console.log(this.arrayPatients);
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
      patientName => (patientName.lastName + ' '+ patientName.firstName).toLowerCase().includes(searchTerm)
    );
  }

  /*Método para mostrar por defecto todos los pacientes y que no se muestre de primero el "Sin resultados..."*/
  onFocus(){
    this.filteredPatientsNames = this.arrayPatients;
  }

  /*Método que obtiene el detalle de los datos del paciente según el paciente seleccionado (ID)*/
  getInfoDetailPatient(idPatient: number){
    this.myPatientsService.getMyPatientById(this.headers.getHeaders(), idPatient)
    .subscribe({
      next: (data: ApiResponseGetMyPatientByIdI) => {
        this.infoPatientById = data.data;
        this.patientForm.get('docNumber')?.setValue(this.infoPatientById.docNumber);
        this.patientForm.get('phone')?.setValue(this.infoPatientById.phone);
        this.patientForm.get('description')?.setValue(this.infoPatientById.description);
        this.calculateAge(this.infoPatientById.birthDate);
      },
      error: (error) => {
       alert("No se pudieron obtener los datos del paciente")
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
    this.patientForm.get('age')?.setValue(age + " años");
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
      phone: ['',
        [Validators.required],
      ],
      description: ['',],
    });
  }

  /*Método que crea el formulario para asignar las tareas*/
  createFormAssignTasks() {
    this.assignTasksForm = this.formBuilder.group({
      secondCtrl: ['',
        Validators.required]
    });
  }

  /*Método que para avanzar al siguiente paso del stepper*/
  nextStepAssignTasks() {
    this.stepper.next();
  }

  /*Método que mantiene marcados los inputs check cuando cambio entre página*/
  addOrRemoveVideoId(id: number) {
    this.selectedCheckboxes[id] = !this.selectedCheckboxes[id];
    const index = this.arrayTasksId.indexOf(id);
    if (index === -1)
      this.arrayTasksId.push(id);
    else
      this.arrayTasks.splice(index, 1);
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
      this.arrayTasks = data.data;
      this.spinnerStatus = true;
    }, (error) => {
      this.spinnerStatus = true;
      //this.showToastError("Error", "Error al obtener el listado de tareas");
    });
  }

  
  /*Método que muestra modal para editar la tarea que se va a asignar*/
  openModalEditTaskToAssign(viewTaskDetail: any, taskID: number) {
    this.modal.open(viewTaskDetail, { size: 'lg', centered: true });
    EditTaskToAssignComponent.taskID = taskID;
  }

  /*Icons to use*/
  iconAssignTasks = iconos.faCalendarDay;
  iconSearch = iconos.faSearch;
  iconEdit = iconos.faEdit;
}
