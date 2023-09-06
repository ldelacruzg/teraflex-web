import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponseLoginUserI } from 'src/app/therapist/interfaces/login.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/therapist/services/auth.service';
import { environment } from 'src/environments/environment';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /*Variables*/
  spinnerStatus: boolean = false;
  showPassword: boolean = false;
  loginForm = new FormGroup({
    identification: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  /*Constrcutor*/
  constructor(
    private ruta: Router,
    private api: AuthService,
    public modal: NgbModal,
    private toastr: ToastrService
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
  }

  /*Método que inicia la sesión del usuario*/
  loginUser(modalAlertChangePassword: any) {
    if (this.loginForm.get('identification')?.value != "" && this.loginForm.get('password')?.value != "") {
      this.spinnerStatus = false;
      this.api.loginUser(this.getHeaders())
        .subscribe({
          next: (res: ApiResponseLoginUserI) => {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("role", res.data.role);
            if (res.data.role == environment.THERAPIST) {
              this.spinnerStatus = true;
              this.ruta.navigateByUrl('/therapist/home/dashboard');
              this.showToastSuccess(res.message, "Bienvenido")
              if (res.data.firstTime) {
                this.modal.open(modalAlertChangePassword, { size: 'md', centered: true });
              }
            }
            else if (res.data.role == environment.ADMIN) {
              this.spinnerStatus = true;
              this.ruta.navigateByUrl('/admin/home/dashboard');
              this.showToastSuccess(res.message, "Administrador")
            }
          },
          error: (resError: ApiResponseLoginUserI) => {
            this.spinnerStatus = true;
            this.showToastError("Error", "Credenciales incorrectas");
          }
        })
    }
    else {
      this.spinnerStatus = true;
      this.showToastError("Error", "Primero debe ingresar sus credenciales de acceso");
    }

  }

  /*Obtiene y retorna los headers*/
  getHeaders() {
    let headers = new Map();
    headers.set("identification", this.loginForm.value.identification);
    headers.set("password", this.loginForm.value.password);
    return headers;
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que redirige al módulo de recuperar la contraseña*/
  goToForgotPassword(forgotPassword: any) {
    this.modal.open(forgotPassword, { size: 'lg', centered: true });
  }

  /*Método que muestra modal para los usuarios que no tienen una cuenta*/
  openModalNoAccount(noAccount: any) {
    this.modal.open(noAccount, { size: 'lg', centered: true });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para obtener el tipo de entrada de contraseña según la visibilidad
  getPasswordInputType() {
    return this.showPassword ? 'text' : 'password';
  }

  //Método que abre un modal para mostrar más información
  goToMoreInfo(moreInformation: any) {
    this.modal.open(moreInformation, { size: 'lg', centered: true });
  }

  /*Icons to use*/
  iconForgotPassword = iconos.faLock;
  iconViewPassword = iconos.faEye;
  iconHidePassword = iconos.faEyeSlash;
  iconMoreInformation = iconos.faInfoCircle;
}
