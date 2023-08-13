import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-slider-videos',
  templateUrl: './slider-videos.component.html',
  styleUrls: ['./slider-videos.component.css']
})
export class SliderVideosComponent {

  /*Vector de prueba*/
  /* @Input() arrayVideosDetail1: any[] = [
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

  @Input() arrayVideosDetail2: any[] = [
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
  ]; */

  @Input() arrayVideosDetail1: any[] = []
  @Input() arrayVideosDetail2: any[] = [];

  /*Constructor*/
  constructor(
    private router: Router
  ){}

  /*Método que redirige al componente de ver reproductor de video*/
  goToVideoDetail(){
    this.router.navigateByUrl("/therapist/home/dashboard/help/video-detail")
  }

  /*Icons to use*/
  iconVideo = iconos.faVideo;
}
