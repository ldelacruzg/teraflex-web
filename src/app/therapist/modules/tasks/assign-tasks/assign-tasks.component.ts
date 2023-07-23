import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as iconos from '@fortawesome/free-solid-svg-icons';

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

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createFormPatient();
    this.createFormAssignTasks();
  }

  /*Método que crea el formulario para buscar y cargar los datos del usuario*/
  createFormPatient() {
    this.patientForm = this.formBuilder.group({
      lastName: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$")
        ],
      ],
      firstName: ['',
        [Validators.required],
      ],
      docNumber: ['',
        [Validators.required],
      ],
      birthDate: ['',
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

  /*Método que manda a buscar un paciente por su apellido para luego cargar su datax*/
  searchPatient(){

  }

  /*Método que para avanzar al siguiente paso del stepper*/
  nextStepAssignTasks() {
    this.stepper.next();
  }

  /*Icons to use*/
  iconAssignTasks = iconos.faCalendarDay;
  iconSearch = iconos.faSearch;
}
