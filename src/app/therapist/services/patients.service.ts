import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseEditPatientI, ApiResponseGetMyPatientsI, ApiResponseGetOutPatientsI, ApiResponseLinkPatientI, ApiResponseRegisterPatientI, EditMyPatientBodyI, RegisterPatientI } from '../interfaces/patients.interface';
import { ApiResponseGetMyPatientByIdI } from '../interfaces/patients.interface';

@Injectable({
    providedIn: 'root'
})
export class PatientsService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}
    options2 = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de los pacientes que tiene un terapeuta*/
    getMyPatients(headers: Map<string, any>): Observable<ApiResponseGetMyPatientsI> {
        this.options = this.authService.getHeaders(headers);
        this.options2 = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGetMyPatientsI>(this.urlApi + `/group/all`, this.options);
    }

    /*Método que obtiene el listado de pacientes externos que NO están asociados al terapeuta*/
    getOutPatients(headers: Map<string, any>, status: boolean): Observable<ApiResponseGetOutPatientsI> {
        this.options = this.authService.getHeaders(headers);
        let queryParams = "?";
        queryParams += `status=${status}`;
        return this.http.get<ApiResponseGetOutPatientsI>(this.urlApi + `/user/all`, this.options);
    }

    /*Método que obtiene los datos de un paciente según el ID*/
    getMyPatientById(headers: Map<string, any>, patientId: number): Observable<ApiResponseGetMyPatientByIdI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGetMyPatientByIdI>(this.urlApi + `/user/by-id/${patientId}`, this.options);
    }

    /*Método que consume el servicio para registrar un paciente*/
    registerMyPatient(headers: Map<string, any>, body: RegisterPatientI): Observable<ApiResponseRegisterPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseRegisterPatientI>(this.urlApi + "/user/patient", body, this.options);
    }

    /*Método que consume el servicio para VINCULAR un paciente existente al terapeuta logueado*/
    linkMyPatient(headers: any, id: number): Observable<ApiResponseLinkPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseLinkPatientI>(this.urlApi + `/group/add/${id}`, null, this.options);
    }

    /*Método que consume el servicio para editar los datos de un paciente*/
    editMyPatient(headers: Map<string, any>, body: EditMyPatientBodyI, idPatient: number): Observable<ApiResponseEditPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.patch<ApiResponseEditPatientI>(this.urlApi + `/user/update/${idPatient}`, body, this.options);
    }

    /*Método que consume el servicio que manda a eliminar un paciente*/
    deletePatient(headers: Map<string, any>, idPatient: number): Observable<string> {
        this.options = this.authService.getHeaders(headers);
        return this.http.patch<string>(this.urlApi + `/user/status/${idPatient}`, null, this.options);
    }
}