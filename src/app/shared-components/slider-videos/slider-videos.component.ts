import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewVideosHelpComponent } from 'src/app/therapist/modules/help/view-videos-help/view-videos-help.component';
import { environment } from 'src/environments/environment';
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
  @Input() location: string = "";
  @Input() videoTitle: string = "Videos"
  userRole: string = "--";

  /*Constructor*/
  constructor(
    private router: Router
  ){}

  /*ngOnInit*/
  ngOnInit(){
    this.userRole = sessionStorage.getItem("role")!;
  }

  /*Método que redirige al componente de ver reproductor de video*/
  goToVideoDetail(){
    if(this.userRole == environment.ADMIN){
      ViewVideosHelpComponent.location = this.location;
      this.router.navigateByUrl("/admin/home/dashboard/help/video-detail");
    }
    else{
      ViewVideosHelpComponent.location = this.location;
      this.router.navigateByUrl("/therapist/home/dashboard/help/video-detail");
    }
  }

  /*Icons to use*/
  iconVideo = iconos.faVideo;
}
