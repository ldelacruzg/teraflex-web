import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/therapist/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(
    private ruta: Router,
    private api: AuthService
  ) { }

  loginForm = new FormGroup({
    identification: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  iniciarSesion() {
    let headers = new Map();
    headers.set("identification", this.loginForm.value.identification);
    headers.set("password", this.loginForm.value.password);

    this.api.loginUser(headers).subscribe(data => {
      sessionStorage.setItem("user", data.token);
      sessionStorage.setItem("role", data.role)
      if (data.role == 'PATIENT') {
        alert("Paciente: Inicio de sesión exitoso");
      }
      else {
        alert("ADMIN: Inicio de sesión exitoso");
      }
    }, error => {
      alert("Credenciales incorrectas");
    })
  }
}
