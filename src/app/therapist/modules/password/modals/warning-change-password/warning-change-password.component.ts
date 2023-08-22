import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-change-password',
  templateUrl: './warning-change-password.component.html',
  styleUrls: ['./warning-change-password.component.css']
})
export class WarningChangePasswordComponent {

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private router: Router
  ) { }

  /*Método que redirige al componente de cambiar la contraseña*/
  goToChangePassword() {
    this.modal.dismissAll();
    this.router.navigateByUrl("/therapist/home/dashboard/password/change-password");
  }

  /*Icons to use*/
  iconInformation = iconos.faCircleInfo;
}
