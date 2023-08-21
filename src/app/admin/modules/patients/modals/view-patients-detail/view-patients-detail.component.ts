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

  /*Icons to user*/
  iconPatient = iconos.faUserAlt;
  iconArrowRight = iconos.faCaretRight;
}
