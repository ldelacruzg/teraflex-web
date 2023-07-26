import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseGetMyPatientsI, MyPatientDetailI, ApiResponseGetMyPatientByIdI, MyPatientDetailByIdI } from 'src/app/therapist/interfaces/patients.interface';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css', './../create-task/create-task.component.css']
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


  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private myPatientsService: PatientsService,
    private headers: DashboardComponent
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createFormPatient();
    this.createFormAssignTasks();
    this.getMyPatients();
    /*Una vez lleno el array mediante el método, se asignan esos valores al filteresPatientsNames*/
    this.filteredPatientsNames = this.arrayPatients;
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

  /*Icons to use*/
  iconAssignTasks = iconos.faCalendarDay;
  iconSearch = iconos.faSearch;
}
