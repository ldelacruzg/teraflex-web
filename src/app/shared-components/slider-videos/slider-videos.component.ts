import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ViewVideosHelpComponent } from 'src/app/therapist/modules/help/view-videos-help/view-videos-help.component';


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
  @Input() location: string = "";

  /*Constructor*/
  constructor(
    private router: Router
  ){}

  /*Método que redirige al componente de ver reproductor de video*/
  goToVideoDetail(){
    ViewVideosHelpComponent.location = this.location
    this.router.navigateByUrl("/therapist/home/dashboard/help/video-detail")
  }

  /*Icons to use*/
  iconVideo = iconos.faVideo;
}
