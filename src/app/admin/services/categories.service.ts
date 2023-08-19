import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { ApiResponseCategoriesI } from '../interfaces/categories.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
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

    /*Método que obtiene el listado de todas las categorias disponibles*/
    getAllCategories(headers: Map<string, any>): Observable<ApiResponseCategoriesI> {
        this.options = this.getHeaders(headers);
        return this.http.get<ApiResponseCategoriesI>(this.urlApi + `/categories`, this.options);
    }
}