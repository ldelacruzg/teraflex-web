import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';
import { ApiResponseGeneratedNewPassword } from 'src/app/admin/interfaces/password.interface';
import { PasswordService } from 'src/app/admin/services/password.service';

@Component({
  selector: 'app-generate-temp-password',
  templateUrl: './generate-temp-password.component.html',
  styleUrls: ['./generate-temp-password.component.css']
})
export class GenerateTempPasswordComponent {
   /*Variables*/
   static idTherapist: number = 0;
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
     this.passwordService.generateNewPassword(this.headers.getHeaders(), GenerateTempPasswordComponent.idTherapist)
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
