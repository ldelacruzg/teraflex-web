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
      url: "https://www.youtube.com/embed/fS8dwEfavM0?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "2:32 minutos",
      descripcion: "Este es un video explicativo en donde se muestran los pasos necesarios para poder crear una tarea con todo lo necesario para los pacientes. Recuerde que antes de crear su tarea, debe surbir recursos, ya sean de videos locales o enlaces de YouTube."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685434/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_video_local_pz06eo.png",
      title: "Pasos para subir videos",
      url: "https://www.youtube.com/embed/PSS2UPrIwIY?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:57 minutos",
      descripcion: "En este video explicativo se muestra paso a paso como subir videos de manera local, es decir, desde su computadora o teléfono. Recuerde que previamente debe tener grabado un video que no exceda los 20mb de almacenamiento."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687924/TeraFlex%20-%20Vinculaci%C3%B3n/Reportes_de_pacientes_pjn5dt.png",
      title: "Emitir reporte de pacientes",
      url: "https://www.youtube.com/embed/s_hjXw4kzDQ?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "1:54 minutos",
      descripcion: "En este video explicativo se muestra el proceso para poder emitir reportes de pacientes en formato PDF o Excel. Estos reportes se generan de acuerdo a los registros que se muestran en el listado de pacientes."
    },
  ];
  
  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685725/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_enlaces_YouTube_skymcm.png",
      title: "Pasos para subir enlaces",
      url: "https://www.youtube.com/embed/mdAcynTdtKg",
      time: "1:54 minutos",
      descripcion: "En este video explicativo se muestra paso a paso el proceso para poder subir videos de YouTube, es decir, copiando el enlace y registrándolo en la aplicación, con toda la información correspondiente."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693688035/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_detalles_pacientes_ifo5fa.png",
      title: "Ver detalle de pacientes",
      url: "https://www.youtube.com/embed/UpaWGsSie2c?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "0:56 segundos",
      descripcion: "En este video explicativo se muestra el proceso para poder ver información más detallada de los pacientes, como por ejemplo la fecha de creación."
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685877/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_recursos_bn9uza.png",
      title: "Editar tipos de recurso",
      url: "https://www.youtube.com/embed/AeNNoNRe6x8?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz",
      time: "0:57 segundos",
      descripcion: "En este video explicativo se muestra el proceso para poder editar un recurso, ya sea un video local o un enlace de YouTube. En el video se muestra la información que puede ser editada para registrar la información actualizada."
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
