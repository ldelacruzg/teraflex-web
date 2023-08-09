import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-my-videos',
  templateUrl: './edit-my-videos.component.html',
  styleUrls: ['./edit-my-videos.component.css', './../../tasks/list-my-tasks/list-my-tasks.component.css']
})
export class EditMyVideosComponent {
  /*Variables*/
  spinnerStatus: boolean = false;
  optionVisibilitySelected: string = "";
  editVideoForm!: FormGroup;

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
  ){}

  /*ngOnInit*/
  ngOnInit(){
    this.spinnerStatus = true;
    this.createUploadTaskForm();
  }

   /*Crea el formulario que edita un video*/
   createUploadTaskForm() {
    this.editVideoForm = this.formBuilder.group({
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
        [Validators.required],
      ],
    });
  }

  /*Método que manda a editar los campos de video*/
  editVideoDetail(){

  }

  /*Icons to use*/
  iconVideo = iconos.faVideoCamera;
}
