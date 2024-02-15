import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetPatientDetailI } from 'src/app/admin/interfaces/patients.interface';

@Component({
  selector: 'app-view-patients-detail',
  templateUrl: './view-patients-detail.component.html',
  styleUrls: ['./view-patients-detail.component.css']
})
export class ViewPatientsDetailComponent {
  /*Variables*/
  static patientDetailRecived: GetPatientDetailI = {
    id: 0,
    firstName: "",
    lastName: "",
    docNumber: "",
    phone: "",
    description: "",
    birthDate: "",
    createdAt: "",
    updatedAt: "",
    therapists: [
      {
        id: 0,
        firstName: "",
        lastName: "",
        docNumber: "",
        phone: "",
      }
    ]
  }

  patientDetail: GetPatientDetailI = {
    id: 0,
    firstName: "",
    lastName: "",
    docNumber: "",
    phone: "",
    description: "",
    birthDate: "",
    createdAt: "",
    updatedAt: "",
    therapists: [
      {
        id: 0,
        firstName: "",
        lastName: "",
        docNumber: "",
        phone: "",
      }
    ]
  }

  /*Constructor*/
  constructor(
    public modal: NgbModal
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.patientDetail = ViewPatientsDetailComponent.patientDetailRecived;
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

  /*Icons to user*/
  iconPatient = iconos.faUserAlt;
  iconArrowRight = iconos.faCaretRight;
}
