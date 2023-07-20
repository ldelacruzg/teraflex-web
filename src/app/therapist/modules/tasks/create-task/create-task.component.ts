import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  /*Variables*/
  optionSelected = "video";
  uploadTaskForm!: FormGroup;
  optionVisibilityTask = "";

  formSelect = new FormGroup({
    filtro: new FormControl('video'),
  });


  constructor(
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.createUploadTaskForm();
  }


  /*Crea el formulario que sube un video local*/
  createUploadTaskForm() {
    this.uploadTaskForm = this.formBuilder.group({
      video: [null,
        [Validators.required],
      ],
      title: ['',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.: ]*$")],
      ],
      visibility: ['',
        [Validators.required],
      ],
      description: ['',
        [Validators.required, Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚ!@#$%^&*()]*$")],
      ],
    });
  }

  /*Icons to use*/
  iconCreateTask = iconos.faFile;
  
}
