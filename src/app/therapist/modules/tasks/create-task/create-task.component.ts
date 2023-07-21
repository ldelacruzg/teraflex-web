import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {

  /*Variables*/
  optionVideoSelected: string = "";
  optionVisibilitySelected: string = "";
  optionCategorySelected: string = "";
  spinnerStatus: boolean = false;
  uploadTaskForm!: FormGroup;
  arrayTasksOptions: MyTasksI[] = [];

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createUploadTaskForm();
  }

  /*Crea el formulario que registra una tarea*/
  createUploadTaskForm() {
    this.uploadTaskForm = this.formBuilder.group({
      video: ['',
        [Validators.required],
      ],
      title: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.: ]*$"),
        ],
      ],
      visibility: ['',
        [Validators.required],
      ],
      category: ['',
        [Validators.required],
      ],
      timeEstimated: ['',
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      description: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚ!@#$%^&*()]*$"),
        ],
      ],
    });
  }

  /*Icons to use*/
  iconCreateTask = iconos.faFile;
}
