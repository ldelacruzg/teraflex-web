import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { ApiResponseRegisterTherapistI } from '../interfaces/therapists.interface';

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
    getAllTherapists(headers: Map<string, any>, status: boolean): Observable<ApiResponseRegisterTherapistI> {
        let queryParams = "?";
        queryParams += `status=${status}`;
        this.options = this.getHeaders(headers);
        return this.http.get<ApiResponseRegisterTherapistI>(this.urlApi + `/logged/tasks/${queryParams}`, this.options);
    }
}