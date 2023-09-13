import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { ApiResponseGetTherapistsI } from '../interfaces/therapists.interface';
import { ApiResponseGetAllPatientsI } from '../interfaces/patients.interface';
import { ApiResponseActivateDesactivatePatientI } from 'src/app/therapist/interfaces/patients.interface';

@Injectable({
    providedIn: 'root'
})
export class PatientsService {
    /*Variables*/
    urlApi = environment.urlApi;
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Request-Header': 'Content-type',
        'Access-Control-Allow-Origin': '*'
    });
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
    ) { }

    /*Método que obtiene los headers*/
    public getHeaders(headers: Map<string, any> | undefined) {

        if (headers != null) {
            headers.forEach((value, key) => {
                this.headers = this.headers.append(key, value || '');
            });
        }
        this.headers = this.headers.delete('Authorization');
        this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
        this.options = { headers: this.headers };
        return this.options;
    }

    /*Método que obtiene el listado de pacientes*/
    getAllPatients(headers: Map<string, any>, status: boolean): Observable<ApiResponseGetAllPatientsI> {
        let queryParams = "?";
        queryParams += `status=${status}`;
        this.options = this.getHeaders(headers);
        return this.http.get<ApiResponseGetAllPatientsI>(this.urlApi + `/user/all${queryParams}`, this.options);
    }

    /*Método que consume el servicio que manda a cambiar el estado de un paciente (Activar o desactivar)*/
    activateOrDesactivatePatient(headers: Map<string, any>, idPatient: number): Observable<ApiResponseActivateDesactivatePatientI> {
        this.options = this.getHeaders(headers);
        return this.http.patch<ApiResponseActivateDesactivatePatientI>(this.urlApi + `/user/status/${idPatient}`, null, this.options);
    }
}