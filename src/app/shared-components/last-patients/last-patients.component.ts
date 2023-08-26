import { Component } from '@angular/core';
import { ApiResponseGetAllPatientsI, GetPatientDetailI } from 'src/app/admin/interfaces/patients.interface';
import { DashboardComponent } from 'src/app/admin/modules/home/dashboard/dashboard.component';
import { PatientsService } from 'src/app/admin/services/patients.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-last-patients',
  templateUrl: './last-patients.component.html',
  styleUrls: ['./last-patients.component.css']
})
export class LastPatientsComponent {
  /*Variables*/
  arrayLastPatients: GetPatientDetailI[] = [];

  /*constructor*/
  constructor(
    private patientsService: PatientsService,
    private headers: DashboardComponent
  ){}

  /*ngOnInit*/
  ngOnInit(){
    this.getAllPatients();
  }

  /*Método que obtiene el listado de todos los pacientes*/
  getAllPatients() {
    this.patientsService.getAllPatients(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseGetAllPatientsI) => {
          this.arrayLastPatients = data.data;
        }
      })
  }

  /*Icons to use*/
  iconUser = iconos.faUserAlt;
}
