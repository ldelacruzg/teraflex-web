import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-videos-help',
  templateUrl: './view-videos-help.component.html',
  styleUrls: ['./view-videos-help.component.css', '../../tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ViewVideosHelpComponent {
  /*Variables*/
  static location: string;
  spinnerStatus: boolean = false;

  /*Constrcutor*/
  constructor(
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
  }

  /*Método que redirecciona al componente de ver el detalle de un video*/
  goToVideoDetail() {
    console.log("click");
    this.router.navigateByUrl("/therapist/home/dashboard/help/video-detail");
  }

  /*Método que verifica a que componente se regresa, si al de ayuda o al dashboard*/
  goToComponent(){
    if(ViewVideosHelpComponent.location == "dashboard")
      this.router.navigateByUrl("/therapist/home/dashboard/options-home");
    else
    this.router.navigateByUrl("/therapist/home/dashboard/help/tutorial-videos");
  }

  /*Icons to use*/
  iconVideoHelp = iconos.faVideoCamera;
  iconBack = iconos.faArrowLeft;
  iconArrowRight = iconos.faCaretRight;
}
