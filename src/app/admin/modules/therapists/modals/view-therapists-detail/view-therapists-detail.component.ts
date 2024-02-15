import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseGetTherapistDetailI } from 'src/app/admin/interfaces/therapists.interface';
import { TherapistsService } from 'src/app/admin/services/therapists.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-therapists-detail',
  templateUrl: './view-therapists-detail.component.html',
  styleUrls: ['./view-therapists-detail.component.css']
})
export class ViewTherapistsDetailComponent {
  /*Variables*/
  static therapistID: number = 0;
  therapistDetail: any = {
    id: 0,
    firstName: "--",
    lastName: "--",
    docNumber: "--",
    phone: "--",
    description: "--",
    birthDate: "--",
    createdAt: "--",
    updatedAt: "--",
    role: "--",
    categoryId: null,
    categoryName: "--",
    status: true
  }

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private therapistService: TherapistsService,
    private headers: DashboardComponent
  ){}

  /*ngOnInit*/
  ngOnInit(){
    this.getTherapistDetail();
  }

  /*Método que obtiene el detalle de un terapeuta según su ID*/
  getTherapistDetail(){
    this.therapistService.getTherapistDetailById(this.headers.getHeaders(), ViewTherapistsDetailComponent.therapistID)
    .subscribe({
      next: (data: ApiResponseGetTherapistDetailI) => {
        this.therapistDetail = data.data;
      }
    });
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

  /*Icons to use*/
  iconTherapist = iconos.faUserNurse;
  iconArrowRight = iconos.faCaretRight;
}
