import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { ApiResponseEditTherapistI, ApiResponseGetTherapistDetailI, ApiResponseGetTherapistsI, ApiResponseRegisterTherapistI, ApiResponseStatusTherapist, RegisterTherapistI, bodyEditTherapistI } from '../interfaces/therapists.interface';

@Injectable({
    providedIn: 'root'
})
export class TherapistsService {
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

    /*Método que obtiene el listado de todas las tareas de un terapeuta*/
    getAllTherapists(headers: Map<string, any>, status: boolean): Observable<ApiResponseGetTherapistsI> {
        let queryParams = "?";
        queryParams += `status=${status}`;
        this.options = this.getHeaders(headers);
        return this.http.get<ApiResponseGetTherapistsI>(this.urlApi + `/admin/terapists/${queryParams}`, this.options);
    }

    /*Método que obtiene el detalle de un terapeuta por su ID*/
    getTherapistDetailById(headers: Map<string, any>, patientId: number): Observable<ApiResponseGetTherapistDetailI> {
        this.options = this.getHeaders(headers);
        return this.http.get<ApiResponseGetTherapistDetailI>(this.urlApi + `/user/by-id/${patientId}`, this.options);
    }

    /*Método que registra un nuevo terapeuta*/
    registerTherapist(headers: Map<string, any>, body: RegisterTherapistI): Observable<ApiResponseRegisterTherapistI> {
        this.options = this.getHeaders(headers);
        return this.http.post<ApiResponseRegisterTherapistI>(this.urlApi + `/user/therapist`, body, this.options);
    }

    /*Método que cambia el estado de un terapeuta (Activar o desactivar)*/
    activateOrDesactivateTherapist(headers: Map<string, any>, idTherapist: number): Observable<ApiResponseStatusTherapist> {
        this.options = this.getHeaders(headers);
        return this.http.patch<ApiResponseStatusTherapist>(this.urlApi + `/user/status/${idTherapist}`, null, this.options);
    }

     /*Método que editar la información de un terapeuta*/
     editTherapist(headers: Map<string, any>, body: bodyEditTherapistI, idTherapist: number): Observable<ApiResponseEditTherapistI> {
        this.options = this.getHeaders(headers);
        return this.http.patch<ApiResponseEditTherapistI>(this.urlApi + `/user/update/${idTherapist}`, body, this.options);
    }
}