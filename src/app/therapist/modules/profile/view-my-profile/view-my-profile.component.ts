import { Component } from '@angular/core';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseGetMyInformationI, InformationTerapistDetailI } from 'src/app/therapist/interfaces/profile.interface';
import { ProfileService } from 'src/app/therapist/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.component.html',
  styleUrls: ['./view-my-profile.component.css', './../../tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ViewMyProfileComponent {
  /*Variables*/
  spinnerStatus: boolean = true;
  detailInfoTerapist: InformationTerapistDetailI = {
    id: 0,
    firstName: "",
    lastName: "",
    docNumber: "",
    phone: "",
    description: "",
    birthDate: "",
    createdAt: "",
    updatedAt: "",
    role: "",
    categoryId: 0,
    categoryName: "",
    status: false,
  };

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private myProfileService: ProfileService,
    private toastr: ToastrService
  ) { }

  /*ngOnInit*/
  ngOnInit(){
    this.spinnerStatus = true;
    this.getMyInformation();
  }

  /*Método que obtiene la información personal de un terapeuta, para mostrar en el perfil*/
  getMyInformation(){
    this.spinnerStatus = false;
    this.myProfileService.getMyInformation(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseGetMyInformationI) => {
          this.detailInfoTerapist = data.data;
          this.detailInfoTerapist.birthDate = this.calculateAge(this.detailInfoTerapist.birthDate)
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo obtener su información");
        }
      })
  }

  /*Método que calcula la edad, enviándole la fecha de nacimiento*/
  calculateAge(birthDateString: string): any {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      return yearsDiff - 1;
    }
    return yearsDiff;
  }

  // traforma este tipo de fecha 2023-12-24T22:30:17.079Z a domingo, 24 de diciembre de 2023 05:30 p.m.
  transformDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconMyProfile = iconos.faUser;
  iconEdit = iconos.faEdit;
  iconInformation = iconos.faList;
  iconStatistics = iconos.faChartSimple;
  iconVerified = iconos.faCircleCheck;
}
