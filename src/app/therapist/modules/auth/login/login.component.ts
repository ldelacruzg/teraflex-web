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

  spinnerStatus = false;

  constructor(
    private ruta: Router,
    private api: AuthService,
    public modal: NgbModal
  ) { }

  ngOnInit(){
    this.spinnerStatus = false;
  }

  loginForm = new FormGroup({
    identification: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  /*Método que inicia la sesión del usuario*/
  loginUser() {
    this.spinnerStatus = false;
    let headers = new Map();
    headers.set("identification", this.loginForm.value.identification);
    headers.set("password", this.loginForm.value.password);

    this.api.loginUser(headers).subscribe(data => {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role)
      if (data.role == 'THERAPIST') {
        this.spinnerStatus = true;
        this.ruta.navigateByUrl('/home/dashboard');
      }
      else {
        this.spinnerStatus = true;
        alert("ADMIN: Inicio de sesión exitoso");
      }
    }, error => {
      this.spinnerStatus = true;
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
