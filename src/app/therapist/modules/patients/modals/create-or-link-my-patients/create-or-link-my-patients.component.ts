import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RegisterMyPatientsComponent } from '../../register-my-patients/register-my-patients.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-or-link-my-patients',
  templateUrl: './create-or-link-my-patients.component.html',
  styleUrls: ['./create-or-link-my-patients.component.css']
})
export class CreateOrLinkMyPatientsComponent {

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    public router: Router,
  ){}

  /*Método que redirecciona la componente de crear paciente pero con parámetro de vinculación*/
  goToCreateOrLinkPatient(linkPatient: boolean){
    this.modal.dismissAll();
    RegisterMyPatientsComponent.linkPatient = linkPatient;
    this.router.navigateByUrl("/therapist/home/dashboard/patients/register-patients")
  }

  /*Icons to use*/
  iconOptionPatient = iconos.faUserCheck;
  iconCreatePatient = iconos.faUserPlus;
  iconLinkPatient = iconos.faUserTag;
}
