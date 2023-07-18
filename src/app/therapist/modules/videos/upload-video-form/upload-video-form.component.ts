import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-video-form',
  templateUrl: './upload-video-form.component.html',
  styleUrls: ['./upload-video-form.component.css']
})
export class UploadVideoFormComponent {
  /*Variables*/
  optionSelected = "video";
  optionVisibilityVideo = "";
  optionVisibilityLink = "";
  uploadVideoForm!: FormGroup;
  uploadLinkForm!: FormGroup;

  formSelect = new FormGroup({
    filtro: new FormControl('video'),
  });

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ){}

  /*ngOnInit*/
  ngOnInit() {
    this.createUploadVideoForm();
    this.createUploadLinkForm();
  }

  /*ngAfterViewInit*/
  ngAfterViewInit(){
    this.openFileExplorer();
  }

  /*Crea el formulario que sube un video local*/
  createUploadVideoForm(){
    this.uploadVideoForm = this.formBuilder.group({
      video: ['',
        [Validators.required],
      ],
      visibility: ['',
        [Validators.required],
      ],
      description: ['',
        [Validators.required, Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚ!@#$%^&*()]*$")],
      ],
    });
  }

   /*Crea el formulario que sube un enlace de un video de YouTube*/
   createUploadLinkForm(){
    this.uploadLinkForm = this.formBuilder.group({
      visibility: ['',
        [Validators.required],
      ],
      link: ['',
        [Validators.required, Validators.pattern("^(https?://)?(www\\.)?youtube\\.com/(watch\\?v=|embed/|v/|\\w+/|\\d+/|\\?v=)?([\\w-]+)(&[\\w-]+=[\\w-]+)*$")],
      ],
      description: ['',
      [Validators.required, Validators.pattern("^[a-zA-Z0-9!@#$%^&*()]*$")],
      ],
    });
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string){
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string){
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que abre el explorador de archivos para subir un video*/
  openFileExplorer() {
    const selectVideo = document.querySelector('#container-video') as HTMLInputElement;
    const inputFile = document.querySelector('#file') as HTMLInputElement;
    const videoArea = document.querySelector('.video-area') as HTMLElement;
    selectVideo.addEventListener('click', function () {
      inputFile.click();
    });
  
    inputFile.addEventListener('change', () => {
      if (inputFile.files && inputFile.files.length > 0) {
        const video = inputFile.files[0];
        if (video.size < 6000000) {
          const reader = new FileReader();
          reader.onload = () => {
            const allVideos = videoArea.querySelectorAll('video');
            allVideos.forEach((item) => item.remove());
            const videoUrl = reader.result as string;
            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;
            videoElement.controls = true;
            videoArea.appendChild(videoElement);
            videoArea.classList.add('active');
            videoArea.dataset['video'] = video.name;
          };
          reader.readAsDataURL(video);
        } else {
          this.showToastError('Error', 'El video no puede pesar más de 6MB');
        }
      }
    });
  }
  

  /*Icons to use*/
  iconVideo = iconos.faVideoCamera;
  iconUploadVideo = iconos.faUpload;
}
