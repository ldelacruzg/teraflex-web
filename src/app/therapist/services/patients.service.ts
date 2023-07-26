import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseGetMyPatientsI } from '../interfaces/patients.interface';
import { ApiResponseGetMyPatientByIdI } from '../interfaces/patients.interface';

@Injectable({
    providedIn: 'root'
})
export class PatientsService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de los pacientes que tiene un terapeuta*/
    getMyPatients(headers: Map<string, any>): Observable<ApiResponseGetMyPatientsI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGetMyPatientsI>(this.urlApi + `/group/all`, this.options);
    }

    /*Método que obtiene los datos de un paciente según el ID*/
    getMyPatientById(headers: Map<string, any>, patientId: number): Observable<ApiResponseGetMyPatientByIdI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGetMyPatientByIdI>(this.urlApi + `/user/by-id/${patientId}`, this.options);
    }
}