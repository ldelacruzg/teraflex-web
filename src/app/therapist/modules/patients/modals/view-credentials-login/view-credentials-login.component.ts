import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-credentials-login',
  templateUrl: './view-credentials-login.component.html',
  styleUrls: ['./view-credentials-login.component.css']
})
export class ViewCredentialsLoginComponent {
  /*Variables*/
  static user: string = "---";
  static password: string = "----";
  user2: string = "---";
  password2: string = "----";
  

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private router: Router
  ) {}

  /*ngOnInit*/
  ngOnInit(){
    this.user2 = ViewCredentialsLoginComponent.user;
    this.password2 = ViewCredentialsLoginComponent.password;
  }

  /*Método que cierra el modal y redirige al componente de listar*/
  closeModal(){
    this.modal.dismissAll();
    this.router.navigateByUrl("/therapist/home/dashboard/patients/my-patients");
  }

  /*Icons to use*/
  iconCredentials = iconos.faLock;
}
