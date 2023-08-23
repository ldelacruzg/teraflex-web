import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', './../../videos/upload-video-form/upload-video-form.component.css']
})
export class ChangePasswordComponent {
  /*Variables*/
  spinnerStatus: boolean = false;
  passwordForm!: FormGroup;

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
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
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/),
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
  }

  /*Método que redirige al apartado del inicio (Cancelar)*/
  goToHome(){
    this.router.navigateByUrl("/therapist/home/dashboard/options-home");
  }

  /*Icons to use*/
  iconPassword = iconos.faLock;
  iconInfoPolicies = iconos.faCircleInfo;
}
