import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/therapist/services/auth.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(
    private ruta: Router,
    private api: AuthService,
    public modal: NgbModal
  ) { }

  loginForm = new FormGroup({
    identification: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  /*Método que inicia la sesión del usuario*/
  loginUser() {
    let headers = new Map();
    headers.set("identification", this.loginForm.value.identification);
    headers.set("password", this.loginForm.value.password);

    this.api.loginUser(headers).subscribe(data => {
      sessionStorage.setItem("user", data.token);
      sessionStorage.setItem("role", data.role)
      if (data.role == 'PATIENT') {
        this.ruta.navigateByUrl('/home/dashboard');
      }
      else {
        alert("ADMIN: Inicio de sesión exitoso");
      }
    }, error => {
      alert("Credenciales incorrectas");
    })
  }

  /*Método que redirige al módulo de recuperar la contraseña*/
  goToForgotPassword(){
    this.ruta.navigateByUrl('/auth/forgot-password');
  }

  /*Método que muestra modal para los usuarios que no tienen una cuenta*/
  openModalNoAccount(noAccount: any){
    this.modal.open(noAccount, { size: 'lg', centered: true });
  }

  /*Iconos*/
  iconForgotPassword = iconos.faLock
}
