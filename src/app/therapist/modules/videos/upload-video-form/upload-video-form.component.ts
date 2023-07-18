import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ApiResponseMyVideosI, ApiResponseRegisterVideoLocalI, RegisterVideoLocal } from 'src/app/therapist/interfaces/videos.interface';
import { VideosService } from 'src/app/therapist/services/videos.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { Router } from '@angular/router';

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
  spinnerStatus = false;

  formSelect = new FormGroup({
    filtro: new FormControl('video'),
  });

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private videoService: VideosService,
    private headers: DashboardComponent,
    private route: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.createUploadVideoForm();
    this.createUploadLinkForm();
    this.spinnerStatus = true;
  }

  /*ngAfterViewInit*/
  ngAfterViewInit() {
    this.openFileExplorer();
  }

  /*Crea el formulario que sube un video local*/
  createUploadVideoForm() {
    this.uploadVideoForm = this.formBuilder.group({
      video: [null,
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
  createUploadLinkForm() {
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

  onVideoSelected(event: any){
    const file=event.target.files[0]
    this.uploadVideoForm.patchValue({
      video:file
    })
    this.uploadVideoForm.get("video")?.updateValueAndValidity();
  }

  /*Método que manda a guardar el video con sus datos*/
  registerVideo() {
    const formData = new FormData();
    formData.append('isPublic', this.uploadVideoForm.value.visibility);
    formData.append('description', this.uploadVideoForm.value.description);
    let  videoFiles: File=this.uploadVideoForm.get('video')?.value;
    if (videoFiles) {
      this.spinnerStatus = false;
      formData.append("files",videoFiles,videoFiles.name);
      this.videoService.registerVideoLocal(this.headers.getHeaders(), formData)
        .subscribe({
          next: (response) => {
            this.spinnerStatus = true;
            this.showToastSuccess("Video cargado correctamente", "Éxito");
            this.route.navigateByUrl("./list-videos")
          },
          error: (error) => {
            this.spinnerStatus = true;
            this.showToastError("Error", "No se ha podido subir el video");
          }
        });
    } else {
      this.spinnerStatus = true;
      this.showToastError("Error", "Debe adjuntar un video");
    }
  }
  
  /*Icons to use*/
  iconVideo = iconos.faVideoCamera;
  iconUploadVideo = iconos.faUpload;
}
