import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.css']
})
export class MoreInformationComponent {
  /*Constructor*/
  constructor(
    public modal: NgbModal,
    public router: Router,
  ){}

  //Método que abre una nueva pestaña de Youtube para visualizar los videos de la aplicación
  openYouTubePlaylist() {
    const youtubeURL = 'https://www.youtube.com/playlist?list=PL2t9AygoxQ1sy5fBooe5b_QQUznvhfKtz';
    window.open(youtubeURL, '_blank');
    this.modal.dismissAll();
  }

  //Método que redirige al componente de los créditos
  goToCreditsInfo(){
    this.router.navigateByUrl("/authentication/security/credits-info");
    this.modal.dismissAll();
  }

  //Método que descarga la aplicación móvil
  downloadAPK() {
    const youtubeURL = 'assets/apk/TeraFlex.apk';
    window.open(youtubeURL, '_blank');
    this.modal.dismissAll();
  }

  /*Icons to use*/
  iconInformation = iconos.faInfoCircle;
  iconQuestion = iconos.faQuestionCircle;
  iconYoutube = iconos.faVideoCamera;
}
