import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-account',
  templateUrl: './no-account.component.html',
  styleUrls: ['./no-account.component.css']
})
export class NoAccountComponent {

  /*Constructor*/
  constructor(
    public modal: NgbModal
  ){}

  /*Iconos*/
  iconInformation = iconos.faInfoCircle;
}
