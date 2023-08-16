import { Component, Output } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ApiResponseGetMyInformationI, InformationTerapistDetailI } from 'src/app/therapist/interfaces/profile.interface';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/therapist/services/profile.service';

@Component({
  selector: 'app-options-home',
  templateUrl: './options-home.component.html',
  styleUrls: ['./options-home.component.css']
})
export class OptionsHomeComponent {
  /*Variables*/
  @Output() carouselExample1: string ="carouselExample1";
  @Output() arrayVideosDetail1: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Pasos para crear tareas",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Pasos para editar tareas",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Pasos para registrar pacientes",
    },
  ];
  
  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Pasos para editar pacientes",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Pasos para subir videos",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Pasos para asignar tareas",
    },
  ];
  detailInfoTerapist: InformationTerapistDetailI = {
    id: 0,
    firstName: "",
    lastName: "",
    docNumber: "",
    phone: "",
    description: "",
    birthDate: "",
    createdAt: "",
    updatedAt: "",
    role: "",
    categoryId: 0,
    categoryName: "",
    status: false,
  };
  spinnerStatus: boolean = true;
  
  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private myProfileService: ProfileService,
    private toastr: ToastrService
  ) { }

  /*ngOnInit*/
  ngOnInit(){
    this.getMyInformation();
  }

  /*Método que obtiene la información personal de un terapeuta, para mostrar en el perfil*/
  getMyInformation(){
    this.myProfileService.getMyInformation(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseGetMyInformationI) => {
          this.detailInfoTerapist = data.data;
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo obtener su información");
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
}
