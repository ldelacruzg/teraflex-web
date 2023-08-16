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
  @Input() carouselExample: string = "";
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
