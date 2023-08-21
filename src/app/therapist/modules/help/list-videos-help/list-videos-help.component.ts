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
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Buscar y ver listado de tareas",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Pasos para crear una tarea",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Editar tarea general",
    },
  ];
  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Emitir reportes de tareas",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Eliminar una tarea",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Pasos para asignar tareas",
    },
  ];

  /*Títulos y videos para módulo de recursos*/
  @Output() arrayVideosDetail3: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Pasos para subir videos",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Pasos para subir enlaces",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Editar un recurso",
    },
  ];
  @Output() arrayVideosDetail4: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Emitir reporte de recursos",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Activar o desactivar recursos",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Ver detalle de recursos",
    },
  ];

  /*Títulos y videos para módulo de pacientes*/
  @Output() arrayVideosDetail5: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Pasos parar crear pacientes",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Pasos para vincular pacientes",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Editar información de pacientes",
    },
  ];
  @Output() arrayVideosDetail6: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Eliminar pacientes",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Emitir reporte de pacientes",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Ver reporte de pacientes",
    },
  ];
}
