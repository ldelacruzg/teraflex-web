import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/admin/services/password.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';
import { ApiResponseChangePasswordI, BodyChangePasswordI } from 'src/app/admin/interfaces/password.interface';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', '../../../../therapist/modules/videos/upload-video-form/upload-video-form.component.css']
})
export class ChangePasswordComponent {
  /*Variables*/
  showPassword: boolean = false;
  showPassword2: boolean = false;
  showPassword3: boolean = false;
  spinnerStatus: boolean = false;
  passwordForm!: FormGroup;

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordService: PasswordService,
    private headers: DashboardComponent,
    private toastr: ToastrService
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createPatientForm();
  }

  /*Método que crea el formulario*/
  createPatientForm() {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['',
        [
          Validators.required,
        ]
      ],
      newPassword: ['',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
        ]
      ],
    })
  }

  /*Método que verifica que la nueva contraseña no sea igual a la anterior*/
  newPasswordMatchesCurrent() {
    const currentPasswordControl = this.passwordForm.get('currentPassword');
    const newPasswordControl = this.passwordForm.get('newPassword');

    if (currentPasswordControl && newPasswordControl) {
      const currentPassword = currentPasswordControl.value;
      const newPassword = newPasswordControl.value;
      return currentPassword === newPassword;
    }
    return false;
  }

  /*Método que verifica que la contraseña actual no sea igual a la anterior*/
  verifyPassword(): boolean {
    const newPasswordControl = this.passwordForm.get('newPassword');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');

    if (newPasswordControl && confirmPasswordControl) {
      const newPassword = newPasswordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return newPassword === confirmPassword;
    }
    return false;
  }

  /*Método que manda a cambiar la contraseña del usuario*/
  changePassword() {
    this.spinnerStatus = false;
    this.passwordService.changePassword(this.headers.getHeaders(), this.getNewPasswordToChange())
      .subscribe({
        next: (data: ApiResponseChangePasswordI) => {
          this.showToastSuccess(data.message, 'Éxito');
          this.spinnerStatus = true;
          this.goToHome();
        },
        error: () => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo cambiar la contraseña");
        }
      });
  }

  /*Método que obtiene la nueva contraseña, para poder enviarla al body*/
  getNewPasswordToChange() {
    let body: BodyChangePasswordI = {
      password: this.passwordForm.get('newPassword')?.value
    }
    return body;
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

  /*Método que redirige al apartado del inicio (Cancelar)*/
  goToHome() {
    this.router.navigateByUrl("/admin/home/dashboard/options-home");
  }

  togglePasswordVisibility(input: number) {
    if (input == 1)
      this.showPassword = !this.showPassword;
    else if (input == 2)
      this.showPassword2 = !this.showPassword2;
    else if (input == 3)
      this.showPassword3 = !this.showPassword3;
  }

  // Método para obtener el tipo de entrada de contraseña según la visibilidad
  getPasswordInputType(input: number) {
    switch (input) {
      case 1:
        return this.showPassword ? 'text' : 'password';
      case 2:
        return this.showPassword2 ? 'text' : 'password';
      default:
        return this.showPassword3 ? 'text' : 'password';
    }
  }

  /*Icons to use*/
  iconPassword = iconos.faLock;
  iconInfoPolicies = iconos.faCircleInfo;
  iconViewPassword = iconos.faEye;
  iconHidePassword = iconos.faEyeSlash;
}
