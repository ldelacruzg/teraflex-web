import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseGetMyPatientsI } from '../interfaces/patients.interface';
import { ApiResponseGetMyPatientByIdI } from '../interfaces/patients.interface';
import { ApiResponseAssignTasksToPatientI } from '../interfaces/assigments.interface';

@Injectable({
    providedIn: 'root'
})
export class AssigmentsService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de los pacientes que tiene un terapeuta*/
    registerTasksAssignToPatient(headers: Map<string, any>, patientId: number, body: any): Observable<ApiResponseAssignTasksToPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseAssignTasksToPatientI>(this.urlApi + `/patients/${patientId}/tasks`, body, this.options);
    }

}