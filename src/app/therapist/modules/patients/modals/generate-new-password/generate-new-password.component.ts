import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { PasswordService } from 'src/app/therapist/services/password.service';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseGeneratedNewPassword } from 'src/app/therapist/interfaces/password.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generate-new-password',
  templateUrl: './generate-new-password.component.html',
  styleUrls: ['./generate-new-password.component.css']
})
export class GenerateNewPasswordComponent {
  /*Variables*/
  static idPatient: number = 0;
  newPassword: string = "";

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private passwordService: PasswordService,
    private headers: DashboardComponent,
    private toastr: ToastrService
  ) { }

  /*ngOnInit()*/
  ngOnInit() {
    this.generateNewPassword();
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que genera una nueva contraseña para el paciente*/
  generateNewPassword() {
    this.passwordService.generateNewPassword(this.headers.getHeaders(), GenerateNewPasswordComponent.idPatient)
    .subscribe({
      next: (res: ApiResponseGeneratedNewPassword) => {
        this.newPassword = res.data.newPassword;
      },
      error: (err: any) => {
        this.showToastError("Error", "Ocurrió un error al generar la nueva contraseña")
      }
    })
  }

  /*Icons to use*/
  iconPassword = iconos.faLock;
}
