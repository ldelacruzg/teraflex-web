import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-list-videos-help',
  templateUrl: './list-videos-help.component.html',
  styleUrls: ['./list-videos-help.component.css']
})
export class ListVideosHelpComponent {
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

  @Output() arrayVideosDetail3: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Pasos de prueba 1",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Pasos de prueba 2",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Pasos de prueba 3",
    },
  ];

  @Output() arrayVideosDetail4: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Pasos de prueba 4",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Pasos de prueba 5",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Pasos de prueba 6",
    },
  ];
}
