import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
  /*Constructor*/
  constructor(
    public modal: NgbModal
  ) { }

  /*Iconos*/
  iconInformation = iconos.faLock;
}
