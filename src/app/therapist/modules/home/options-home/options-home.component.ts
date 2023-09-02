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
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693682122/TeraFlex%20-%20Vinculaci%C3%B3n/Crear_tarea_xdzdbg.png",
      title: "Pasos para crear una tarea",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685434/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_video_local_pz06eo.png",
      title: "Pasos para subir videos",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687924/TeraFlex%20-%20Vinculaci%C3%B3n/Reportes_de_pacientes_pjn5dt.png",
      title: "Emitir reporte de pacientes",
    },
  ];
  
  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685725/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_enlaces_YouTube_skymcm.png",
      title: "Pasos para subir enlaces",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693688035/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_detalles_pacientes_ifo5fa.png",
      title: "Ver detalle de pacientes",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685877/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_recursos_bn9uza.png",
      title: "Editar un recurso",
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
