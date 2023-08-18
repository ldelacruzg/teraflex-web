import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseGetMyPatientByIdI, MyPatientDetailByIdI } from 'src/app/therapist/interfaces/patients.interface';

@Component({
  selector: 'app-view-my-patients',
  templateUrl: './view-my-patients.component.html',
  styleUrls: ['./view-my-patients.component.css']
})
export class ViewMyPatientsComponent {
  /*Variables*/
  static patientID: number;
  patientDetail: MyPatientDetailByIdI = {
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
    categoryId: 0,
    categoryName: "",
    status: true
  }


  /*constructor*/
  constructor(
    public modal: NgbModal,
    private myPatientsService: PatientsService,
    private headers: DashboardComponent
  ) { }

  /*ngOnINit*/
  ngOnInit() {
    this.getPatientDetail();
  }

  /*Método que obtiene el detalle de un paciente por el ID*/
  getPatientDetail(){
    this.myPatientsService.getMyPatientById(this.headers.getHeaders(), ViewMyPatientsComponent.patientID)
    .subscribe({
      next: (data: ApiResponseGetMyPatientByIdI) => {
        this.patientDetail = data.data;
        this.patientDetail.birthDate = this.calculateAge(this.patientDetail.birthDate);
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

  /*Icons to use*/
  iconPatient = iconos.faUser;
  iconArrowRight = iconos.faCaretRight;

}
