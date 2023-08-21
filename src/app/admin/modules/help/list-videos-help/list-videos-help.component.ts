import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-list-videos-help',
  templateUrl: './list-videos-help.component.html',
  styleUrls: ['./list-videos-help.component.css']
})
export class ListVideosHelpComponent {
  @Output() title1: string = "Videos de ayuda para módulo de terapeutas"
  @Output() title2: string = "Videos de ayuda para módulo de categorías y pacientes"
  @Output() carouselExample1: string ="carouselExample1";
  @Output() carouselExample2: string ="carouselExample2";

  @Output() arrayVideosDetail1: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Ver información de terapeutas",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Registrar nuevo terapeuta",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Editar un información de terapeuta",
    },
  ];

  @Output() arrayVideosDetail2: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Activar o desactivar terapeutas",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Exportar reportes de terapeutas",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Filtros para buscar terapeutas",
    },
  ];

  @Output() arrayVideosDetail3: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Ver informaición de categorías",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Editar iformación de categorías",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Exportar reportes de categorías",
    },
  ];

  @Output() arrayVideosDetail4: any[] = [
    {
      picture: "https://i.ytimg.com/vi/YfF0mvi0SQs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBAcuxccjSWrIhzP--GCSRJLjm0fQ",
      title: "Ver información de pacientes",
    },
    {
      picture: "https://i.ytimg.com/vi/6Ldz9mpV70s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNPmNofIYZblfTiOgbkEiThb2Tiw",
      title: "Exportar reportes de pacientes",
    },
    {
      picture: "https://creamostuvideo.com/wp-content/uploads/2016/12/portada-video-youtube-1030x539.jpg",
      title: "Filrar información de pacientes",
    },
  ];
}
