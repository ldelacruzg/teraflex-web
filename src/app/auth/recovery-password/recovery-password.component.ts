import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent {

  constructor(
    private ruta: Router,
    public modal: NgbModal
  ) { }

  /*Método que redirige al formulario de Login*/
  goToLogin(){
    this.ruta.navigateByUrl('/authentication/security/login');
  }

  /*Método que abre el modal para ingresar el código OTP*/
  openModalOtpCode(otpCode: any){
    this.modal.open(otpCode, { size: 'md', centered: true });
  }

  /*Método que muestra modal para los usuarios que no tienen una cuenta*/
  openModalNoAccount(noAccount: any){
    this.modal.open(noAccount, { size: 'lg', centered: true });
  }

  /*Iconos*/
  iconGoToBack = iconos.faArrowLeft;
}
