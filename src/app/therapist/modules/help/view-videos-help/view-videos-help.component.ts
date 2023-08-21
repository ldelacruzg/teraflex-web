import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  userRole: string = "--";

  /*Constrcutor*/
  constructor(
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.userRole = sessionStorage.getItem("role")!;
  }

  /*Método que verifica a que componente se regresa, si al de ayuda o al dashboard*/
  goToComponent() {
    if (this.userRole == environment.ADMIN) {
      if (ViewVideosHelpComponent.location == "dashboard")
        this.router.navigateByUrl("/admin/home/dashboard/options-home");
      else
        this.router.navigateByUrl("/admin/home/dashboard/help/tutorial-videos");
    }
    else {
      if (ViewVideosHelpComponent.location == "dashboard")
        this.router.navigateByUrl("/therapist/home/dashboard/options-home");
      else
        this.router.navigateByUrl("/therapist/home/dashboard/help/tutorial-videos");
    }
  }

  /*Icons to use*/
  iconVideoHelp = iconos.faVideoCamera;
  iconBack = iconos.faArrowLeft;
  iconArrowRight = iconos.faCaretRight;
}
