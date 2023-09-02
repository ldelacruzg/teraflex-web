import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-list-videos-help',
  templateUrl: './list-videos-help.component.html',
  styleUrls: ['./list-videos-help.component.css']
})
export class ListVideosHelpComponent {
  @Output() title1: string = "Videos de ayuda para módulo de tareas"
  @Output() title2: string = "Videos de ayuda para módulo de recursos"
  @Output() title3: string = "Videos de ayuda para módulo de pacientes"

  @Output() carouselExample1: string = "carouselExample1";
  @Output() carouselExample2: string = "carouselExample2";
  @Output() carouselExample3: string = "carouselExample3";

  /*Títulos y videos para módulo de tareas*/
  @Output() arrayVideosDetail1: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693681477/TeraFlex%20-%20Vinculaci%C3%B3n/Proyecto_nuevo_uvifha.png",
      title: "Buscar y ver listado de tareas",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693682122/TeraFlex%20-%20Vinculaci%C3%B3n/Crear_tarea_xdzdbg.png",
      title: "Pasos para crear una tarea",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693682358/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_tarea_dxx1nt.png",
      title: "Editar tarea general",
    },
  ];
  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693684393/TeraFlex%20-%20Vinculaci%C3%B3n/Emitir_reportes_tareas_uk1hs4.png",
      title: "Emitir reportes de tareas",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693684705/TeraFlex%20-%20Vinculaci%C3%B3n/Eliminar_tarea_vzxyde.png",
      title: "Eliminar una tarea",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693684883/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_asignar_tareas_s7mwnq.png",
      title: "Pasos para asignar tareas",
    },
  ];

  /*Títulos y videos para módulo de recursos*/
  @Output() arrayVideosDetail3: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685434/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_video_local_pz06eo.png",
      title: "Pasos para subir videos",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685725/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_subir_enlaces_YouTube_skymcm.png",
      title: "Pasos para subir enlaces",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693685877/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_recursos_bn9uza.png",
      title: "Editar un recurso",
    },
  ];
  @Output() arrayVideosDetail4: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693686308/TeraFlex%20-%20Vinculaci%C3%B3n/Reporte_de_Recursos_lvj55f.png",
      title: "Emitir reporte de recursos",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693686797/TeraFlex%20-%20Vinculaci%C3%B3n/Activar_desactivar_recursos_m31v0u.png",
      title: "Activar o desactivar recursos",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693686963/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_Detalles_Recursos_cmdujc.png",
      title: "Ver detalle de recursos",
    },
  ];

  /*Títulos y videos para módulo de pacientes*/
  @Output() arrayVideosDetail5: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687287/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_crear_pacientes_wamgf2.png",
      title: "Pasos parar crear pacientes",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687431/TeraFlex%20-%20Vinculaci%C3%B3n/Pasos_vincular_pacientes_snqzyb.png",
      title: "Pasos para vincular pacientes",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687578/TeraFlex%20-%20Vinculaci%C3%B3n/Editar_Info_pacientes_pz4vl4.png",
      title: "Editar información de pacientes",
    },
  ];
  @Output() arrayVideosDetail6: any[] = [
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687771/TeraFlex%20-%20Vinculaci%C3%B3n/Eliminar_desvincular_pacientes_ttxubd.png",
      title: "Eliminar pacientes",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693687924/TeraFlex%20-%20Vinculaci%C3%B3n/Reportes_de_pacientes_pjn5dt.png",
      title: "Emitir reporte de pacientes",
    },
    {
      picture: "https://res.cloudinary.com/dfzyxagbc/image/upload/v1693688035/TeraFlex%20-%20Vinculaci%C3%B3n/Ver_detalles_pacientes_ifo5fa.png",
      title: "Ver detalle de pacientes",
    },
  ];
}
